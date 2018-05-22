# webs-pev
====================

API rest para aplicações voltadas para auxiliar na educação escolar

+ Docker Compose
    - MongoDB       =>  localhost:27017
    - MongoExpress  =>  localhost:8081

+ Rotas
    - (post)/auth/register          =>  cadastro
        {
            "name": "string",
            "email": "string",
            "password": "string"
        }
    - (post)/auth/authenticate      =>  atenticação
        {
            "email": "string",
            "password": "string"
        }
    - (get)/questions               =>  questões

