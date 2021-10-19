export default class CollabInfo {
    constructor(collabArray) {
        this.collaborators = collabArray;
    }

    get(collabId) {
        if(this.collaborators.length === 0) return;
        return this.collaborators.find(collab => collab.id === collabId);
    }
}