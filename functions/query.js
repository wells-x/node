let  pool = require('./mysql-new');
// console.log(pool);

module.exports = function (str,fn) {
    pool.query(str,fn)
};
