-- Up Migration
CREATE TABLE perfis (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(20) UNIQUE
)
-- Down Migration
DROP TABLE perfis