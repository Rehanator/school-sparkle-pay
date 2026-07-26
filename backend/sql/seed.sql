USE school_fintech;

-- ─────────────────────────────────────────────
-- Families (for sibling linking demo)
-- ─────────────────────────────────────────────
INSERT INTO families (family_name, primary_contact_name, primary_contact_phone, primary_contact_email) VALUES
('Sharma Family', 'Rakesh Sharma', '+91 98212 33445', 'rakesh.sharma@example.com'),
('Reddy Family', 'Lakshmi Reddy', '+91 98211 55667', 'lakshmi.reddy@example.com');

-- ─────────────────────────────────────────────
-- Fee Types (matches Fee Engine page)
-- ─────────────────────────────────────────────
INSERT INTO fee_types (name, category, amount, cycle, status) VALUES
('Tuition Fee', 'ALL GRADES', 45000, 'Quarterly', 'Active'),
('Transport', 'ALL GRADES', 12000, 'Quarterly', 'Active'),
('Sports & Clubs', 'CLASS X', 4500, 'Annually', 'Annual'),
('Lab & Materials', 'CLASS IX - X', 3800, 'Annually', 'Active'),
('Meal Plan', 'ALL GRADES', 8600, 'Monthly', 'Draft'),
('Arts & Music', 'CLASS VI - VIII', 2900, 'Annually', 'Annual');

-- ─────────────────────────────────────────────
-- Students (matches names used across dashboard/payments mock data)
-- ─────────────────────────────────────────────
INSERT INTO students (student_code, full_name, grade, family_id, parent_name, parent_phone, parent_email) VALUES
('STU-104', 'Aarav Sharma', '10-B', 1, 'Rakesh Sharma', '+91 98212 33445', 'rakesh.sharma@example.com'),
('STU-217', 'Isha Reddy',   '9-A',  2, 'Lakshmi Reddy', '+91 98211 55667', 'lakshmi.reddy@example.com'),
('STU-089', 'Kabir Menon',  '12-C', NULL, 'Suresh Menon', '+91 98213 11223', 'suresh.menon@example.com'),
('STU-311', 'Zoya Khan',    '8-A',  NULL, 'Imran Khan', '+91 98214 44556', 'imran.khan@example.com'),
('STU-402', 'Rohan Patel',  '11-B', NULL, 'Deepak Patel', '+91 98215 66778', 'deepak.patel@example.com'),
('STU-118', 'Meera Iyer',   '7-B',  NULL, 'Krishna Iyer', '+91 98216 77889', 'krishna.iyer@example.com'),
('STU-205', 'Nikhil Verma', '9-C',  NULL, 'Anil Verma', '+91 98217 88990', 'anil.verma@example.com'),
('STU-231', 'Anaya Bose',   '7-A',  NULL, 'Sourav Bose', '+91 98218 99001', 'sourav.bose@example.com'),
('STU-176', 'Vivaan Rao',   '11-A', NULL, 'Prakash Rao', '+91 98219 00112', 'prakash.rao@example.com'),
('STU-263', 'Sara Fernandes','5-B', NULL, 'John Fernandes', '+91 98220 11223', 'john.fernandes@example.com');

-- ─────────────────────────────────────────────
-- Fee Records
--   STU-104 (Aarav)  → overdue, 42 days late  → drives "Critical" defaulter row
--   STU-217 (Isha)   → overdue, 31 days late  → "Critical"
--   STU-089 (Kabir)  → overdue, 24 days late  → "High"
--   STU-311 (Zoya)   → overdue, 18 days late  → "High"
--   STU-402 (Rohan)  → overdue, 9 days late   → "Watch"
--   Rest             → paid/partial (feeds revenue + UPI feed)
-- ─────────────────────────────────────────────
INSERT INTO fee_records (student_id, fee_type_id, amount_due, amount_paid, due_date, status) VALUES
(1, 1, 48500, 0,     DATE_SUB(CURDATE(), INTERVAL 42 DAY), 'overdue'),
(2, 1, 36200, 0,     DATE_SUB(CURDATE(), INTERVAL 31 DAY), 'overdue'),
(3, 2, 28900, 0,     DATE_SUB(CURDATE(), INTERVAL 24 DAY), 'overdue'),
(4, 1, 19400, 0,     DATE_SUB(CURDATE(), INTERVAL 18 DAY), 'overdue'),
(5, 1, 12750, 0,     DATE_SUB(CURDATE(), INTERVAL 9 DAY),  'overdue'),
(6, 1, 45000, 45000, DATE_ADD(CURDATE(), INTERVAL 20 DAY), 'paid'),
(7, 1, 45000, 12000, DATE_ADD(CURDATE(), INTERVAL 15 DAY), 'partial'),
(8, 1, 45000, 45000, DATE_ADD(CURDATE(), INTERVAL 25 DAY), 'paid'),
(9, 1, 45000, 8600,  DATE_ADD(CURDATE(), INTERVAL 10 DAY), 'partial'),
(10,1, 45000, 22000, DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'partial');

-- ─────────────────────────────────────────────
-- Payments — Digital (UPI) feed
-- ─────────────────────────────────────────────
INSERT INTO payments (fee_record_id, student_id, amount, method, reference_id, receipt_number, status, paid_at) VALUES
(6, 6, 15000, 'UPI', 'yesbnk@upi · TXN 89231',   'R-2261', 'auto_approved', NOW()),
(6, 6, 8600,  'UPI', 'hdfc@upi · TXN 89224',     'R-2260', 'auto_approved', DATE_SUB(NOW(), INTERVAL 12 SECOND)),
(8, 8, 22400, 'UPI', 'gpay@okaxis · TXN 89218',  'R-2259', 'auto_approved', DATE_SUB(NOW(), INTERVAL 48 SECOND)),
(9, 9, 4500,  'UPI', 'phonepe@ybl · TXN 89211',  'R-2258', 'auto_approved', DATE_SUB(NOW(), INTERVAL 1 MINUTE)),
(10,10,12000, 'UPI', 'paytm@paytm · TXN 89204',  'R-2257', 'auto_approved', DATE_SUB(NOW(), INTERVAL 3 MINUTE)),
(7, 7, 3800,  'UPI', 'hdfc@upi · TXN 89197',     'R-2256', 'auto_approved', DATE_SUB(NOW(), INTERVAL 6 MINUTE));

