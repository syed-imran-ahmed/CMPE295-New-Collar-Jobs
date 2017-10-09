
-- the password hash is generated by BCrypt Calculator Generator(https://www.dailycred.com/article/bcrypt-calculator)
INSERT INTO user (id, username, password, firstname, lastname) VALUES (1, 'user', '$2a$04$Vbug2lwwJGrvUXTj6z7ff.97IzVBkrJ1XfApfGNl.Z695zqcnPYra', 'Imran', 'Ahmed');
INSERT INTO user (id, username, password, firstname, lastname) VALUES (2, 'admin', '$2a$10$DcaGrdizdHn6iIRl3yTfdeRKm4j6If6bqhqxGDeIDzB/HJ4mOKT5m', 'John', 'Lennon');

INSERT INTO authority (id, name) VALUES (1, 'ROLE_USER');
INSERT INTO authority (id, name) VALUES (2, 'ROLE_ADMIN');

INSERT INTO user_authority (user_id, authority_id) VALUES (1, 1);
INSERT INTO user_authority (user_id, authority_id) VALUES (2, 1);
INSERT INTO user_authority (user_id, authority_id) VALUES (2, 2);