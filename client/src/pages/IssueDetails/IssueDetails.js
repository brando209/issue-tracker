import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import CommentList from '../../components/app/CommentList/CommentList';
import useResource from '../../hooks/useResource';
import useAuth from '../../hooks/useAuth';
import useDialogBox from '../../hooks/useDialogBox';
import withEdit from '../../components/hocs/withEdit/withEdit';
import issuesApi from '../../api/issues';
import IssueDetailNavBar from '../../components/app/Navigation/IssueDetailNavBar';
import Attachments from '../../components/app/Attachments/Attachments';
import LinkButton from '../../components/display/Button/LinkButton';
import { removeTimezoneFromDateString } from '../../utility/strings';
import './IssueDetails.css';
import EditIssueDetailsForm from '../../components/form/EditIssueDetailsForm';
import useNotificationBanner from '../../hooks/useNotificationBanner';

function IssueDetails({ issue, onEdit, ...props }) {
    const auth = useAuth();
    const [attachments, setAttachments, getAttachments] = useResource(
        `/api/projects/${props.match.params.projectId}/issues/${props.match.params.issueId}/attachments`,
        auth.user ? auth.user.token : null,
        issue.attachmentHandles
    )
    const [comments, setComments] = useResource(
        `/api/projects/${props.match.params.projectId}/issues/${props.match.params.issueId}/comments`,
        auth.user ? auth.user.token : null
    );
    const [editMode, setEditMode] = useState(false);
    const notificationBanner = useNotificationBanner();
    const { show: showDeleteCommentDialogBox, RenderDialogBox: DeleteCommentDialogBox } = useDialogBox();

    const EditSelect = withEdit(Col, "select");

    const handleEditIssue = async (values) => {
        //Remove the fields that have not been changed
        for(let key in values) 
            if(values[key] === issue[key]) delete values[key];

        await onEdit(props.match.params.projectId, issue.id, values);

        setEditMode(false);
    }

    const handleAddComment = async (e) => {
        e.preventDefault();
        const commentData = e.target[1].value
        try {
            const newComment = await issuesApi.addComment(props.match.params.projectId, issue.id, commentData, auth.user.token);
            setComments(prev => {
                const comments = prev.data.slice();
                comments.push(newComment);
                return { ...prev, data: comments }
            });
            const commentBox = document.querySelector("textarea#comment");
            commentBox.value = "";
            notificationBanner.showNotificationWithText("Comment successfully added");
        } catch(err) {
            notificationBanner.showNotificationWithText(err.message);
        }
    }

    const handleDeleteComment = async ({ data }) => {
        try {
            await issuesApi.deleteComment(props.match.params.projectId, issue.id, data.commentId, auth.user.token)
            setComments(prev => {
                    const comments = prev.data.slice();
                    const commentIdx = comments.findIndex(comment => comment.id === data.commentId);
                    if(commentIdx !== -1) comments.splice(commentIdx, 1);
                    return { ...prev, data: comments };
                });
                notificationBanner.showNotificationWithText("Comment successfully deleted");
        } catch(err) {
            notificationBanner.showNotificationWithText(err.message);
        }
    }

    const handleEditComment = async (commentId, commentData) => {
        try {
            const comment = await issuesApi.updateComment(
                props.match.params.projectId, 
                issue.id, 
                commentId, 
                commentData.body, 
                auth.user.token
            );
            setComments(prev => {
                const comments = prev.data.slice();
                const commentIdx = comments.findIndex(comment => comment.id === commentId);
                comments[commentIdx] = comment;
                return { ...prev, data: comments };
            });
            notificationBanner.showNotificationWithText("Comment successfully edited");
        } catch(err) {
            notificationBanner.showNotificationWithText(err.message);
        }
    }

    const advanceButtonText = (issue.status === "unassigned") ? "Assign Issue" :
        (issue.status === "open") ? "Advance Issue" :
        (issue.status === "inprogress") ? "Close Issue" : 
        issue.status;

    const handleAdvanceIssue = () => {
        if(issue.status === "unassigned") return props.onAssign({ projectId: props.match.params.projectId, issueId: issue.id });
        if(issue.status === "open") return props.onStart({ projectId: props.match.params.projectId, issueId: issue.id });
        return props.onClose({ projectId: props.match.params.projectId, issueId: issue.id });
    }

    return (
        <>
            <IssueDetailNavBar title={issue.title} render={() => {
                return (
                    <> 
                        <Button
                            className="stick-left"
                            onClick={() => { props.history.goBack() }
                        }>Back to All Issues</Button>
                        {editMode &&
                            <>
                                <Button
                                    variant="outline-dark" 
                                    className="mx-1" 
                                    form="edit-issue-form"
                                    type="submit"
                                >
                                    Save
                                </Button>
                            
                                <Button
                                    variant="outline-dark" 
                                    className="mx-1" 
                                    onClick={() => setEditMode(false)}
                                >
                                    Cancel
                                </Button>
                            </>
                        }
                        {!editMode &&
                            <Button 
                                variant="outline-dark" 
                                className="mx-1" 
                                onClick={() => { setEditMode(true) }}
                            >
                                Edit
                            </Button>
                        }
                    </>
                )
            }}/>
            <Container className="IssueDetails" fluid>
                <DeleteCommentDialogBox 
                    heading="Delete Project"
                    closeButtonText="Cancel"
                    submitButtonText="Delete"
                    onSubmit={handleDeleteComment}
                    render={({ data }) => 'Are you sure you would like to delete this comment: ' + data.commentId + '?'}
                />
                {editMode ?
                    <EditIssueDetailsForm 
                        initialTitle={issue.title} 
                        initialDescription={issue.description}
                        initialCategory={issue.category}
                        initialPriority={issue.priority}
                        onSubmit={handleEditIssue}
                    /> 
                    : 
                    <>
                        <Row className="justify-content-center title">
                            <h3>{issue.title}</h3>
                        </Row>

                        <Row>
                            <Col lg={4} md={4} sm={4} xs={4}>Description</Col>
                            <Col 
                                as="p" lg={6} md={6} sm={6} xs={6}
                                name="description" 
                            >
                                {issue.description}
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={4} md={4} sm={4} xs={4}>Category</Col>
                            <EditSelect 
                                as="p" lg={6} md={6} sm={6} xs={6}
                                value={issue.category} 
                                name="category" 
                                onEdit={handleEditIssue} 
                                options={["bug", "feature", "task", "other"]}
                            >
                                {issue.category}
                            </EditSelect>
                        </Row>

                        <Row>
                            <Col lg={4} md={4} sm={4} xs={4}>Priority</Col>
                            <EditSelect 
                                as="p" lg={6} md={6} sm={6} xs={6}
                                value={issue.priority} 
                                name="priority" 
                                onEdit={handleEditIssue} 
                                options={["critical", "high", "regular", "low", "trivial"]}
                            >
                                {issue.priority}
                            </EditSelect>
                        </Row>
                    </>
                }

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Status</Col>
                    <Col as="p" lg={6} md={6} sm={6} xs={6}>
                        {issue.status}
                        {
                            <Button 
                                className="mx-1" size="sm" 
                                hidden={issue.status === "resolved" || issue.status === "closed"}
                                onClick={handleAdvanceIssue}
                            >
                                {advanceButtonText}
                            </Button>
                        } 
                    </Col>
                </Row>

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Created on</Col>
                    <Col as="p" lg={6} md={6} sm={6} xs={6}>{removeTimezoneFromDateString(new Date(issue.created_at).toString())}</Col>
                </Row>

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Created by</Col>
                    <Col as="p" lg={6} md={6} sm={6} xs={6}>{issue.creator}</Col>
                </Row>

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Assigned to</Col>
                    <Col as="p" lg={6} md={6} sm={6} xs={6}>{issue.assignee ? issue.assignee : "Unassigned"}</Col>
                </Row>

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Assigned on</Col>
                    <Col as="p" lg={6} md={6} sm={6} xs={6}>{(issue.opened_at) ? removeTimezoneFromDateString(new Date(issue.opened_at).toString()) : "N/A"}</Col>
                </Row>

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Resolved/Closed on</Col>
                    <Col as="p" lg={6} md={6} sm={6} xs={6}>{(issue.closed_at) ? removeTimezoneFromDateString(new Date(issue.closed_at).toString()) : "N/A"}</Col>
                </Row>

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Attachments</Col>
                    <Col lg={6} md={6} sm={6} xs={6} id="attachments-content">
                        <Attachments 
                            attachments={attachments.data}
                            onCreate={(file, progressCb) => (
                                props.onCreateAttachmentRequest(
                                    props.match.params.projectId,
                                    issue.id,
                                    file,
                                    progressCb
                                )
                            )}
                            onComplete={(attachmentHandles) => {
                                console.log(attachmentHandles);
                                props.onAddAttachment(
                                    props.match.params.projectId,
                                    issue.id, 
                                    attachmentHandles
                                )
                                getAttachments();
                            }}
                        />
                    </Col>
                </Row>

                <LinkButton to={`${issue.id}/log`} className="my-3">View Issue Log</LinkButton>

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>
                        <Button variant="outline-primary" type="submit" form="add-comment">Add Comment</Button>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={4}>
                        <Form id="add-comment" onSubmit={handleAddComment}>
                            <Form.Group controlId="comment">
                                <Form.Control as="textarea" placeholder="Enter comment" />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
                
                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Comments</Col>
                    <CommentList 
                        comments={comments.data} 
                        onEdit={handleEditComment} 
                        onDelete={showDeleteCommentDialogBox}
                    />
                </Row>

            </Container>
        </>
    );
}

export default IssueDetails;