const Table = require('./Table');

class Invites {
    constructor() {
        this.table = new Table("invites")
    }

    createInvite(inviteeId, inviterId, projectId) {
        return this.table.createEntry({inviteeId, inviterId, projectId});
    }

    getInvite(inviteeId, projectId) {
        return this.table.getEntry("*", `inviteeId='${inviteeId}' AND projectId='${projectId}'`);
    }

    removeInvite(inviteeId, projectId) {
        return this.table.removeEntrys(`inviteeId='${inviteeId}' AND projectId='${projectId}'`);
    }
}

module.exports  = new Invites;