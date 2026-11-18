-- Up Migration
ALTER TABLE usuarios 
ADD COLUMN perfil_id INTEGER REFERENCES perfis (id)
-- Down Migration
ALTER TABLE usuarios
DROP COLUMN perfil_id