const mysql = require('mysql2');

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    console.error('Error connecting to the database:', err.stack);
                    return reject(err);
                }
                console.log('Connected to the database as id', this.connection.threadId);
                resolve();
            });
        });
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    execute(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.execute(sql, args, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

}

module.exports = Database;