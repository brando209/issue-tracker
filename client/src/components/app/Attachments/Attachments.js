import React, { useState } from 'react';
import Upload from '../../form/inputs/Upload/Upload';
import './Attachments.css'

function Attachments(props) {
    const [uploading, setUploading] = useState(false);
    const renderAttachmentItems = () => {
        const items = [];
        props.attachments && props.attachments.forEach((attachment, idx) => {
            items.push(
                <li key={`attachment-${idx}`}>
                    <span>{attachment.filename}</span>{" "}
                    <a href={attachment.data} download={attachment.filename}>Download</a>{" "}
                    <button className="link" onClick={() => props.onDelete(attachment.id)}>Remove</button>
                </li>
            )
        });
        return items;
    }

    return (
        <>
            <ul className="attachments-list">
                {
                    renderAttachmentItems()
                }   
            </ul>
            {uploading ? 
                <Upload 
                    sendRequest={props.onCreate}
                    onComplete={props.onComplete}
                    onClose={() => { setUploading(false) }}
                /> 
                : <button 
                    className="link" 
                    onClick={() => { setUploading(true) }}
                >
                    Add Attachment
                </button>
            }
        </>
    );
}

export default Attachments;