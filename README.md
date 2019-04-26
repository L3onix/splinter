# MESTRE-SPLINTER
API Rest para aplicativo educacional. Desenvolvida durante o projeto de pesquisa da UNTIINS visando utilizar tecnologia de informação para auxiliar no processo de aprendizado e no desenvolvimento de novas metodologias de ensino.

## Rodando API localmente
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

## Rotas

+ **(GET) URL/**
    > Rota padrão, funciona apenas como uma rota de teste para verificar se a API está funcionando.
    - Entrada
    ```json
    {}
    ```
    - Saída
    ```json
    {
        "status": "ok"
    }
    ```

    ### **User**
    + **(POST) URL/auth/register**
        > Rota para cadastrar um novo usuário ao sistema.
        - Entrada
        ```json
        {
            "name": "Juninho K Mix",
            "email": "juninho@teste.com",
            "password": "*******",
            "flag": "student"
        }
        ```
        - Saída
        ```json
        {
            "user": {
                "flag": "student",
                "_id": "5c952fda718b2a00049ddb09",
                "name": "Juninho K Mix",
                "email": "juninho@teste.com",
                "createAt": "2019-03-22T18:56:26.933Z",
                "__v": 0
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTUyZmRhNzE4YjJhMDAwNDlkZGIwOSIsImlhdCI6MTU1MzI4MDk4NywiZXhwIjoxNTUzMzY3Mzg3fQ.DvycNODB0I-IWNpz6JJ5LvEYiRCdc_dt7tTNwq2mX1Q"
        }
        ```

    + **(POST) URL/auth/authenticate**
        > Rota para autenticar usuário.
        - Entrada
        ```json
        {
            "email": "juninho@teste.com",
            "password": "*******"
        }
        ```
        - Saída
        ```json
        {
            "user": {
                "flag": "student",
                "_id": "5c952fda718b2a00049ddb09",
                "name": "Juninho K Mix",
                "email": "juninho@teste.com",
                "createAt": "2019-03-22T18:56:26.933Z",
                "__v": 0
            },
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTUyZmRhNzE4YjJhMDAwNDlkZGIwOSIsImlhdCI6MTU1MzI4MTc2OCwiZXhwIjoxNTUzMzY4MTY4fQ.xaKsqrhX7pJKsER-eTmQwzxIxRXWbLR8wno_mjMW2zs"
        }
        ```
    
    ### **Comment**
    + **(GET) URL/comment**
        > Rota destinada apenas para teste com os *comments* da API.
        - Entrada
        ```json
        {}
        ```
        - Saída
        ```json
        {

        }
        ```
    
    + **(POST) URL/commentAuth/questionId**
        > Rota destinada pra criar um *comment* referente a uma *question* utilizando o "*questionId*" presente na URL.
        - Entrada
        ```json
        {
            "text": "Solução muito simples e intuitiva"
        }
        ```
        - Saída
        ```json
        {

        }
        ```
    
    ### **Question**
    + **(GET) URL/question/**
        > Rota destina apenas para teste com as *question* da API
        - Entrada
        ```json
        {}
        ```
        - Saída
        ```json
        [
            {
                "tags": [
                    "estudo",
                    "aprendizado"
                ],
                "solutions": [],
                "comments": [],
                "_id": "5c953b8d718b2a00049ddb0b",
                "font": "teste - 2019",
                "statement": "Qual o método de estudo que você utiliza para conseguir maior eficiência de aprendizado?",
                "matter": "desenvolvimento pessoal",
                "createBy": "5c953b7a718b2a00049ddb0a",
                "createAt": "2019-03-22T19:46:21.207Z",
                "__v": 0
            }
        ]
        ```
    
    + **(POST) URL/questionAuth**
        > Rota para criar uma *Question*, por definição somente usuários com a flag "*teacher*" estão permitidos a fazer esta operação.
        - Entrada
            ```json
            {
                "font": "TESTE - 2019",
                "statement": "Qual o método de estudo que você utiliza para conseguir maior eficiência de aprendizado?",
                "matter": "desenvolvimento pessoal",
                "tags": ["estudo", "aprendizado"]
            }
            ```
        > Outros campos como "*image*" e "*alternatives*" também podem ser adicionados ao objeto *Question* se necessários, os dois são do tipo *string*.
