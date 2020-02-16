import { Request, Response, NextFunction } from 'express';
import * as promise from 'bluebird';
import pgPromise from 'pg-promise';
const pgp = pgPromise({ promiseLib: promise });
const connectionString = 'postgres://postgres:secret@db:5432/postgres';
const db = pgp(connectionString);

function getOrders(req: Request, res: Response, next: NextFunction) {
    db.any('select * from iskor.orders')
        .then(data => {
            res.status(200)
                .json({
                    status: 'success',
                    data,
                    message: 'Retrieved all orders'
                });
        })
        .catch(err => next(err));
}

function getCustomers(req: Request, res: Response, next: NextFunction) {
    db.any('select * from iskor.customers')
        .then(data => {
            res.status(200)
                .json({
                    status: 'success',
                    data,
                    message: 'Retrieved all customers'
                });
        })
        .catch(err => next(err));
}

export {
    getOrders,
    getCustomers
}
