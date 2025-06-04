import { errorSchema, pokemonBattleSchema, pokemonCreateSchema, pokemonSchema, pokemonUpdateSchema } from "./schema.js";

export const swaggerConfig = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "PokeAPI",
            version: "1.0.0",
            description: `
                API para gerenciar pokemons e batalhas

                Regras:
                - Apenas 3 tipos de pokemon
                - Todo pokemon deve iniciar com nivel 1
                - Apenas o treinador pode ser alterado
                - O pokemon é eliminado ao atingir o nivel 0
            ` 
        },
        components: {
            schemas: {
                Pokemon: pokemonSchema,
                PokemonCreate: pokemonCreateSchema,
                PokemonUpdate: pokemonUpdateSchema,
                BattleResult: pokemonBattleSchema,
                Error: errorSchema
            },
        },
        responses: {
            NotFound: {
                description: "Recurso não encontrado",
                content: {
                    "application/json": {
                        schema: errorSchema,
                        example: {
                            error: "Not Found",
                            message: "Pokemon com id não encontrado"
                        }                       
                    }
                }
            },
            ValidationError: {
                description: "Erro de validação",
                content: {
                    "application/json": {
                        schema: { $ref: '#/components/schemas/Error' },
                        example: {
                            error: "Validation Error",
                            message: "Tipo deve ser charizard, mewtwo ou pikachu"
                        }
                    }
                }
            },
            NoContent: {
                description: "Operação realizada com sucesso (sem conteúdo)"
            }
        }
    },
    apis: ['./src/routes/*.js']
};