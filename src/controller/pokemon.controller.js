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
}