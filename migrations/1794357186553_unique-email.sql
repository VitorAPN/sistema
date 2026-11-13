-- Up Migration
ALTER TABLE usuarios
ADD CONSTRAINT UC_email UNIQUE (email);
-- Down Migration
ALTER TABLE usuarios
DROP CONSTRAINT UC_email;