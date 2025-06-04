import { Router } from "express";
import pokemonRoutes from "./pokemon.routes.js";
import { errorHandler } from "../middleware/errorHandler.js";




const routes = Router();

routes.use(pokemonRoutes);

routes.use(errorHandler);

export default routes;