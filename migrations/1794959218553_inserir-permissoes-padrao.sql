-- Up Migration
INSERT INTO permissoes (descricao) values (
	'GERENCIAR_USUARIOS'
)
-- Down Migration
DELETE from permissoes WHERE descricao LIKE 'GERENCIAR_USUARIOS'