const Sequelize = require('sequelize');
const env = require('../config/config.json');

const sequelize = new Sequelize(
    env.production.database,
    env.production.username,
    env.production.password, {
        host: env.production.host,
        dialect: env.production.dialect,
        // operatorsAliases: false,
        pool: {
            max: env.production.pool.max,
            min: env.production.pool.min,
            acquire: env.production.pool.acquire,
            idle: env.production.pool.idle
        },
        dialectOptions: env.production.dialectOptions
    });

module.exports = sequelize;
