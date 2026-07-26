from sqlalchemy import (
    Column, Integer, String, Numeric, Date, DateTime, ForeignKey, Enum, func
)
from sqlalchemy.orm import relationship
from app.database import Base
import enum


class FeeCycle(str, enum.Enum):
    Monthly = "Monthly"
    Quarterly = "Quarterly"
    Annually = "Annually"


class FeeStatus(str, enum.Enum):
    Active = "Active"
    Draft = "Draft"
    Annual = "Annual"


class RecordStatus(str, enum.Enum):
    pending = "pending"
    partial = "partial"
    paid = "paid"
    overdue = "overdue"
    waived = "waived"


class PaymentMethod(str, enum.Enum):
    UPI = "UPI"
    Card = "Card"
    Cash = "Cash"
    Cheque = "Cheque"


class PaymentStatus(str, enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    auto_approved = "auto_approved"


class WaiverType(str, enum.Enum):
    waiver = "waiver"
    penalty = "penalty"


class Family(Base):
    __tablename__ = "families"
    id = Column(Integer, primary_key=True, index=True)
    family_name = Column(String(100), nullable=False)
    primary_contact_name = Column(String(100))
    primary_contact_phone = Column(String(20))
    primary_contact_email = Column(String(100))
    created_at = Column(DateTime, server_default=func.now())

    students = relationship("Student", back_populates="family")


class Student(Base):
    __tablename__ = "students"
    id = Column(Integer, primary_key=True, index=True)
    student_code = Column(String(20), unique=True, nullable=False)
    full_name = Column(String(100), nullable=False)
    grade = Column(String(10), nullable=False)
    family_id = Column(Integer, ForeignKey("families.id", ondelete="SET NULL"))
    parent_name = Column(String(100))
    parent_phone = Column(String(20))
    parent_email = Column(String(100))
    status = Column(String(20), default="active")
    created_at = Column(DateTime, server_default=func.now())

    family = relationship("Family", back_populates="students")
    fee_records = relationship("FeeRecord", back_populates="student")


class FeeType(Base):
    __tablename__ = "fee_types"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(50))
    amount = Column(Numeric(10, 2), nullable=False)
    cycle = Column(Enum(FeeCycle), nullable=False)
    status = Column(Enum(FeeStatus), default=FeeStatus.Active)
    created_at = Column(DateTime, server_default=func.now())


class FeeRecord(Base):
    __tablename__ = "fee_records"
    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    fee_type_id = Column(Integer, ForeignKey("fee_types.id"), nullable=False)
    amount_due = Column(Numeric(10, 2), nullable=False)
    amount_paid = Column(Numeric(10, 2), default=0)
    due_date = Column(Date, nullable=False)
    status = Column(Enum(RecordStatus), default=RecordStatus.pending)
    installment_number = Column(Integer, nullable=True)
    total_installments = Column(Integer, nullable=True)
    created_at = Column(DateTime, server_default=func.now())

    student = relationship("Student", back_populates="fee_records")
    fee_type = relationship("FeeType")
    payments = relationship("Payment", back_populates="fee_record")


class Payment(Base):
    __tablename__ = "payments"
    id = Column(Integer, primary_key=True, index=True)
    fee_record_id = Column(Integer, ForeignKey("fee_records.id", ondelete="CASCADE"), nullable=False)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    method = Column(Enum(PaymentMethod), nullable=False)
    reference_id = Column(String(100))
    receipt_number = Column(String(30), unique=True)
    status = Column(Enum(PaymentStatus), default=PaymentStatus.pending)
    recorded_by = Column(String(100))
    rejection_reason = Column(String(255))
    paid_at = Column(DateTime, server_default=func.now())

    fee_record = relationship("FeeRecord", back_populates="payments")
    student = relationship("Student")


class Waiver(Base):
    __tablename__ = "waivers"
    id = Column(Integer, primary_key=True, index=True)
    fee_record_id = Column(Integer, ForeignKey("fee_records.id", ondelete="CASCADE"), nullable=False)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    type = Column(Enum(WaiverType), nullable=False)
    amount = Column(Numeric(10, 2), nullable=False)
    reason = Column(String(255), nullable=False)
    rule_name = Column(String(100))
    approved_by = Column(String(100), nullable=False)
    created_at = Column(DateTime, server_default=func.now())


class Staff(Base):
    __tablename__ = "staff"
    id = Column(Integer, primary_key=True, index=True)
    staff_code = Column(String(20), unique=True, nullable=False)
    full_name = Column(String(100), nullable=False)
    role = Column(String(100), nullable=False)
    department = Column(String(50))
    email = Column(String(100))
    phone = Column(String(20))
    years_experience = Column(Integer)
    created_at = Column(DateTime, server_default=func.now())


class AuditLog(Base):
    __tablename__ = "audit_log"
    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(String(20), nullable=False)
    admin_name = Column(String(100), nullable=False)
    action = Column(String(255), nullable=False)
    ip_address = Column(String(45))
    prev_hash = Column(String(64))
    entry_hash = Column(String(64), nullable=False)
    created_at = Column(DateTime, server_default=func.now())
