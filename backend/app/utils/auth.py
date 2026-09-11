from datetime import datetime, timezone
from functools import wraps

import jwt
import requests
from flask import current_app, g, jsonify, request


def _unauthorized(message="Authentication required"):
    return jsonify({"success": False, "error": message}), 401


def _get_jwks():
    url = f"{current_app.config['SUPABASE_URL']}/auth/v1/.well-known/jwks.json"
    response = requests.get(url, timeout=5)
    response.raise_for_status()
    return response.json()


def _verify_token(token):
    supabase_url = current_app.config["SUPABASE_URL"]
    if not supabase_url:
        raise ValueError("SUPABASE_URL is not configured")

    header = jwt.get_unverified_header(token)
    kid = header.get("kid")
    alg = header.get("alg")
    if alg not in {"RS256", "ES256"} or not kid:
        raise ValueError("Unsupported token")

    jwks = _get_jwks()
    key_data = next((key for key in jwks.get("keys", []) if key.get("kid") == kid), None)
    if not key_data:
        raise ValueError("Signing key not found")

    public_key = jwt.algorithms.get_default_algorithms()[alg].from_jwk(key_data)
    return jwt.decode(
        token,
        public_key,
        algorithms=[alg],
        audience="authenticated",
        issuer=f"{supabase_url}/auth/v1",
    )


def require_auth(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        header = request.headers.get("Authorization", "")
        if not header.startswith("Bearer "):
            return _unauthorized()
        token = header[7:].strip()
        if not token:
            return _unauthorized()
        try:
            claims = _verify_token(token)
            user_id = claims.get("sub")
            if not user_id:
                return _unauthorized("Invalid authentication token")
            g.user_id = user_id
            g.claims = claims
            return fn(*args, **kwargs)
        except (jwt.PyJWTError, requests.RequestException, ValueError, KeyError, TypeError) as exc:
            current_app.logger.warning("Authentication failed: %s", exc)
            return _unauthorized("Invalid or expired authentication token")

    return wrapper
