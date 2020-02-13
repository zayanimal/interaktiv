const express = require('express');
const app = express();
const api = require('./api/routes');

app.use('/api', api);
app.listen(3000);
