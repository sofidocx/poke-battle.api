import { query } from "../database/connection.js";


export class PokemonRepository {


    async findAll(){
        const sql =`
            SELECT *
            FROM pokemons
            ORDER by id ASC
        `;

        const result = await query(sql);
        return result.rows;
    }

    async findById(id){
        const sql = `
            SELECT *
            FROM pokemons
            WHERE id = $1
        `

        const result = await query(sql, [id])
        return result.rows[0] || null
    }

    async create(pokemonData) {
        const { tipo, treinador } = pokemonData;

        const sql = `
            INSERT INTO pokemons (tipo, treinador, nivel)
            VALUES ($1, $2, $3)
            RETURNING id, tipo, treinador, nivel
        `;

        const result = await query(sql, [tipo, treinador, 1])
        return result.rows[0];
    }

    async updateTrainer(id, treinador){

        const sql = `
            UPDATE pokemons
            SET treinador = $1
            WHERE id = $2
            RETURNING id, tipo, treinador, nivel
        `

        const result = await query(sql, [treinador, id]);
        return result.rows[0];
    }

    async delete(id){
        const sql = `DELETE FROM pokemons WHERE id = $1`;
        const result = await query(sql, [id]);
        return result.rowCount > 0;
    }
}
