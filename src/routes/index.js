import { Router } from "express";
import pokemonRoutes from "./pokemon.routes.js";
import { errorHandler } from "../middleware/errorHandler.js";
import battleRoutes from "./battle.routes.js";




const routes = Router();

routes.use(pokemonRoutes);
routes.use(battleRoutes);

routes.use(errorHandler);

export default routes;