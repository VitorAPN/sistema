-- Up Migration
INSERT INTO perfis (nome) values
('Admin' ),
('Gerente'),
('Cliente'),
('Entregador')
-- Down Migration
DELETE FROM perfis WHERE nome in ('Admin','Gerente','Cliente','Entregador')