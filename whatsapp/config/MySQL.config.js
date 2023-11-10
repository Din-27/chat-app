import { createPool } from "mysql";

// const process = require("../../../connections/componentAddress");

var db_config = {
    connectionLimit: 50,
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,
};

function handleDisconnect() {
    connection = createPool(db_config);
    connection.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            throw err;
        }

        connection.release();
    });

    return connection;
}

export function queryDB(query, queryvalue) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            handleDisconnect.query(query, queryvalue, async function (error, rows, fields) {
                await handleDisconnect.query(`FLUSH HOSTS;`);
                if (error) {
                    err = "Error mysql -> " + error + " <- " + this.sql;
                    reject(err);
                } else {
                    resolve({
                        rows,
                        fields,
                    });
                }
            });
        }, 0);
    });
}

handleDisconnect();
