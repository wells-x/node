const config = {
    insert: ({name, age, account, password, email}) => `INSERT INTO users (id, name, age, account, password, email) VALUES (?, ${name}, ${age}, ${account}, ${password}, ${email})`,
    query: ({}) => `SELECT * FROM users`,
};

module.exports = config;
// INSERT INTO node_user VALUES ('1', 'admin', '32');
