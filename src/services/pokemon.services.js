import { InvalidIdException, InvalidTypeException, PokemonNotFoundException, ValidationException } from "../exception/pokemon.exception.js";
import { PokemonRepository } from "../repository/pokemon.repository.js";

export class PokemonService {
    constructor() {
        this.pokemonRepository = new PokemonRepository();
        this.validTypes = ["charizard", "mewtwo", "pikachu"];
    }

    async getAll() {
        return await this.pokemonRepository.findAll();
    }

    async getById(id) {
        this.validateId(id);

        const pokemon = await this.pokemonRepository.findById(id);

        if (!pokemon || pokemon === null) {
            throw new PokemonNotFoundException(id);
        }

        return pokemon;
    }

    async create(pokemonData) {
        this.validatePokemonType(pokemonData.tipo);
        this.validateTreinador(pokemonData.treinador);

        const newPokemon = await this.pokemonRepository.create(pokemonData);

        return newPokemon;
    }

    async updateTreinador(id, novoTreinador) {
        this.validateId(id);
        this.validateTreinador(novoTreinador);

        const pokemonAtualizado = await this.pokemonRepository.updateTrainer(id, treinador)

        return pokemonAtualizado;
    }

    async delete(id) {
        this.validateId(id);

        const pokemonDelete = await this.pokemonRepository.delete(id);

        return pokemonDelete;
    }

    validatePokemonType(type) {
        if (!tipo || typeof type !== "string") {
            throw new ValidationException(
                "Para validar o tipo do pokemon, é necessario que seja uma string"
            );
        }

        if (!this.validTypes.includes(type.toLowerCase())) {
            throw new InvalidTypeException(this.validTypes);
        }
    }

    validateId(id) {
        if (!id || id === null || isNaN(id) || id <= 0) {
            throw new InvalidIdException();
        }
    }

    validateTreinador(treinador) {
        if (typeof treinador !== "string") {
            throw new ValidationException("Treinador precisa ser uma string");
        }

        if (treinador.length < 3) {
            throw new ValidationException("Nome do treinador, precisa ter mais de 3 caracteres");
        }
    }
}