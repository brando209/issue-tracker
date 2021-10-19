import React, { useEffect, useState } from 'react';
import { Button, ProgressBar } from 'react-bootstrap';
import Dropzone from '../Dropzone/Dropzone';

import './Upload.css';

const initialUpload = {
    files: [],
    isUploading: false,
    progress: {},
    successful: false
};

function Upload({ onChange, sendRequest, onClose, setUploadCallbacks, ...props }) {
    const [upload, setUpload] = useState(initialUpload);

    useEffect(() => {
        setUploadCallbacks && setUploadCallbacks(() => uploadCallbacks);
    }, [setUploadCallbacks])

    const handleFilesAdded = (files) => {
        setUpload(prev => {
            const updatedFiles = prev.files.concat(files);
            onChange && onChange(updatedFiles);
            return {
                ...prev,
                files: updatedFiles
            }
        });
    }

    const handleFilesRemoved = (fileIndex) => {
        setUpload(prev => {
            console.log("removing file:", fileIndex)
            const updatedFiles = prev.files.slice();
            updatedFiles.splice(fileIndex, 1);
            return {
                ...prev,
                files: updatedFiles
            };
        });
    }

    // Only when clicking the upload button in renderActions, else upload handled externally
    const uploadFiles = async () => {
        setUpload(prev => ({ ...prev, progress: {}, isUploading: true }));

        const promises = [];
        console.log(upload);
        let callbacks;
        upload.files && upload.files.forEach(file => {
            console.log("sending request from upload")
            callbacks = uploadCallbacks(file);
            const data = new FormData();
            data.append('attachments', file);
            promises.push(sendRequest(data, callbacks.progressCb));
        });

        try {
            const attachmentHandles = await Promise.all(promises)
                .then(responses => responses.map(response => response.data.id))
                .then(data => {
                    callbacks.successCb();
                    return data;
                })
                .catch(err => callbacks.failureCb(err));

            props.onComplete(attachmentHandles);
        } catch(err) {
            callbacks.failureCb(err);
        }
    }

    const renderActions = () => {
        if(!sendRequest) return null;

        if(upload.successful) {
            return (
                <Button
                    onClick={() => setUpload(initialUpload)}
                >
                    Clear
                </Button>
            )
        } else {
            return (
                <Button 
                    disabled={!upload.files || upload.files.length < 0 || upload.isUploading}
                    onClick={uploadFiles}
                >
                    Upload
                </Button>
            )
        }
    }

    const uploadCallbacks = (file) => {
        setUpload(prev => ({ ...prev, progress: {}, isUploading: true }));
        return {
            progressCb: (percentCompleted) => {
                if(percentCompleted && percentCompleted !== 100) {
                    console.log("isuploading")
                    setUpload(prev=> {
                        const copy = { ...prev.progress }
                        copy[file.name] = {
                            state: "pending",
                            percentage: percentCompleted
                        }
                        return { ...prev, progress: copy };
                    });
                } else if(percentCompleted) {
                    console.log("issuccessful")
                    setUpload(prev=> {
                        const copy = { ...prev.progress }
                        copy[file.name] = {
                            state: "done",
                            percentage: percentCompleted
                        }
                        return { ...prev, progress: copy }
                    });
                }
            },
            successCb: () => { 
                console.log("calling success");
                setUpload(prev => ({...prev, successful: true, uploading: false }))
            },
            failureCb: (err) => { 
                console.log("calling failure", err);
                setUpload(prev=> ({ ...prev, successful: false, uploading: false }))
            }
        }
    }

    const renderProgress = (file) => {
        const uploadProgress = upload.progress && upload.progress[file.name];
        if(upload.isUploading || upload.successful) {
            return (
                <div className="progress-wrapper">
                    <ProgressBar now={uploadProgress ? uploadProgress.percentage : 0} />
                    <img 
                        className="successful-icon"
                        alt="successful"
                        src="/file_download_done_black_24dp.svg"
                        style={{
                            opacity:
                                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                        }}
                    />
                </div>
            )
        }
    }

    return (
        <div className="upload">
            <div className="header">
                <span className="title">Upload Files</span>
                { onClose &&
                    <button 
                        className="close-upload link"
                        onClick={() => onClose()}
                    >
                        X
                    </button>
                }
            </div>
            <div className="content">
                <div>
                    <Dropzone 
                        name={props.name}
                        onFilesAdded={handleFilesAdded}
                        disabled={upload.isUploading || upload.successful}
                    />
                </div>
                <div className="files">
                    {
                        upload.files && upload.files.map((file, idx) => (
                            <div className="file-progress" key={`file.name-${idx}`}>
                                <span className="filename">{file.name}</span>
                                {renderProgress(file)}{" "}
                                <button 
                                    className="remove-attachment link"
                                    onClick={() => handleFilesRemoved(idx)}
                                    style={{ 
                                        display: upload.isUploading || upload.successful ? "none" : "inline"
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="actions">{renderActions()}</div>
        </div>
    );
}

export default Upload;