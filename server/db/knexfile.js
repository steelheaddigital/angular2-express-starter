module.exports = {
    development: {
        client: 'pg',
        debug: true,
        connection: {
            host     : 'db',
            user     : process.env.POSTGRES_USER,
            password : process.env.POSTGRES_PASSWORD,
            database : process.env.POSTGRES_USER,
            charset  : 'utf8'
        },
        migrations: {
            tableName: 'migrations'
        }
    },
    test: {
        client: 'pg',
        debug: true,
        connection: {
            host     : 'testdb',
            user     : 'test',
            password : 'test',
            database : 'test',
            charset  : 'utf8'
        },
        migrations: {
            tableName: 'migrations'
        }
    },
    production: {
        client: 'pg',
        debug: false,
        connection: {
            host     : 'db',
            user     : process.env.POSTGRES_USER,
            password : process.env.POSTGRES_PASSWORD,
            database : process.env.POSTGRES_USER,
            charset  : 'utf8'
        },
        migrations: {
            tableName: 'migrations'
        }
    }
};