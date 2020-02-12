const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'secret',
    port: 5432
});



module.exports = {
    async DB(text, values) {
        client.connect();
        client.query(text, values);
        
    }
}