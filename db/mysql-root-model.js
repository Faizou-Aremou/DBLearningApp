
const mysql = require('mysql');
class MySqlRoot {
    constructor(config) {
        this.connection = mysql.createConnection(config);
        process.on('SIGINT', () => {
            connection.end();
        })
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, res, field) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    }
    end() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

module.exports = MySqlRoot;