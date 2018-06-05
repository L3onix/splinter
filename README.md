# webs-pev
====================

API rest para aplicações voltadas para auxiliar na educação escolar

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
    - (post)/auth/register          =>  cadastro
        ```json
        {
            "name": "string",
            "email": "string",
            "password": "string"
        }
        ```
    - (post)/auth/authenticate      =>  atenticação
        ```json
        {
            "email": "string",
            "password": "string"
        }
        ```
    - (get)/questions => questões

    - (post)/questaoAuthController  => inserir novas questões
        ```json
        {
            "codigo": "string",
            "descricao": "string",
            "eixo": "string
        }
        ```

