export const projectLogItemText = (logAction, logCreatedBy, logCollaborator, logDate, logData) => {
    let text = "";
    switch(logAction) {
        case 'INSERT_ISSUE':
            text += logCreatedBy.userName;
            text += " created an issue (#";
            text += logData.newData.issueId;
            text += ") for this project - ";
            break;
        case 'RESOLVE_ISSUE':
            text += logCreatedBy.userName;
            text += " resolved an issue (#";
            text += logData.newData.issueId;
            text += ") for this project - ";
            break;
        case 'DELETE_ISSUE':
            text += logCreatedBy.userName;
            text += " deleted an issue (#";
            text += logData.oldData.issueId;
            text += ") for this project - ";
            break;
        case 'UPDATE':
            text += logCreatedBy.userName;
            text += " updated the details of this project - ";
            break;
        case 'ADD_COLLAB':
            text += logCreatedBy.userName;
            text += " added ";
            text += logCollaborator.userName;
            text += " to this project - ";
            break;
        case 'REMOVE_COLLAB':
            text += logCreatedBy.userName;
            text += " removed ";
            text += logCollaborator.userName;
            text += " from this project - ";
            break;
        case 'INSERT':
            text += logCreatedBy.userName;
            text += " created this project - ";
            break;
        case 'DELETE':
            text += logCreatedBy.userName;
            text += " deleted this project - ";
            break;
        default:
            break;
    }
    text += logDate;
    return text;
}

const getChanges = (oldData, newData) => {
    const _oldData = JSON.parse(oldData);
    const _newData = JSON.parse(newData)
    const keys = Object.keys(_oldData);
    const changes = {};
    for(let key of keys) {
        if(_oldData[key] !== _newData[key]) {
            changes[key] = {
                oldData: _oldData[key],
                newData: _newData[key]
            };
        }
    }
    return changes;
}

export const issueLogItemText = (logAction, logCreatedBy, logDate, logDataOld, logDataNew) => {
    let text = "";
    switch(logAction) {
        case 'INSERT':
            text += logCreatedBy.userName;
            text += " created this issue - ";
            text += logDate;
            break;
        case 'UPDATE':
            text += logCreatedBy.userName;
            const changes = getChanges(logDataOld, logDataNew);
            const changedKeys = Object.keys(changes).filter(key => key !== "assigneeId" || key !== "creatorId");
            let i = 0;
            for(let key of changedKeys) {
                if(key === "assignee") text += " assigned this issue ";
                else text += " changed the " + key + " of this issue";
                text += " to '" + changes[key].newData + "'";
                text += (++i < changedKeys.length) ? " and " : "";
            }
            text += " - " + logDate;
            break;
        case 'DELETE':
            text += logCreatedBy.userName;
            text += " deleted this issue - ";
            text += logDate;
            break;
        default:
            break;
    }
    return text;
}