-- ─────────────────────────────────────────────
-- Payments — Offline (Cash/Cheque) reconciliation queue
-- ─────────────────────────────────────────────
INSERT INTO payments (fee_record_id, student_id, amount, method, receipt_number, status, recorded_by) VALUES
(7, 7, 12000, 'Cash',   'R-2251', 'pending', 'Front Desk · Priya'),
(8, 8, 45000, 'Cheque', 'R-2250', 'pending', 'Accounts · Ravi'),
(9, 9, 8600,  'Cash',   'R-2249', 'pending', 'Front Desk · Priya'),
(10,10,22000, 'Cheque', 'R-2248', 'pending', 'Accounts · Ravi');

-- ─────────────────────────────────────────────
-- Waivers & Penalties (drives Waiver Rules Engine "impact" numbers)
-- ─────────────────────────────────────────────
INSERT INTO waivers (fee_record_id, student_id, type, amount, reason, rule_name, approved_by) VALUES
(1, 1, 'waiver', 500, 'First-time late payer grace period', 'First-Time Late Payer Grace Period', 'anita.kapoor'),
(2, 2, 'waiver', 3600, 'Sibling enrolled same academic year', 'Sibling Discount', 'anita.kapoor');

-- ─────────────────────────────────────────────
-- Staff Directory (matches Staff Directory page)
-- ─────────────────────────────────────────────
INSERT INTO staff (staff_code, full_name, role, department, email, phone, years_experience) VALUES
('ADM-002', 'Ravi Narayanan', 'Senior Accountant',             'Finance',       'ravi.n@smartschool.edu',    '+91 98765 12345', 12),
('ADM-003', 'Priya Menon',    'Front Desk Lead',                'Reception',     'priya.m@smartschool.edu',   '+91 98213 55401', 6),
('ADM-005', 'Suresh Iyer',    'Bus Coordinator',                'Transport',     'suresh.i@smartschool.edu',  '+91 90234 66112', 10),
('ADM-001', 'Anita Kapoor',   'Principal Admin',                'Leadership',    'anita.k@smartschool.edu',   '+91 99887 12200', 18),
('ADM-004', 'Meera Joshi',    'Fee Reconciliation Officer',     'Finance',       'meera.j@smartschool.edu',   '+91 98450 78990', 8),
('ADM-012', 'Arjun Rathore',  'IT Systems Admin',               'Technology',    'arjun.r@smartschool.edu',   '+91 91234 45566', 5),
('ADM-006', 'Fatima Sheikh',  'Scholarship Coordinator',        'Student Affairs','fatima.s@smartschool.edu', '+91 93450 22110', 7),
('ADM-007', 'David Thomas',   'Cheque Reconciliation Analyst',  'Finance',       'david.t@smartschool.edu',   '+91 97766 55211', 4);

-- ─────────────────────────────────────────────
-- Audit Log (hash-chained — matches Audit Trail page)
-- Note: entry_hash values here are placeholders for seed purposes only.
-- Real entries created via the API (POST /api/audit) compute proper
-- sha256 hashes, so /api/audit/verify will only validate the chain
-- for entries created through the app, not these seeded rows.
-- ─────────────────────────────────────────────
INSERT INTO audit_log (admin_id, admin_name, action, ip_address, prev_hash, entry_hash, created_at) VALUES
('ADM-001', 'anita.kapoor',   'Manually Waived ₹500 Late Fee for Student #104',       '10.14.22.8',  '0000000000000000000000000000000000000000000000000000000000000000', 'seed0001', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('ADM-004', 'meera.joshi',    'Approved Offline Cash Payment ₹12,000 (Receipt R-2251)','10.14.22.19','seed0001', 'seed0002', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('ADM-004', 'meera.joshi',    'Rejected Cheque Entry #OFF-1039 · Reason: Signature mismatch','10.14.22.19','seed0002', 'seed0003', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('ADM-001', 'anita.kapoor',   'Enabled First-Time Late Payer Grace Period rule',      '10.14.22.8',  'seed0003', 'seed0004', DATE_SUB(NOW(), INTERVAL 1 DAY)),
('ADM-007', 'ravi.narayanan', 'Split ₹60,000 Annual Fee into 4x ₹15,000 EMI for Student #104','10.14.22.34','seed0004', 'seed0005', DATE_SUB(NOW(), INTERVAL 2 DAY)),
('ADM-012', 'arjun.rathore',  'Rotated API key for UPI webhook',                      '10.14.22.51', 'seed0005', 'seed0006', DATE_SUB(NOW(), INTERVAL 2 DAY)),
('ADM-004', 'meera.joshi',    'Bulk Reminder sent to 34 defaulters via WhatsApp Bot', '10.14.22.19', 'seed0006', 'seed0007', DATE_SUB(NOW(), INTERVAL 2 DAY)),
('ADM-001', 'anita.kapoor',   'Created New Fee Head Robotics Club ₹3,500 · Annually', '10.14.22.8',  'seed0007', 'seed0008', DATE_SUB(NOW(), INTERVAL 2 DAY));
