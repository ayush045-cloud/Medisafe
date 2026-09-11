from datetime import date, datetime
from uuid import uuid4

from app.extensions import db


class Medication(db.Model):
    __tablename__ = "medications"
    id = db.Column(db.Uuid(as_uuid=True), primary_key=True, default=uuid4)
    user_id = db.Column(db.Uuid(as_uuid=True), nullable=False, index=True)
    medication_name = db.Column(db.Text, nullable=False)
    generic_name = db.Column(db.Text)
    dosage = db.Column(db.Numeric)
    dosage_unit = db.Column(db.Text)
    frequency = db.Column(db.Text)
    route = db.Column(db.Text)
    instructions = db.Column(db.Text)
    prescribed_by = db.Column(db.Text)
    start_date = db.Column(db.Date)
    end_date = db.Column(db.Date)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": str(self.id), "user_id": str(self.user_id), "medication_name": self.medication_name,
            "generic_name": self.generic_name, "dosage": float(self.dosage) if self.dosage is not None else None,
            "dosage_unit": self.dosage_unit, "frequency": self.frequency, "route": self.route,
            "instructions": self.instructions, "prescribed_by": self.prescribed_by,
            "start_date": self.start_date.isoformat() if self.start_date else None,
            "end_date": self.end_date.isoformat() if self.end_date else None,
            "is_active": self.is_active, "notes": self.notes,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


class VitalLog(db.Model):
    __tablename__ = "vital_logs"
    id = db.Column(db.Uuid(as_uuid=True), primary_key=True, default=uuid4)
    user_id = db.Column(db.Uuid(as_uuid=True), nullable=False, index=True)
    blood_pressure_systolic = db.Column(db.Numeric)
    blood_pressure_diastolic = db.Column(db.Numeric)
    heart_rate = db.Column(db.Numeric)
    oxygen_saturation = db.Column(db.Numeric)
    temperature = db.Column(db.Numeric)
    blood_glucose = db.Column(db.Numeric)
    weight = db.Column(db.Numeric)
    notes = db.Column(db.Text)
    recorded_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=db.func.now())
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, server_default=db.func.now())

    def to_dict(self):
        fields = ["blood_pressure_systolic", "blood_pressure_diastolic", "heart_rate", "oxygen_saturation", "temperature", "blood_glucose", "weight"]
        out = {"id": str(self.id), "user_id": str(self.user_id), "notes": self.notes,
               "recorded_at": self.recorded_at.isoformat() if self.recorded_at else None,
               "created_at": self.created_at.isoformat() if self.created_at else None,
               "updated_at": self.updated_at.isoformat() if self.updated_at else None}
        for field in fields:
            value = getattr(self, field)
            out[field] = float(value) if value is not None else None
        return out
