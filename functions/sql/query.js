const pool = require('./pool');

module.exports = async function () {
    /* return new Promise((resolve, reject) => {

         pool().then((connection) => {

         })

     })*/
    const connection = await pool();
    const item = await connection.query('SELECT * FROM users', function (err, rows) {
        if (err) return Promise.reject(err);
        Promise.resolve(rows)
    });
    console.log(JSON.stringify(item));
    connection.release();
};
