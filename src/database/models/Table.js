const db = require('../Database');
const { makeUpdateArray } = require('../utils');

class Table {
    constructor(table, columns) {
        this.tableName = table;
        this.columns = columns;
    }

    async getEntry(columns, rows, joins = null, options = []) {
        const result = await db.query(this.tableName, columns, rows, options, joins)
            .then(data => ({ success: data.length > 0 ? true : false, data: data[0] }))
            .catch(err => ({ success: false, message: err.sqlMessage }));
        return result;
    }

    async getEntrys(columns, rows = "*", joins = null, options = []) {
        const result = await db.query(this.tableName, columns, rows, options, joins)
            .then(data => ({ success: true, data }))
            .catch(err => ({ success: false, message: err.sqlMessage }));
        return result;
    }

    async createEntry(newEntry, actorId = null) {
        if(actorId !== null) await db.setLoggedUserIdVariable(actorId);
        const result = await db.addRecord(this.tableName, newEntry)
            .then(data => ({ success: true, id: data.insertId }))
            .catch(err => ({ success: false, message: err.sqlMessage }));
        return result;
    }

    async updateEntrys(rows, updates, actorId = null) {
        if(actorId !== null) await db.setLoggedUserIdVariable(actorId);
        const result = await db.updateRecords(this.tableName, makeUpdateArray(updates), rows)
            .then(data => ({ success: true }))
            .catch(err => ({ success: false, message: err.sqlMessage }));
        return result;
    }

    async removeEntrys(rows, actorId = null) {
        if(actorId !== null) await db.setLoggedUserIdVariable(actorId);
        const result = await db.removeRecords(this.tableName, rows)
            .then(data => ({ success: true }))
            .catch(err => ({ success: false, message: err.sqlMessage }));
        return result;
    }
}

module.exports = Table;