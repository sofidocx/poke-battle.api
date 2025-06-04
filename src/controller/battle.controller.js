import { RequiredFieldsException } from "../exception/pokemon.exception.js";
import { BattleService } from "../services/battle.service.js";


export class BattleController {
    constructor(){
        this.battleService = new BattleService();
    }

    async batalhar(req, res){
        const {pokemonAId, pokemonBId} = req.params;

        if(!pokemonAId, !pokemonBId){
            throw new RequiredFieldsException(["pokemonAId", "pokemonBId"])
        }

        const battleResult = await this.battleService.battle(pokemonAId, pokemonBId);

        res.status(200).json(battleResult);
    }
}