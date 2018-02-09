let pool = require('./mysql-new');
// console.log(pool);

module.exports = {
    query: function (form, str) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT ${str || "*"} FROM ${form}`, function (err, rows, fields) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows)
                }
            });
        })
    },
};
