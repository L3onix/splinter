# ATENA

API REST do projeto Escola Ninja

+ Pré-requisitos
    - MongoDB server
        Para verificar se você já tem um servidor mongo rodando no docker utilize o comando abaixo, ele irá apresentar as informações sobre as imagens de docker que estão rodando.
        ```sh
        # docker container ls
        ```
        Se você não tiver um servidor mongodb rodando em sua máquina, o mesmo pode ser criado facilmente com docker utilizando o comando abaixo.
        ```sh
        # docker run -d -p 27017:27017 --name prime-mongodb --restart always mongo
        ```
        Você também pode instalar o MongoDB Compass, que pode auxiliar no controle do banco de dados com uma interface gráfica.

+ Docker Compose
    - MongoDB       =>  localhost:27017
    - MongoExpress  =>  localhost:8081

+ Rotas
    <h2>Teste</h2>
    - (get)/
    <br/>
    *Deve retornar um JSON {status: "ok"}*
    <h2>User</h2>
    <h2>Questao</h2>
    - (post)questaoAuth/
    ```json
        {
            codigo: 'string',
            enunciado: 'string',
            alternativas: ['string'],
            descritor: 'string',
            solucoes: [objectId],
            comentarios: [objectId]
        }
    ```
    *Deve retornar um JSON {status: "Sucesso ao criar questão"}*
    - (put)questaoAuth/questaoId
    ```json
        {
            codigo: 'string',
            enunciado: 'string',
            alternativas: ['string'],
            descritor: 'string',
            solucoes: [objectId],
            comentarios: [objectId]
        }
    ```
    *Deve retornar um JSON {status: "Sucesso ao editar questão"}*
    - (delete)questaoAuth/questaoId
    <br/>
    *Deve retornar um JSON {status: "Sucesso ao deletar questão"}*
    - (get)questao/
    <br/>
    *Deve retornar um JSON [ObjectQuestao]*
    - (get)questao/questaoId
    <br/>
    *Deve retornar um JSON ObjectQuestao*
    - (get)questao/descritor/descritorId
    <br/>
    *Deve retornar um JSON [ObjectQuestao]*