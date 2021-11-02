const mysql = require('mysql');
require('dotenv').config();

const connectionOptions = {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_SECRET,
    database: process.env.DB_NAME,
}

const connection = (process.env.NODE_ENV === "production") 
    ? mysql.createConnection(process.env.JAWSDB_URL) 
    : mysql.createPool({
        connectionLimit:  1,
        ...connectionOptions
    });

const makeArray = val => (typeof val === "string" && val !== "*") || (typeof val === "object" && !Array.isArray(val)) && val !== null ? [val] : val;

class Database {
    constructor(connection) {
        this.connection = connection;
    }

    setLoggedUserIdVariable(id) {
        return this.runSqlQuery(`SET @loggedUserId = ${id};`);
    }

    getLoggedUserIdVariable() {
        return this.runSqlQuery(`SELECT @loggedUserId;`);
    }

    async close() {
        await this.connection.close();
    }

    runSqlQuery(sqlQuery) {
        console.log(sqlQuery);
        return new Promise((resolve, reject) => {
            connection.query(sqlQuery, (err, result) => {
                if (err) return reject(err);
                return resolve(JSON.parse(JSON.stringify(result)));
            });
        })
    }

    escapeValue(value) {
        return (Number.isInteger(Number(value))) ? value : connection.escape(value);
    }

    escapeValues(valueStringArray) {
        return valueStringArray.map(val => {
            if(Number.isInteger(Number(val))) return val;
            return connection.escape(val);
        });
    }

    query(table, columns = "*" || [], rows = "*" || [], options = "*" || [], joinOptions = null) {
        rows = makeArray(rows);
        columns = makeArray(columns);
        options = makeArray(options);
        joinOptions = makeArray(joinOptions);
        const SQLRows = rows === "*" ? "" : rows.join(" OR ");
        const SQLColumns = columns === "*" ? columns : columns.join(",");
        const SQLJoin = joinOptions === null ? "" : joinOptions.map(value => (`${(value.joinType) ? value.joinType.toUpperCase() : "INNER"} JOIN ${value.joinTable} ON ${value.joinColumns}`)).join(" ");
        const SQLOptions = (options === "*" || options === []) ? "" : options.join(" AND ");
        return this.runSqlQuery(`SELECT ${SQLColumns} FROM ${table} ${SQLJoin} ${rows === "*" ? "" : "WHERE"} ${SQLRows} ${SQLOptions};`);
    }

    async addRecord(table, record) {
        const keys = Object.keys(record);
        const values = this.escapeValues(Object.values(record));
        return this.runSqlQuery(`INSERT INTO ${table} (${keys.join(", ")}) VALUES (${values.join(", ")})`);
    }

    async removeRecords(table, rows) {
        rows = makeArray(rows);
        const SQLRows = rows.join(" OR ");
        return this.runSqlQuery(`DELETE FROM ${table} WHERE ${SQLRows}`);
    }

    async updateRecords(table, columns, rows) {
        // columns elements are strings of the form ( key='value' )
        // This block will escape rhs, removing quotes first
        columns = makeArray(columns).map(col => {
            const parts = col.split("=");
            const lhs = parts[0];
            const rhs = this.escapeValues(
                parts.map((part, idx) => {
                    if(idx === 0) return "";
                    return part.slice(1, part.length - 1);
                }
            ))
            let res = lhs + "=";
            rhs.forEach(val => res += val);
            return res;
        });
        rows = makeArray(rows);
        return this.runSqlQuery(`UPDATE ${table} SET ${columns.join(", ")} WHERE ${rows.join(" OR ")}`);
    }

}

module.exports = new Database(connection);