-- Up Migration
UPDATE usuarios 
SET perfil_id = 1 
WHERE email ILIKE 'admin@teste.com'
-- Down Migration
UPDATE usuarios 
SET perfil_id = NULL 
WHERE email ILIKE 'admin@teste.com'
