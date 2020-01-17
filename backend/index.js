const http = require('http');
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: '0.0.0.0',
    database: 'postgres',
    password: 'secret',
    port: 5432
});


client.connect();

client
    .query('SELECT * FROM users')
    .then(res => {
        console.log(res.rows);
        client.end();
    })
    .catch(err => console.log(err));

