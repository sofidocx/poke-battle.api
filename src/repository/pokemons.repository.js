import { query } from "../database/connection.js";
import { DatabaseException } from "../exception/pokemon.exception.js";


export class PokemonRepository {

    async findAll() {
        try {
            const sql = `
                SELECT id, tipo, treinador, nivel
                FROM pokemons
                ORDER by id ASC
            `;

            const result = await query(sql);
            return result.rows;
        } catch (error) {
            throw new DatabaseException("Buscar todos os pokemons", error);
        }
    }

    async findById(id) {
        try {
            const sql = `
                    SELECT id, tipo, treinador, nivel
                    FROM pokemons
                    WHERE id = $1
                `;

            const result = await query(sql, [id]);
            return result.rows[0] || null;
        } catch (error) {
            throw new DatabaseException("Buscar um pokemon por ID", error);
        }
    }

    async create(pokemonData) {
        try {
            const { tipo, treinador } = pokemonData;

            const sql = `
                    INSERT INTO pokemons (tipo, treinador, nivel)
                    VALUES ($1, $2, $3)
                    RETURNING id, tipo, treinador, nivel
                `;

            const result = await query(sql, [tipo, treinador, 1]);
            return result.rows[0];
        } catch (error) {
            throw new DatabaseException("Inserir um pokemon", error);
        }
    }

    async updateTrainer(id, treinador) {
        try {
            const sql = `
            UPDATE pokemons
            SET treinador = $1
            WHERE id = $2
            RETURNING id, tipo, treinador, nivel
                `;

            const result = await query(sql, [treinador, id]);

            return result.rows[0];
        } catch (error) {
            throw new DatabaseException("Atualizar o treinador", error);
        }
    }


    async updatePokemonLevel(id, novoNivel) {
        try {
            const sql = `
            UPDATE pokemons
            SET nivel = $1
            WHERE id = $2
            RETURNING id, tipo, treinador, nivel
                `;


            const result = await query(sql, [novoNivel, id]);

            return result.rows[0];
        } catch (error) {
            throw new DatabaseException("Atualizar o nível do pokemon", error);
        }
    }


    async delete(id) {
        try {
            const sql = `DELETE FROM pokemons WHERE id = $1`;
            const result = await query(sql, [id]);
            return result.rowCount > 0;
        } catch (error) {
            throw new DatabaseException("Erro ao deletar pokemon", error);
        }
    }
}