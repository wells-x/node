const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'node'
});

// module.exports = pool;

module.exports = async function () {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            // console.log(err, connection);
            if (err) return reject(err);
            resolve(connection);
            // connection.query()
            connection.release();
        });

    })
};
