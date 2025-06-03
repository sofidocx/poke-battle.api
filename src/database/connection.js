import { config } from "dotenv";
import pkg from "pg";

const { Pool } = pkg;

config()

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    max: 15
})

export const query = async (text, params = []) => {
    try {
        const result = await pool.query(text, params);
        return result;
    } catch (error) {
        throw error;
    }
}

export const testConnection = async () => {
    try {
        const result = await query("SELECT NOW() AS timestamp");
        console.log("Banco de dados conectado, resultado da query de teste: ", result.rows[0].timestamp)
        return true;
    } catch (error) {
        throw error
    }
}

export default pool