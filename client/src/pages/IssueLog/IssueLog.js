import React from 'react';
import { Container } from 'react-bootstrap';
import { useAuth, useResource } from '../../hooks';
import List from '../../components/display/List/List';
import CollabInfo from '../../utility/CollabInfo';
import { removeTimezoneFromDateString } from '../../utility/strings';
import { issueLogItemText } from '../../utility/log';

function IssueLog(props) {
    const auth = useAuth();
    const [log, ] = useResource(
        `/api/projects/${props.match.params.projectId}/issues/${props.match.params.issueId}/reports`,
        auth.user ? auth.user.token : null
    )

    const renderLogItem = (item) => {
        if(!item || !props.collaborators || props.collaborators.length === 0) return null;
        const date = removeTimezoneFromDateString(new Date(item.createdAt).toString());
        const collabInfo = new CollabInfo(props.collaborators);
        const createdBy = collabInfo.get(item.createdBy);
        const text = issueLogItemText(item.action, createdBy, date, item.oldData, item.newData)
        return <div>{text}</div>
    }

    return (
        <Container fluid>
            <List listItems={log.data} render={renderLogItem}/>
        </Container>
    )
}

export default IssueLog;