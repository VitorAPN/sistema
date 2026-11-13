-- Up Migration
INSERT INTO usuarios (email, senha) VALUES (
    'admin@teste.com', 'teste'
)
-- Down Migration
DELETE FROM usuarios WHERE email LIKE 'admin@teste.com' 