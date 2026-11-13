require('dotenv').config();
import { Pool } from 'pg';
import promptSync = require('prompt-sync');
import { login } from './usuario';
const prompt = promptSync({ sigint: true });
import { runner } from 'node-pg-migrate'

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

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
runMigrations()


