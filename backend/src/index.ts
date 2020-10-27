import express from 'express';
// import api from './api/routes';
const app = express();

app.use('/', (req, res) => {
    res.send('Hello world!');
});

// app.use('/api', api);
app.listen(3000);
