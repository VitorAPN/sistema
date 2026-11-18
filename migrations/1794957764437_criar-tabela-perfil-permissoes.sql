-- Up Migration
CREATE TABLE perfil_permissoes(
	id SERIAL PRIMARY KEY,
	perfil_id INTEGER REFERENCES perfis(id),
	permissao_id INTEGER REFERENCES permissoes(id)
);
-- Down Migration
DROP TABLE perfil_permissoes;