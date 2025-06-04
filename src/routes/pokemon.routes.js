import { Router } from "express";
import { PokemonController } from "../controller/pokemon.controller.js";



const pokemonRoutes = Router();
const pokemonController = new PokemonController();

/**
 * @swagger
 * /pokemons:
 *   post:
 *     summary: Criar pokemon
 *     tags: [Pokemon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PokemonCreate'
 *     responses:
 *       201:
 *         description: Pokemon criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       400:
 *         description: Erro de validação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
pokemonRoutes.post("/pokemons", (req, res) => pokemonController.criar(req, res))


export default pokemonRoutes;