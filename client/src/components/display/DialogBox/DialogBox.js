import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DialogBox({
    show,
    heading,
    closeButtonText,
    submitButtonText,
    onSubmit,
    onClose,
    render,
    renderData,
    formId = null,
}) {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{heading ? heading : ""}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{render({ data: renderData })}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    {closeButtonText ? closeButtonText : "Close"}
                </Button>
                <Button variant="primary" type="submit" form={formId} onClick={onSubmit}>
                    {submitButtonText ? submitButtonText : "Submit"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}


export default DialogBox;