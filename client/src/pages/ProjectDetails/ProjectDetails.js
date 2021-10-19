import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useResource from '../../hooks/useResource';
import useAuth from '../../hooks/useAuth';
import projectsApi from '../../api/projects';
import withEdit from '../../components/hocs/withEdit/withEdit';
import List from '../../components/display/List/List';
import CollabInfo from '../../utility/CollabInfo';
import { removeTimezoneFromDateString } from '../../utility/strings';
import { projectLogItemText } from '../../utility/log';

function ProjectDetails({project, ...props}) {
    const auth = useAuth();
    const [collaborators, ] = useResource(
        `/api/projects/${props.match.params.projectId}/collaborators`,
        auth.user ? auth.user.token : null
    );
    const [log, ] = useResource(
        `/api/projects/${props.match.params.projectId}/reports`,
        auth.user ? auth.user.token : null
    )

    const EditBox = withEdit(Col, "text");
    const EditArea = withEdit(Col, "textarea");

    const handleEdit = async (value) => {
        const result = await projectsApi.updateProject(props.match.params.projectId, auth.user.token, value);
        console.log(result);
    }

    const renderLogItem = (item) => {
        if(!item || !props.collaborators || props.collaborators.length === 0) return null;
        const date = removeTimezoneFromDateString(new Date(item.createdAt).toString());
        const collabInfo = new CollabInfo(collaborators.data);
        const createdBy = collabInfo.get(item.createdBy);
        const { collaboratorId } = JSON.parse(item.newData || item.oldData);
        const oldData = JSON.parse(item.oldData);
        const newData = JSON.parse(item.newData);
        const collaborator = collabInfo.get(collaboratorId);
        const text = projectLogItemText(item.action, createdBy, collaborator, date, { oldData, newData });
        return <div>{text}</div>
    }

    return (
        <Container fluid>
                <Row className="justify-content-center">
                    <EditBox as="h3" value={project.name} name="name" onEdit={handleEdit}>
                        {project.name}
                    </EditBox>
                </Row>
                
                <Row className="justify-content-center">
                    <EditArea as="p" value={project.description} name="description" onEdit={handleEdit}>
                        {project.description}
                    </EditArea>
                </Row>

                <Row>
                    <Col as="h5">Collaborators:</Col>
                </Row>
                
                {
                    collaborators && collaborators.data.map((collab, key) => {
                        return (
                            <Row key={key}>
                                <Col style={{ textAlign: "right" }}>{`${collab.firstName} ${collab.lastName}`}</Col>
                                <Col style={{ textAlign: "left" }}>{collab.userName}</Col>
                            </Row>
                        )
                    })
                }

                <Row>
                    <Col as="h5">Issues:</Col>
                </Row>
                <Row style={{ justifyContent: "center" }}>{`There are ${project.issues && project.issues.length} issues related to this project`}</Row>

                <Row style={{ justifyContent: "center" }}>
                    <Col as="h5">Project Log:</Col>
                </Row>
                <Row style={{ justifyContent: "center" }}>
                    <List listItems={log.data} render={renderLogItem}/>
                </Row>
                <Row>{}</Row>
        </Container>
    );
}

export default ProjectDetails;