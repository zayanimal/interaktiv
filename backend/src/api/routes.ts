import express from 'express';
import * as db from './queries';

const router: express.IRouter = express.Router();

router.get('/orders', db.getOrders);
router.get('/customers', db.getCustomers);

export default router;
