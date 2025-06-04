class BaseException extends Error {
    constructor(message, statusCode, errorType) {
        super(message);
        this.statusCode = statusCode,
        this.errorType = errorType,
        this.name = this.constructor.name;
    }
}


export class ValidationException extends BaseException {
    constructor(message){
        super(message, 400, "Validation Error")
    }
}

export class InvalidIdException extends BaseException {
    constructor(){
        super("ID deve ser um número válido maior que zero", 400, "Invalid ID Error")
    }
}

export class InvalidTypeException extends BaseException {
    constructor(validTypes){
        super(`Tipo inváido. Tipos validos são ${validTypes.join(", ")}`, 400, "Invalid Type Error")
    }
}

export class RequiredFieldsException extends BaseException {
    constructor(fields){
        const fieldList = fields.join(", ");
        super(`Campos obrigatórios não fornecidos: ${fieldList}`, 400, "Required fields Error");
    }
}

export class PokemonNotFoundException extends BaseException {
    constructor(id){
        super(`Pokemon com o id: ${id}. Não foi encontrado`, 400, "Pokemon Not Found") 
    }
}

export class DatabaseException extends BaseException {
    constructor(operation, originalError = null){
        const message = `Erro de banco de dados ao executar: ${operation}`
        super(message, 500, "Database Error");
        this.originalError = originalError;
    }
}

