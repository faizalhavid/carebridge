-- Insert roles into the m_role table
-- 3 Type admin : Admin Customer Service, Admin Credentials, Admin Data Master
INSERT INTO m_role (name, code, created_at, updated_at, is_deleted)
VALUES
  ('Admin Customer Service', 'ROLE_ADMIN_CS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
  ('Admin Credentials', 'ROLE_ADMIN_CREDENTIALS', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
  ('Admin Data Master', 'ROLE_ADMIN_DATA_MASTER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
  ('Super Admin', 'ROLE_ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
  ('Customer', 'ROLE_CUSTOMER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
  ('Doctor', 'ROLE_DOCTOR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
  ('Medic', 'ROLE_MEDIC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

-- Insert Privileges into the m_privilege table
INSERT INTO m_privileges (name, code, created_at, updated_at, is_deleted)
VALUES ('Create User', 'CREATE_USER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
        ('Read User', 'READ_USER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
        ('Update User', 'UPDATE_USER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
        ('Delete User', 'DELETE_USER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
        ('Create Role', 'CREATE_ROLE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
        ('Read Role', 'READ_ROLE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
        ('Update Role', 'UPDATE_ROLE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
        ('Delete Role', 'DELETE_ROLE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
        ('Create Menu', 'CREATE_MENU', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
        ('Read Menu', 'READ_MENU', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
        ('Update Menu', 'UPDATE_MENU', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
        ('Delete Menu', 'DELETE_MENU', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

-- Admin Customer Service: Semua privileges
INSERT INTO roles_privileges (role_id, privilege_id)
SELECT r.id, p.id
FROM m_role r, m_privileges p
WHERE r.name = 'Admin Customer Service';

-- Admin Credentials: Hanya CREATE_USER, READ_USER, UPDATE_USER, DELETE_USER, CREATE_ROLE, READ_ROLE, UPDATE_ROLE, DELETE_ROLE
INSERT INTO roles_privileges (role_id, privilege_id)
SELECT r.id, p.id
FROM m_role r, m_privileges p
WHERE r.name = 'Admin Credentials'
  AND p.code IN ('CREATE_USER', 'READ_USER', 'UPDATE_USER', 'DELETE_USER', 'CREATE_ROLE', 'READ_ROLE', 'UPDATE_ROLE', 'DELETE_ROLE');

-- Admin Data Master: Hanya CREATE_MENU, READ_MENU, UPDATE_MENU, DELETE_MENU
INSERT INTO roles_privileges (role_id, privilege_id)
SELECT r.id, p.id
FROM m_role r, m_privileges p
WHERE r.name = 'Admin Data Master'
  AND p.code IN ('CREATE_MENU', 'READ_MENU', 'UPDATE_MENU', 'DELETE_MENU');

-- Customer: Hanya READ_USER, READ_MENU, READ_ROLE, READ_NEWS, dll
INSERT INTO roles_privileges (role_id, privilege_id)
SELECT r.id, p.id
FROM m_role r, m_privileges p
WHERE r.name = 'Customer'
  AND p.code IN ('READ_USER', 'READ_MENU', 'READ_ROLE');

-- Doctor: Hanya READ_USER, READ_MENU, READ_ROLE, CREATE_PRESCRIPTION, dll
INSERT INTO roles_privileges (role_id, privilege_id)
SELECT r.id, p.id
FROM m_role r, m_privileges p
WHERE r.name = 'Doctor'
  AND p.code IN ('READ_USER', 'READ_MENU', 'READ_ROLE', 'CREATE_PRESCRIPTION');

-- Medic: Hanya READ_USER, READ_MENU, READ_ROLE, UPDATE_USER, dll
INSERT INTO roles_privileges (role_id, privilege_id)
SELECT r.id, p.id
FROM m_role r, m_privileges p
WHERE r.name = 'Medic'
  AND p.code IN ('READ_USER', 'READ_MENU', 'READ_ROLE', 'UPDATE_USER');


-- Insert User
INSERT INTO m_user (email, created_at, updated_at, is_deleted)
VALUES ('nurfaizal966@gmail.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

-- Get the ID of the inserted user
-- (Assume the ID is 1 for this example)

-- Insert User-Role relationship into the join table
INSERT INTO users_roles (user_id, role_id)
VALUES (1, (SELECT id FROM m_role WHERE name = 'Super Admin'));


-- data seed for registration flow
-- create token otp for registration email
INSERT INTO t_token (email, token, used_for, created_at, updated_at, expired_at, is_deleted)
VALUES ('nurhavid123@gmail.com', '123456', 'REGISTRATION', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP + INTERVAL '3 minutes', false);

-- Insert User
INSERT INTO m_user (email, created_at, updated_at, is_deleted)
VALUES ('nurhavid123@gmail.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

-- Get the ID of the inserted user
-- (Assume the ID is 1 for this example)

-- Insert User-Role relationship into the join table
INSERT INTO users_roles (user_id, role_id)
VALUES (2, (SELECT id FROM m_role WHERE name = 'Customer'));




-- data seed menu
INSERT INTO m_menu (name, url, small_icon, big_icon, parent_id, created_at, updated_at, is_deleted)
VALUES ('Home', '/home', 'home', 'dashboard_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ('User Management', '/user-management', 'user_small', 'user_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ('Role Management', '/role-management', 'role_small', 'role_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ('Menu Management', '/menu-management', 'menu_small', 'menu_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ('Doctor Management', '/doctor-management', 'doctor_small', 'doctor_big', NULL, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, false),
       ('Medic Management', '/medic-management', 'medic_small', 'medic_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        false),
       ('Customer Management', '/customer-management', 'customer_small', 'customer_big', NULL, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, false),
       ('Appointment Management', '/appointment-management', 'appointment_small', 'appointment_big', NULL,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ('Prescription Management', '/prescription-management', 'prescription_small', 'prescription_big', NULL,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ('Payment Management', '/payment-management', 'payment_small', 'payment_big', NULL, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, false),
       ('News Management', '/news-management', 'news_small', 'news_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ('Author Management', '/author-management', 'author_small', 'author_big', NULL, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, false),
       ('Setting', '/setting', 'setting_small', 'setting_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);
-- data seed menu role
-- insert menu role for admin
INSERT INTO m_menu_role (menu_id, role_id, created_at, updated_at, is_deleted)
VALUES ((SELECT id FROM m_menu WHERE name = 'Home'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'News Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Author Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'User Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Role Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Menu Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Doctor Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Medic Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Customer Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Appointment Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Prescription Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Payment Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Setting'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

-- insert menu role for customer
INSERT INTO m_menu_role (menu_id, role_id, created_at, updated_at, is_deleted)
VALUES ((SELECT id FROM m_menu WHERE name = 'Dashboard'), (SELECT id FROM m_role WHERE name = 'Customer'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Appointment Management'), (SELECT id FROM m_role WHERE name = 'Customer'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Prescription Management'), (SELECT id FROM m_role WHERE name = 'Customer'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Payment Management'), (SELECT id FROM m_role WHERE name = 'Customer'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

-- insert menu role for doctor
INSERT INTO m_menu_role (menu_id, role_id, created_at, updated_at, is_deleted)
VALUES ((SELECT id FROM m_menu WHERE name = 'Dashboard'), (SELECT id FROM m_role WHERE name = 'Doctor'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Appointment Management'), (SELECT id FROM m_role WHERE name = 'Doctor'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ((SELECT id FROM m_menu WHERE name = 'Prescription Management'), (SELECT id FROM m_role WHERE name = 'Doctor'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);
-- Parent menu
INSERT INTO m_menu (name, url, small_icon, big_icon, parent_id, created_at, updated_at, is_deleted)
VALUES ('Management', '/management', 'management_small', 'management_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

-- Children menu (parent_id mengacu ke menu 'Management')
INSERT INTO m_menu (name, url, small_icon, big_icon, parent_id, created_at, updated_at, is_deleted)
VALUES 
  ('User Management', '/user-management', 'user_small', 'user_big', 
    (SELECT id FROM m_menu WHERE name = 'Management'), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
  ('Role Management', '/role-management', 'role_small', 'role_big', 
    (SELECT id FROM m_menu WHERE name = 'Management'), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
  ('Menu Management', '/menu-management', 'menu_small', 'menu_big', 
    (SELECT id FROM m_menu WHERE name = 'Management'), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

-- Untuk parent menu
INSERT INTO m_menu_role (menu_id, role_id, created_at, updated_at, is_deleted)
VALUES (
  (SELECT id FROM m_menu WHERE name = 'Management'),
  (SELECT id FROM m_role WHERE name = 'Admin'),
  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false
);

INSERT INTO m_menu_role (menu_id, role_id, created_at, updated_at, is_deleted)
VALUES (
  (SELECT id FROM m_menu WHERE name = 'User Management'),
  (SELECT id FROM m_role WHERE name = 'Customer'),
  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false
);
-- data seed author
-- Insert dummy data for Biodata
INSERT INTO m_biodata (full_name, mobile_phone, image_path, created_at, updated_at, is_deleted)
VALUES ('John Doe', '123456789false', '/images/john_doe.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ('Jane Smith', 'false987654321', '/images/jane_smith.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ('Alice Johnson', '1122334455', '/images/alice_johnson.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ('Bob Brown', '5566778899', '/images/bob_brown.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);
       
UPDATE m_user
SET biodata_id = (SELECT id FROM m_biodata WHERE full_name = 'John Doe')
WHERE id = 1;
UPDATE m_user
SET biodata_id = (SELECT id FROM m_biodata WHERE full_name = 'Jane Smith')
WHERE id = 2;

-- Insert dummy data for Admin (required for Author)
INSERT INTO m_admin (biodata_id, created_at, updated_at, is_deleted)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

-- Insert dummy data for Author
INSERT INTO m_author (admin_id, created_at, updated_at, is_deleted)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

-- Insert dummy data for News (associated with Author)
INSERT INTO m_news (title, content, author_id, created_at, updated_at, is_deleted)
VALUES ('News Title 1', 'Content for news 1', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ('News Title 2', 'Content for news 2', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ('News Title 3', 'Content for news 3', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false),
       ('News Title 4', 'Content for news 4', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);
