
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'react-crud.c5tp6dzlim0i.us-east-1.rds.amazonaws.com',
    database: 'apparel',
    password: 'testpass',
    port: '5432'
});


const getAllProducts = (request, response) => {
    pool.query('SELECT * FROM products', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    });
}

const addProduct = (request, response) => {
    const { name, type, category, price, count, imgurl, size } = request.body;

    pool.query(`INSERT INTO products (name, type, category, price, count, imgurl, size) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [name, type, category, price, count, imgurl, size], (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows)

        });

}



module.exports = {
    getAllProducts,
    addProduct
};
