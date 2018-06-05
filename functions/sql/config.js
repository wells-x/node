const config = {
    insert: `INSERT INTO users SET ?`,
    query: `SELECT * FROM users WHERE account = ?`,
    queryAll: `SELECT * FROM users`,
};

module.exports = config;
// INSERT INTO node_user VALUES ('1', 'admin', '32');
