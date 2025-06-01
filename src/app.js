import cors from "cors";
import { config } from "dotenv";
import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { swaggerConfig } from "./docs/swagger.config.js";


config();

const app = express();

app.use(cors());
app.use(express.json())

const specs = swaggerJSDoc(swaggerConfig);

app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, {
        explorer: true
    })
);

app.use((req, res) => {
    res.status(404).json({
        error: "Rota não encontrada",
        message: `A rota ${req.method} ${req.originalUrl} não existe`,
        docs: "/docs" 
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}`)
    console.log(`Documentação: http://localhost:${PORT}/docs`)
})
