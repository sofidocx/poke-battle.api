import { InvalidIdException, InvalidTypeException, ValidationException } from "../exception/pokemon.exception.js";

export class ValidatorUtils {
  constructor() {
    this.validTypes = ["charizard", "mewtwo", "pikachu"];
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
      throw new ValidationException(
        "Nome do treinador, precisa ter mais de 3 caracteres"
      );
    }
  }

  validatePokemonType(type) {
    if (!type || typeof type !== "string") {
      throw new ValidationException(
        "Para validar o tipo do pokemon, é necessario que seja uma string"
      );
    }

    if (!this.validTypes.includes(type.toLowerCase())) {
      throw new InvalidTypeException(this.validTypes);
    }
  }
}
