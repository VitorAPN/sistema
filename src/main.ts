require('dotenv').config();
import { Pool } from 'pg';
import promptSync = require('prompt-sync');
const prompt = promptSync({ sigint: true });
import { runner } from 'node-pg-migrate'
import UsuarioService from './usuarioService';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

(async function main() {
    await runMigrations();
    const client = await pool.connect();
    const usuarioService = new UsuarioService(client);
    console.log(await usuarioService.procurarUsuarioEmail('admin@teste.com'));

    console.log("==Entre com suas credenciais==")
    const email = prompt("Digite seu email: ");
    const senha = prompt("Digite sua senha: ");
    const loginSucesso = await usuarioService.login({ email, senha });
    if (loginSucesso) {
        await menu(usuarioService);
    }
    await client.end();
})()


async function menu(usuarioService: UsuarioService) {
    let escolha: number = 9
    do {
        console.log("===Menu de usuários===");
        console.log("1 - Cadastrar usuário");
        console.log("2 - Visualizar todos usuários");
        console.log("3 - Deletar usuário");
        console.log("0 - Sair do menu");
        escolha = Number(prompt('Qual sua escolha?'));
        switch (escolha) {
            case 1:
                const email = prompt("Digite o email: ");
                const senha = prompt("Digite a senha: ");
                await usuarioService.cadastrar({ email, senha });
                break;
            case 2:
                console.log(await usuarioService.listarTodos());
                break;
            case 3:
                console.log("À ser implementado");
                break;
            case 0:
                console.log("Você escolheu sair");
                break;
            default:
                console.log("Digite uma opção válida");

        }
    } while (escolha !== 0)
}



async function runMigrations() {
    const client = await pool.connect();
    try {
        await runner({
            dbClient: client,
            dir: 'migrations',
            direction: 'up',
            migrationsTable: 'pgmigrations',
        })
        console.log('Migrações executadas com sucesso!');
    } catch (error) {
        console.error('Erro ao rodar migrações:', error);
    } finally {
        await client.end()
    }
}



