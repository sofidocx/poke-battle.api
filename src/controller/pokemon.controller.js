import { RequiredFieldsException } from "../exception/pokemon.exception.js";
import { PokemonService } from "../services/pokemon.service.js";

export class PokemonController {
  constructor() {
    this.pokemonService = new PokemonService();
  }

  async criar(req, res) {
    const { tipo, treinador } = req.body;

    if (!tipo || !treinador) {
      throw new RequiredFieldsException(["tipo", "treinador"]);
    }

    const newPokemon = await this.pokemonService.create({
      tipo,
      treinador,
    });

    return res.status(200).json(newPokemon);
  }

  async alterar(req, res) {
    const { treinador } = req.body;

    if (!treinador) {
      throw new RequiredFieldsException(["treinador"]);
    }

    await this.pokemonService.updateTreinador(req.params.id, treinador);

    return res.status(204).send();
  }

  async deletar(req, res) {
    await this.pokemonService.delete(req.params.id);

    return res.status(204).send();
  }

  async carregar(req, res) {
    const pokemonEncontrado = await this.pokemonService.getById(req.params.id);

    return res.status(200).json(pokemonEncontrado)
  }

  async listar(req, res){
    const pokemons = await this.pokemonService.getAll();

    return res.status(200).json(pokemons)    
  }
}