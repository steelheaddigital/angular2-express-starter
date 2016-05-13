module.exports = {
    development: {
        client: 'pg',
        debug: true,
        connection: {
            host     : 'development.neighbormarket.local',
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