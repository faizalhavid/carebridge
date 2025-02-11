-- Insert roles into the m_role table
INSERT INTO m_role (name, code, created_at, updated_at, is_deleted)
VALUES ('Admin', 'ROLE_ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Customer', 'ROLE_CUSTOMER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Doctor', 'ROLE_DOCTOR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Medic', 'ROLE_MEDIC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);

-- data seed for registration flow
-- create token otp for registration email
INSERT INTO t_token (email, token, used_for, created_at, updated_at, expired_at, is_deleted)
VALUES ('nurhavid123@gmail.com', '123456', 'REGISTRATION', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, strftime('%Y-%m-%d %H:%M:%S', 'now', '+3 minutes'),0);

-- verify token otp for registration email
INSERT INTO m_user (email, role_id, created_at, updated_at, is_deleted)
VALUES ('nurhavid123@gmail.com', (SELECT id FROM m_role WHERE name = 'Customer'), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);