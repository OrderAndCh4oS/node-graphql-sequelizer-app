module.exports = {
    development: {
        username: process.env.MYSQL_USER || 'admin',
        password: process.env.MYSQL_PASSWORD || 'too_secret',
        database: process.env.MYSQL_DATABASE || 'node_express_sequelize_db',
        host: process.env.MYSQL_HOST || '127.0.0.1',
        port: process.env.MYSQL_PORT || '3307',
        dialect: 'mysql',
    },
    test: {
        username: process.env.MYSQL_USER || 'admin',
        password: process.env.MYSQL_PASSWORD || 'too_secret',
        database: process.env.MYSQL_DATABASE || 'node_express_sequelize_db',
        host: process.env.MYSQL_HOST || '127.0.0.1',
        port: process.env.MYSQL_PORT || '3307',
        dialect: 'mysql',
    },
    production: {
        username: process.env.MYSQL_USER || 'admin',
        password: process.env.MYSQL_PASSWORD || 'too_secret',
        database: process.env.MYSQL_DATABASE || 'node_express_sequelize_db',
        host: process.env.MYSQL_HOST || '127.0.0.1',
        port: process.env.MYSQL_PORT || '3307',
        dialect: 'mysql',
    },
};
