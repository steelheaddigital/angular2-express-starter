module.exports = {
    development: {
        client: 'pg',
        debug: true,
        connection: {
            host     : 'db',
            user     : 'neighbormarket_dev',
            password : 'neighbormarket',
            database : 'neighbormarket_dev',
            charset  : 'utf8'
        },
        migrations: {
            tableName: 'migrations'
        }
    }
};