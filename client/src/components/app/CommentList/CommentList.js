import React, { useState } from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import List from '../../display/List/List';
import withEdit from '../../hocs/withEdit/withEdit';
import { removeTimezoneFromDateString } from '../../../utility/strings';
import editIcon from '../../../images/edit-icon-png-small.png';


const commentBoxStyle = {
    width: "50vw",
    height: "100%",
    margin: "1em",
};

const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <img 
        alt=""
        src={editIcon}
        width="25"
        height="25"

        ref={ref}
        onClick={onClick}
    />
));

function CommentList(props) {
    const [editId, setEditId] = useState(null);

    const EditArea = withEdit(Col, 'textarea');

    const handleDropdownSelect = (e, id) => {
        if(e === "delete") return props.onDelete({ commentId: id });
        if(e === "edit") return showEditArea(id);
    }

    const showEditArea = (commentId) => {
        setEditId(commentId);
    } 

    const handleEditComment = (comment) => {
        props.onEdit(editId, comment);
        setEditId(null);
    }

    return (
        <List listItems={props.comments} render={(item) => (
            <Row style={commentBoxStyle} key={item.id}>
                <Col lg={11} md={11} sm={10} xs={9}>
                {
                    "Posted By: " + 
                    item.creator + 
                    " on " + 
                    removeTimezoneFromDateString(new Date(item.created_at).toString()) 
                }
                </Col>
                <Col lg={1} md={1} sm={2} xs={3}>
                    <Dropdown onSelect={evt => handleDropdownSelect(evt, item.id)}>
                        <Dropdown.Toggle as={CustomToggle} />

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="edit">Edit</Dropdown.Item>
                            <Dropdown.Item eventKey="delete">Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <EditArea 
                    lg={11} md={11} sm={11} xs={11}
                    name="body"
                    value={item.body}
                    isEditing={editId === item.id}
                    onEdit={handleEditComment}
                    onBlur={() => setEditId(null)}
                >
                    {item.body}
                </EditArea>
            </Row>
        )}/>
    )
}

export default CommentList;