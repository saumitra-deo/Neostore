const db_config =  require('./db-config');
const mongoClient = require('mongodb');

const connection = {};

connection.connect = function () {
    return mongoClient.connect(db_config.connection_url)
};

module.exports = connection;