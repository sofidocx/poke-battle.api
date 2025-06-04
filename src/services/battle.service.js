import { PokemonNotFoundException } from "../exception/pokemon.exception.js";
import { PokemonRepository } from "../repository/pokemon.repository.js";
import { ValidatorUtils } from "../utils/validator.utils.js";

export class BattleService {
    constructor(){
        this.pokemonRepository = new PokemonRepository();
        this.validatorUtil = new ValidatorUtils();
    }

    async battle(pokemonIdA, pokemonIdB){
        this.validatorUtil.validateId(pokemonIdA);
        this.validatorUtil.validateId(pokemonIdB);

        const battlePokemons = await this.getBattlePokemons(pokemonIdA, pokemonIdB);

        const battleResult = this.determineWinner(battlePokemons.pokemonA, battlePokemons.pokemonB);

        const consolidatedResult = await this.executeBattleResult(battleResult.vencedor, battleResult.perdedor);

        return consolidatedResult;
    }

    determineWinner(pokemonA, pokemonB){
        const levelA = pokemonA.nivel;
        const levelB = pokemonB.nivel;

        const total = levelA + levelB;

        const pokemonAProbabilityWin = levelA / total;

        const randomNumber = Math.random();

        return randomNumber < pokemonAProbabilityWin ? {
            vencedor: pokemonA,
            perdedor: pokemonB
        } : {
            vencedor: pokemonB,
            perdedor: pokemonA
        };
    }

    async getBattlePokemons(pokemonIdA, pokemonIdB){
        const pokemonA = await this.pokemonRepository.findById(pokemonIdA);

        if(!pokemonA){
            throw new PokemonNotFoundException(pokemonIdA)
        }

        const pokemonB = await this.pokemonRepository.findById(pokemonIdB);

        if(!pokemonB){
            throw new PokemonNotFoundException(pokemonIdB)
        }

        return {
            pokemonA,
            pokemonB
        }
    }

    async executeBattleResult(winner, loser){

        const winnerUpdated = await this.pokemonRepository.updatePokemonLevel(winner.id, winner.nivel + 1)
        const loserUpdated = await this.pokemonRepository.updatePokemonLevel(loser.id, loser.nivel - 1)

        if(loserUpdated.nivel < 1){
            await this.pokemonRepository.delete(loser.id)
        }

        return {
            vencedor: winnerUpdated,
            perdedor: loserUpdated
        }
    }
}