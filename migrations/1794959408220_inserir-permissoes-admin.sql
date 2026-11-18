-- Up Migration
INSERT INTO perfil_permissoes (perfil_id, permissao_id) VALUES (1,1)
-- Down Migration
DELETE from perfil_permissoes 
WHERE perfil_id = 1 
and permissao_id = 1