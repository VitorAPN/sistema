-- Up Migration
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(30) NOT NULL
);
-- Down Migration
DROP TABLE usuarios;