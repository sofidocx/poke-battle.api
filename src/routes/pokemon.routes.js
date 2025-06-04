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

/**
 * @swagger
 * /pokemons/{id}:
 *   put:
 *     summary: Atualizar treinador do pokemon
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PokemonUpdate'
 *     responses:
 *       200:
 *         description: Pokemon atualizado
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
 *       404:
 *         description: Pokemon não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
pokemonRoutes.put("/pokemons/:id", (req, res) => pokemonController.alterar(req, res))

/**
 * @swagger
 * /pokemons/{id}:
 *   delete:
 *     summary: Deletar pokemon
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Pokemon deletado com sucesso
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
pokemonRoutes.delete("/pokemons/:id", (req, res) => pokemonController.deletar(req, res)) 

/**
 * @swagger
 * /pokemons/{id}:
 *   get:
 *     summary: Buscar pokemon por ID
 *     tags: [Pokemon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Pokemon encontrado
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
 *       404:
 *         description: Pokemon não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
pokemonRoutes.get("/pokemons/:id", (req, res) => pokemonController.carregar(req, res))

/**
 * @swagger
 * /pokemons:
 *   get:
 *     summary: Listar todos os pokemons
 *     tags: [Pokemon]
 *     responses:
 *       200:
 *         description: Lista de pokemons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pokemon'
 */
pokemonRoutes.get("/pokemons", (req, res) => pokemonController.listar(req, res)) 


export default pokemonRoutes;