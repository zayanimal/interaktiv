import express, { Application } from 'express';
import api from './api/routes';
const app: Application = express();

app.use('/api', api);
app.listen(3000);
