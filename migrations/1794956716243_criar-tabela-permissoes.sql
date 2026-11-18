-- Up Migration
CREATE TABLE permissoes (
	id SERIAL PRIMARY KEY,
	descricao VARCHAR(80) UNIQUE 
);
-- Down Migration
DROP TABLE permissoes;