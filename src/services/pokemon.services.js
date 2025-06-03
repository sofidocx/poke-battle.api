import { PokemonRepository } from "../repository/pokemon.repository.js";

export class PokemonService {
  constructor() {
    this.pokemonRepository = new PokemonRepository();
    this.validTypes = ["charizard", "mewtwo", "pikachu"];
  }

  async getAll() {
    try {
      return await this.pokemonRepository.findAll();
    } catch (error) {
      throw new Error(`Erro ao buscar pokemons: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      this.validateId();

      const pokemon = await this.pokemonRepository.findById(id);

      if (!pokemon || pokemon === null) {
        throw new Error("Pokemon não foi encontrado");
      }

      return pokemon;
    } catch (error) {
      throw new Error(`Erro ao buscar pokemon: ${error.message}`);
    }
  }

  async create(pokemonData) {
    this.validatePokemonType(pokemonData.tipo);
    this.validateTreinador(pokemonData.treinador);

    const newPokemon = await this.pokemonRepository.create(pokemonData);

    return newPokemon;
  }

  async updateTreinador(id, novoTreinador) {
    try {
      this.validateId(id);
      this.validateTreinador(novoTreinador);

      const pokemonAtualizado = await this.pokemonRepository.updateTrainer(id, treinador)

      return pokemonAtualizado;
    } catch (error) {
        throw new Error(`Erro ao atualizar pokemon: ${error.message}`)
    }
  }

  async delete(id){
    try {
      this.validateId(id);

      const pokemonDelete = await this.pokemonRepository.delete(id);

      return pokemonDelete;
    } catch (error) {
      throw new Error(`Erro ao deletar pokemon de ID: ${id}`) 
    }
  }

  validatePokemonType(type) {
    if (!tipo || typeof type !== "string") {
      throw new Error(
        "Para validar o tipo do pokemon, é necessario que seja uma string"
      );
    }

    if (!this.validTypes.includes(type.toLowerCase())) {
      throw new Error(
        `Tipo inválido. Tipos aceitos são: ${this.validTypes.join(", ")}`
      );
    }
  }

  validateId(id) {
    if (!id || id === null || isNaN(id) || id <= 0) {
      throw new Error("ID deve ser válido");
    }
  }

  validateTreinador(treinador) {
    if (typeof treinador !== "string") {
      throw new Error("Treinador precisa ser uma string");
    }

    if (treinador.length < 3) {
      throw new Error("Nome do treinador, precisa ter mais de 3 caracteres");
    }
  }
}