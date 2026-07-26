-- Smart School FinTech — Fee Management System
-- MySQL schema

CREATE DATABASE IF NOT EXISTS school_fintech CHARACTER SET utf8mb4;
USE school_fintech;

-- ─────────────────────────────────────────────
-- Families (for sibling linking / family fee view)
-- ─────────────────────────────────────────────
CREATE TABLE families (
    id INT AUTO_INCREMENT PRIMARY KEY,
    family_name VARCHAR(100) NOT NULL,
    primary_contact_name VARCHAR(100),
    primary_contact_phone VARCHAR(20),
    primary_contact_email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- Students
-- ─────────────────────────────────────────────
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_code VARCHAR(20) UNIQUE NOT NULL,   -- e.g. STU-104
    full_name VARCHAR(100) NOT NULL,
    grade VARCHAR(10) NOT NULL,                 -- e.g. "10-B"
    family_id INT,
    parent_name VARCHAR(100),
    parent_phone VARCHAR(20),
    parent_email VARCHAR(100),
    status ENUM('active', 'inactive', 'alumni') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE SET NULL
);

-- ─────────────────────────────────────────────
-- Fee Types / Fee Heads (Tuition, Transport, Late Fees, etc.)
-- ─────────────────────────────────────────────
CREATE TABLE fee_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,                 -- e.g. "Tuition Fee"
    category VARCHAR(50),                        -- e.g. "ALL GRADES", "CLASS X"
    amount DECIMAL(10,2) NOT NULL,
    cycle ENUM('Monthly', 'Quarterly', 'Annually') NOT NULL,
    status ENUM('Active', 'Draft', 'Annual') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- Fee Records — a fee type assigned to a student, with status tracking
-- ─────────────────────────────────────────────
CREATE TABLE fee_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    fee_type_id INT NOT NULL,
    amount_due DECIMAL(10,2) NOT NULL,
    amount_paid DECIMAL(10,2) DEFAULT 0,
    due_date DATE NOT NULL,
    status ENUM('pending', 'partial', 'paid', 'overdue', 'waived') DEFAULT 'pending',
    installment_number INT DEFAULT NULL,          -- for EMI/split fees
    total_installments INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (fee_type_id) REFERENCES fee_types(id) ON DELETE RESTRICT
);

-- ─────────────────────────────────────────────
-- Payments — simulated multi-method (UPI/Card/Cash/Cheque)
-- ─────────────────────────────────────────────
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fee_record_id INT NOT NULL,
    student_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    method ENUM('UPI', 'Card', 'Cash', 'Cheque') NOT NULL,
    reference_id VARCHAR(100),                    -- UPI txn id / cheque no.
    receipt_number VARCHAR(30) UNIQUE,
    status ENUM('pending', 'approved', 'rejected', 'auto_approved') DEFAULT 'pending',
    recorded_by VARCHAR(100),                      -- staff who entered offline payment
    rejection_reason VARCHAR(255),
    paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fee_record_id) REFERENCES fee_records(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────
-- Waivers & Penalties
-- ─────────────────────────────────────────────
CREATE TABLE waivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fee_record_id INT NOT NULL,
    student_id INT NOT NULL,
    type ENUM('waiver', 'penalty') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    reason VARCHAR(255) NOT NULL,
    rule_name VARCHAR(100),                        -- e.g. "Sibling Discount", "Habitual Defaulter Penalty"
    approved_by VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fee_record_id) REFERENCES fee_records(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- ─────────────────────────────────────────────
-- Staff
-- ─────────────────────────────────────────────
CREATE TABLE staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    staff_code VARCHAR(20) UNIQUE NOT NULL,        -- e.g. ADM-001
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,                    -- e.g. "Senior Accountant"
    department VARCHAR(50),                        -- e.g. "Finance"
    email VARCHAR(100),
    phone VARCHAR(20),
    years_experience INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- Audit Log — tamper-evident, hash-chained, append-only
-- ─────────────────────────────────────────────
CREATE TABLE audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    admin_id VARCHAR(20) NOT NULL,                 -- e.g. ADM-001
    admin_name VARCHAR(100) NOT NULL,
    action VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    prev_hash VARCHAR(64),                          -- hash of previous entry (chain)
    entry_hash VARCHAR(64) NOT NULL,                -- hash of this entry
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- Indexes for common dashboard queries
-- ─────────────────────────────────────────────
CREATE INDEX idx_fee_records_student ON fee_records(student_id);
CREATE INDEX idx_fee_records_status ON fee_records(status);
CREATE INDEX idx_payments_student ON payments(student_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_students_family ON students(family_id);
