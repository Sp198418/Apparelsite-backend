const { response } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'react-crud.c5tp6dzlim0i.us-east-1.rds.amazonaws.com',
    database: 'apparel',
    password: 'testpass',
    port: '5432'
});


const getAllProducts = (request, response) => {
    pool.query('SELECT * FROM products',(error, results) => {
    if (error) {
        throw error
    }
    response.status(200).json(results.rows)
});
}



module.exports = {
    getAllProducts
}
