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
    - (post)/auth/register          =>  cadastro</br>
        *Aluno*
        ```json
        {
            "name": "string",
            "email": "string",
            "password": "string"
        }
        ```
        *Professor*
        ```json
        {
            "name": "string",
            "email": "string",
            "password": "string",
            "professor": true
        }
        ```
    - (post)/auth/authenticate      =>  atenticação
        ```json
        {
            "email": "string",
            "password": "string"
        }
        ```
    *QUESTÕES*
    - (get)/questions => busca por todas as questões

    - (post)/questaoAuthController  => inserir novas questões
        ```json
        {
            "codigo": "string",
            "descricao": "string",
            "descritor": "string",
            "alternativa": ["string", "string"]
        }
        ```
        *Caso  o token utilizado não seja de um professor ele retornará a mensagem err: 'Usuário não é professor'*
    - (get)/descritor/:descritor => busca por descritor
    - (get)/question/questao/:questaoID => bucar por questão
    - (delete)/questaoAuth/:questaoId => deleta questão
    - (put)/questaoAuth/:questaoId => atualiza questão
        ```json
        {
            "codigo": "string",
            "descricao": "string",
            "descritor": "string",
            "alternativa": ["string", "string"]
        }
        ```
    *SOLUÇÕES*
    - (get)/solucao/:solucaoId => busca uma solução gerando visualização
    - (post)/solucaoAuth/:questaoId => cria uma nova solução
    ```json
        {
            "descricao": "string",
            "alternativa": "string"
        }
    ```
    - (put)/solucaoAuth/:solucaoId => edita uma solução
    ```json
        {
            "descricao": "string",
            "alternativa": "string"
        }
    ```
    - (delete)/solucaoAuth/:solucaoId => deleta solução
    *AVALIAÇÃO*
    - (post)/solucaoAuth/avaliacao/:solucaoId
    ```json
        {
            "like": true
        }
    ```
    Carrega TRUE para like, e FALSE para dislike

    *COMENTÁRIO*
    - (post)/comentarioAuth/:questaoId
    ```json
        {
            "descricao": "string"
        }
    ```
    - (put)/comentarioAuth/:comentarioId
    ```json
        {
            "descricao": "string"
        }
    ```