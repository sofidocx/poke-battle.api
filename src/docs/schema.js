export const pokemonSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer",
            description: "ID único do pokemon",
            example: 1
        },
        tipo: {
            type: "string",
            enum: ["charizard", "mewtwo", "pikachu"],
            description: "Tipo do pokemon (Apenas 3 tipos são permitidos)",
            example: "pikachu"
        },
        treinador: {
            type: "string",
            description: "Nome do treinador do pokemon",
            example: "Ash"
        },
        nivel: {
            type: "integer",
            minimum: 1,
            description: "Nível do pokemon (mínimo 1)",
            example: 3
        }
    }   
}

export const pokemonCreateSchema = {
    type: "object",
    required: ["type", "treinador"],
    properties: {
        tipo: pokemonSchema.properties.type,
        treinador: pokemonSchema.properties.trainer
    }
};

export const pokemonUpdateSchema = {
    type: "object",
    required: ["treinador"],
    properties: {
        treinador: pokemonSchema.properties.trainer
    }
};

export const pokemonBattleSchema = {
    type: "object",
    properties: {
        vencedor: pokemonSchema, 
        perdedor: pokemonSchema
    }
}

export const errorSchema = {
    type: "object",
    properties: {
        message: {
            type: "string",
            description: "Descrição do erro",
            example: "Erro genérico"
        },
        error: {
            type: "string",
            description: "Tipo de erro",
            example: "Generic Error"
        }
    }
}

export default {
    pokemonSchema,
    pokemonBattleSchema,
    pokemonCreateSchema,
    pokemonUpdateSchema,
    errorSchema
}


