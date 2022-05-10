require('dotenv').config()

const {Client} = require('pg');

const client = new Client(process.env.DB_URI);

module.exports = client

