# EngWeb2023 -TPC6

O trabalho para casa 6, da unidade curricular de engenharia web, resume-se em 3 propostas:
- Uma api de dados para um dataset de pessoas (API_pessoas)
- Um script em python para a inserção de pessoas (insertPessoas)
- Uma api de dados para um dataset de treinos (AppTreinos)

### API_pessoas
A api de pessoas proposta é utilizada para receber vários posts de objetos do tipo pessoa, esta api tanto pode receber um objeto pessoa como uma lista de objetos pessoa. A api foi projetada para reagit a qualquer uma das operações de CRUD, embora que, para este exercicio apenas seja necesssario a função de inserção de dados na base de dados.

### insertPessoas
Um script em python com o objetivo de inserir o dataset na base de dados. O script carrega o dataset para memória e em seguida, de dez em dez registos(por motivos de otimização), realiza um post contendo 10 pedidos para a api de dados(API_pessoas) de forma a mesma inserir os registos na base de dados mongoDB

### AppTreinos
Aplicação desenvolvida na aula sexta aula prática, nesta aplicação é possível realizar operações CRUD sobre uma determinada base de dados. Como extra para este tpc foi sugerido aos alunos a implementação das seguintes operações: 
- GET /treinos/modalidades
    Deve retornar uma string JSON com a lista de todas as modalidades, sem repetidos e ordenados por ordem alfabetica;
- GET /treinos/duracao
    Deve retornar a soma do valor de todas as duracoes das atividades realizadas;
- GET /treinos/atletas
    Deve retornar uma string JSON com a lista de todas os atletas, sem repetidos e ordenados por ordem alfabetica;
