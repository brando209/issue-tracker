const Table = require('./Table');

class Files { 
    constructor() {
        this.table = new Table("files");
    }

    createFile(path, filename) {
        return this.table.createEntry({ path, name: filename });
    }

    getSingleFile(fileId) {
        return this.table.getEntry("*", `id=${fileId}`);
    }

    getFiles(fileIds) {
        return this.table.getEntrys("*", `id IN (${fileIds})`)
    }

    updateFile(fileId, updateObject) {
        const result = this.table.updateEntrys( `id=${fileId}`, updateObject)
        if(result.success) {
            return this.table.getEntry("*", `id=${fileId}`);
        }
        return result;
    }

    removeFile(fileId) {
        return this.table.removeEntrys(`id=${fileId}`);
    }

}

module.exports = new Files;