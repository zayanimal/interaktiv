const promise = require('bluebird');
const options = { promiseLib: promise };
const pgp = require('pg-promise')(options);
const connectionString = 'postgres://postgres:secret@db:5432/postgres';
const db = pgp(connectionString);

function getOrders(req, res, next) {
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

function getCustomers(req, res, next) {
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

module.exports = {
    getOrders,
    getCustomers
};
