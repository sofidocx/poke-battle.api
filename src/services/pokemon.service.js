import { InvalidIdException, InvalidTypeException, PokemonNotFoundException, ValidationException } from "../exception/pokemon.exception.js";
import { PokemonRepository } from "../repository/pokemon.repository.js";
import { ValidatorUtils } from "../utils/validator.utils.js";

export class PokemonService {
    constructor() {
        this.pokemonRepository = new PokemonRepository();
        this.validatorUtils = new ValidatorUtils();
    }

    async getAll() {
        return await this.pokemonRepository.findAll();
    }

    async getById(id) {
        this.validatorUtils.validateId(id);

        const pokemon = await this.pokemonRepository.findById(id);

        if (!pokemon || pokemon === null) {
            throw new PokemonNotFoundException(id);
        }

        return pokemon;
    }

    async create(pokemonData) {
        this.validatorUtils.validatePokemonType(pokemonData.tipo);
        this.validatorUtils.validateTreinador(pokemonData.treinador);

        const newPokemon = await this.pokemonRepository.create(pokemonData);

        return newPokemon;  
    }

    async updateTreinador(id, novoTreinador) {
        this.validatorUtils.validateId(id);
        this.validatorUtils.validateTreinador(novoTreinador);

        const pokemonAtualizado = await this.pokemonRepository.updateTrainer(id, novoTreinador)

        return pokemonAtualizado;
    }

    async delete(id) {
        this.validatorUtils.validateId(id);

        const pokemonDelete = await this.pokemonRepository.delete(id);

        return pokemonDelete;
    }
}