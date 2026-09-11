import os

from flask import Flask
from flask_cors import CORS
from config import Config
from app.extensions import db, migrate


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)

    allowed_origins = [origin.strip() for origin in app.config["FRONTEND_URL"].split(",") if origin.strip()]
    CORS(app, resources={r"/api/*": {"origins": allowed_origins or "*"}}, supports_credentials=True)

    from app.routes.health import health_bp
    from app.routes.api import api_bp
    app.register_blueprint(health_bp, url_prefix="/api")
    app.register_blueprint(api_bp, url_prefix="/api")

    @app.get("/")
    def root():
        return {"success": True, "service": "Medisafe API"}, 200

    return app
