# Pokemon CRUD - Desafio 

## Descrição 

Este projeto é uma API desenvolvida de pokemons que realiza um **CRUD de pokémons** e possui um **algoritmo de batalha**, onde pokémons podem batalhar entre si, ganhando ou perdendo níveis.

##  Objetivo
O objetivo deste projeto é demonstrar a construção de uma API backend utilizando Node.js e Express, 
com persistência dos dados em um banco PostgreSQL, containerizado via Docker. 

A API permite:
- Realizar operações CRUD com pokémons.
- Simular batalhas entre pokémons.
- Aplicar regras de negócio que definem evolução, derrota e exclusão dos pokémons.
- Documentação interativa com Swagger.

## Rodando o projeto localmente 

### Pré-requisitos 
- Docker instalado 
- Node.js instalado 

### Subindo o banco com docker 
- Dentro da pasta deploy/local-database-only, execute o comando: 
```bash 
docker-compose up -d
```
### Rodando o projeto 
```bash 
npm install
npm run start 
```
Servidor rodando em http://localhost:3000

### Documentação Swagger 
http://localhost:3000/docs

## Endpoints da API 

- POST/pokemons - cria um novo pokemon 
- GET/pokemons - lista todos os pokemons 
- GET/pokemons/:id - busca um pokemon por ID 
- PUT/pokemons/:id - atualiza o treinador de um pokemon 
- DELETE/pokemon/:id - deleta um pokemon 

Só aceita tipos: pikachu, charizar, mewto 
Todo pokemon irá iniciar nível 1 


- POST/batalhar/:pokemonAId/:pokemonBId - realiza uma batalha entre pokemons 


A chance de vitória é proporcional ao nível de cada pokemon 
Vencedor: +1 nível 
Perdedor: -1 nível (caso perdedor chegue no nível 0, deve ser deletado do banco)


## Observação 
Este projeto foi desenvolvido como parte de um desafio técnico, apllicando boas práticas de desenvolvimento, arquitetura em camadas e implementação de regra de negócios. 