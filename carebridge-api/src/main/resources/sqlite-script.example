-- Insert roles into the m_role table
INSERT INTO m_role (name, code, created_at, updated_at, is_deleted)
VALUES ('Admin', 'ROLE_ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Customer', 'ROLE_CUSTOMER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Doctor', 'ROLE_DOCTOR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Medic', 'ROLE_MEDIC', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);

-- Insert User Role admin
INSERT INTO m_user (email, role_id, created_at, updated_at, is_deleted)
VALUES ('nurfaizal966@gmail.com', (SELECT id FROM m_role WHERE name = 'Admin'), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        0);


-- data seed for registration flow
-- create token otp for registration email
INSERT INTO t_token (email, token, used_for, created_at, updated_at, expired_at, is_deleted)
VALUES ('nurhavid123@gmail.com', '123456', 'REGISTRATION', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        strftime('%Y-%m-%d %H:%M:%S', 'now', '+3 minutes'), 0);

-- verify token otp for registration email
INSERT INTO m_user (email, role_id, created_at, updated_at, is_deleted)
VALUES ('nurhavid123@gmail.com', (SELECT id FROM m_role WHERE name = 'Customer'), CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        0);


-- data seed menu
INSERT INTO m_menu (name, url, small_icon, big_icon, parent_id, created_at, updated_at, is_deleted)
VALUES ('Home', '/home', 'home', 'dashboard_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('User Management', '/user-management', 'user_small', 'user_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Role Management', '/role-management', 'role_small', 'role_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Menu Management', '/menu-management', 'menu_small', 'menu_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Doctor Management', '/doctor-management', 'doctor_small', 'doctor_big', NULL, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, 0),
       ('Medic Management', '/medic-management', 'medic_small', 'medic_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        0),
       ('Customer Management', '/customer-management', 'customer_small', 'customer_big', NULL, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, 0),
       ('Appointment Management', '/appointment-management', 'appointment_small', 'appointment_big', NULL,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Prescription Management', '/prescription-management', 'prescription_small', 'prescription_big', NULL,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Payment Management', '/payment-management', 'payment_small', 'payment_big', NULL, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, 0),
       ('News Management', '/news-management', 'news_small', 'news_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Author Management', '/author-management', 'author_small', 'author_big', NULL, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, 0),
       ('Setting', '/setting', 'setting_small', 'setting_big', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);
-- data seed menu role
-- insert menu role for admin
INSERT INTO m_menu_role (menu_id, role_id, created_at, updated_at, is_deleted)
VALUES ((SELECT id FROM m_menu WHERE name = 'Home'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'News Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Author Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'User Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Role Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Menu Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Doctor Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Medic Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Customer Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Appointment Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Prescription Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Payment Management'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Setting'), (SELECT id FROM m_role WHERE name = 'Admin'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);

-- insert menu role for customer
INSERT INTO m_menu_role (menu_id, role_id, created_at, updated_at, is_deleted)
VALUES ((SELECT id FROM m_menu WHERE name = 'Dashboard'), (SELECT id FROM m_role WHERE name = 'Customer'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Appointment Management'), (SELECT id FROM m_role WHERE name = 'Customer'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Prescription Management'), (SELECT id FROM m_role WHERE name = 'Customer'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Payment Management'), (SELECT id FROM m_role WHERE name = 'Customer'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);

-- insert menu role for doctor
INSERT INTO m_menu_role (menu_id, role_id, created_at, updated_at, is_deleted)
VALUES ((SELECT id FROM m_menu WHERE name = 'Dashboard'), (SELECT id FROM m_role WHERE name = 'Doctor'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Appointment Management'), (SELECT id FROM m_role WHERE name = 'Doctor'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ((SELECT id FROM m_menu WHERE name = 'Prescription Management'), (SELECT id FROM m_role WHERE name = 'Doctor'),
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);

-- data seed author
-- Insert dummy data for Biodata
INSERT INTO m_biodata (full_name, mobile_phone, image_path, created_at, updated_at, is_deleted)
VALUES ('John Doe', '1234567890', '/images/john_doe.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Jane Smith', '0987654321', '/images/jane_smith.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Alice Johnson', '1122334455', '/images/alice_johnson.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('Bob Brown', '5566778899', '/images/bob_brown.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);

-- Insert dummy data for Admin (required for Author)
INSERT INTO m_admin (biodata_id, created_at, updated_at, is_deleted)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);

-- Insert dummy data for Author
INSERT INTO m_author (admin_id, created_at, updated_at, is_deleted)
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       (2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);

-- Insert dummy data for News (associated with Author)
INSERT INTO m_news (title, content, author_id, created_at, updated_at, is_deleted)
VALUES ('News Title 1', 'Content for news 1', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('News Title 2', 'Content for news 2', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('News Title 3', 'Content for news 3', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0),
       ('News Title 4', 'Content for news 4', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0);
