import { Router } from "express";
import { BattleController } from "../controller/battle.controller.js";



const battleRoutes = Router();
const battleController = new BattleController();

/**
 * @swagger
 * /batalhar/{pokemonAId}/{pokemonBId}:
 *   post:
 *     summary: Batalha entre dois pokemons
 *     description: |
 *       Algoritmo probabilístico baseado nos níveis dos pokemons:
 *       - Probabilidade = nível do pokemon / (nível A + nível B)
 *       - Vencedor ganha +1 nível, perdedor perde -1 nível
 *       - Pokemon que chega a nível 0 é deletado automaticamente
 *     tags: [Batalha]
 *     parameters:
 *       - in: path
 *         name: pokemonAId
 *         required: true
 *         schema: { type: integer }
 *         description: ID do primeiro pokemon
 *       - in: path
 *         name: pokemonBId
 *         required: true
 *         schema: { type: integer }
 *         description: ID do segundo pokemon
 *     responses:
 *       200:
 *         description: Batalha realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BattleResult'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Pokemon não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
battleRoutes.post("/batalhar/:pokemonAId/:pokemonBId", (req, res) => battleController.batalhar(req, res))

export default battleRoutes;