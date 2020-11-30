db.createUser(
    {
        user: 'developer',
        pwd: 'default1',
        roles: [
            {
                role: 'readWrite',
                db: 'splinter'
            }
        ]
    }
)