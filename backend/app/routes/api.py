from datetime import datetime
from uuid import uuid4

from flask import Blueprint, g, jsonify, request
from sqlalchemy import select

from app.extensions import db
from app.models.core import Medication, VitalLog
from app.utils.auth import require_auth

api_bp = Blueprint("api", __name__)


def _date(value):
    if value in (None, ""):
        return None
    from datetime import date
    return date.fromisoformat(value)


def _number(value):
    if value in (None, ""):
        return None
    return float(value)


@api_bp.get("/me")
@require_auth
def me():
    return jsonify({"success": True, "user_id": g.user_id}), 200


@api_bp.route("/medications", methods=["GET", "POST"])
@require_auth
def medications():
    if request.method == "GET":
        rows = db.session.execute(
            select(Medication).where(Medication.user_id == g.user_id).order_by(Medication.created_at.desc())
        ).scalars().all()
        return jsonify({"success": True, "data": [row.to_dict() for row in rows]})

    payload = request.get_json(silent=True) or {}
    if not payload.get("medication_name"):
        return jsonify({"success": False, "error": "medication_name is required"}), 400
    row = Medication(
        user_id=g.user_id, medication_name=str(payload["medication_name"]).strip(),
        generic_name=payload.get("generic_name"), dosage=_number(payload.get("dosage")),
        dosage_unit=payload.get("dosage_unit"), frequency=payload.get("frequency"), route=payload.get("route"),
        instructions=payload.get("instructions"), prescribed_by=payload.get("prescribed_by"),
        start_date=_date(payload.get("start_date")), end_date=_date(payload.get("end_date")),
        is_active=bool(payload.get("is_active", True)), notes=payload.get("notes"),
    )
    db.session.add(row)
    db.session.commit()
    return jsonify({"success": True, "data": row.to_dict()}), 201


@api_bp.route("/medications/<uuid:medication_id>", methods=["GET", "PATCH", "DELETE"])
@require_auth
def medication(medication_id):
    row = db.session.execute(
        select(Medication).where(Medication.id == medication_id, Medication.user_id == g.user_id)
    ).scalar_one_or_none()
    if not row:
        return jsonify({"success": False, "error": "Medication not found"}), 404

    if request.method == "GET":
        return jsonify({"success": True, "data": row.to_dict()})
    if request.method == "DELETE":
        db.session.delete(row)
        db.session.commit()
        return "", 204

    payload = request.get_json(silent=True) or {}
    allowed = {"medication_name", "generic_name", "dosage_unit", "frequency", "route", "instructions", "prescribed_by", "is_active", "notes"}
    for key in allowed:
        if key in payload:
            setattr(row, key, payload[key])
    if "dosage" in payload:
        row.dosage = _number(payload["dosage"])
    if "start_date" in payload:
        row.start_date = _date(payload["start_date"])
    if "end_date" in payload:
        row.end_date = _date(payload["end_date"])
    row.updated_at = datetime.now().astimezone()
    db.session.commit()
    return jsonify({"success": True, "data": row.to_dict()})


@api_bp.route("/vitals", methods=["GET", "POST"])
@require_auth
def vitals():
    if request.method == "GET":
        rows = db.session.execute(
            select(VitalLog).where(VitalLog.user_id == g.user_id).order_by(VitalLog.recorded_at.desc()).limit(200)
        ).scalars().all()
        return jsonify({"success": True, "data": [row.to_dict() for row in rows]})

    payload = request.get_json(silent=True) or {}
    row = VitalLog(user_id=g.user_id)
    for field in ["blood_pressure_systolic", "blood_pressure_diastolic", "heart_rate", "oxygen_saturation", "temperature", "blood_glucose", "weight"]:
        if field in payload:
            setattr(row, field, _number(payload[field]))
    row.notes = payload.get("notes")
    if payload.get("recorded_at"):
        row.recorded_at = datetime.fromisoformat(payload["recorded_at"].replace("Z", "+00:00"))
    db.session.add(row)
    db.session.commit()
    return jsonify({"success": True, "data": row.to_dict()}), 201


@api_bp.delete("/vitals/<uuid:vital_id>")
@require_auth
def delete_vital(vital_id):
    row = db.session.execute(select(VitalLog).where(VitalLog.id == vital_id, VitalLog.user_id == g.user_id)).scalar_one_or_none()
    if not row:
        return jsonify({"success": False, "error": "Vital record not found"}), 404
    db.session.delete(row)
    db.session.commit()
    return "", 204
