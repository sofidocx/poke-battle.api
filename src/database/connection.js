import { config } from "dotenv";
import pkg from "pg";

const { Pool } = pkg;

config()

const pool = new Pool({
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DB || "poke-db",
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "postgres",
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