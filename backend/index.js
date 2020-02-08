const http = require('http');
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'secret',
    port: 5432
});

// client.connect();
// client
//     .query('SELECT * FROM users')
//     .then(rows => {
//         http.createServer((req, res) => {
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.write(JSON.stringify(rows.rows));
//             res.end();
            
//         }).listen(3000);

//         client.end();
//     })
//     .catch(err => console.log(err));

http.createServer((req, res) => {
    res.write('hellooooooo');
    res.end();
    
}).listen(3000);
