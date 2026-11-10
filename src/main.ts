require('dotenv').config();
import { Pool } from 'pg';
import promptSync = require('prompt-sync');
import { login } from './usuario';
const prompt = promptSync({ sigint: true });

let escolha = 1

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

async function consultar() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT NOW()');
        console.log('Horário do banco:', res.rows[0]);
    } finally {
        client.release();
    }
}

consultar();

// do {
//     login();
// } while (escolha != 0);




