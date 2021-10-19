import React, { useState, useRef } from 'react';
import './Dropzone.css';

function Dropzone({ name, disabled, onFilesAdded }) {
    const [highlight, setHighlight] = useState(false);
    const fileInputRef = useRef(null);

    const openFileDialog = () => {
        if(disabled) return;
        fileInputRef.current.click();
    }

    const handleFilesAdded = (e) => {
        if(disabled) return;
        const files = e.target.files;
        if(onFilesAdded) {
            const array = fileListToArray(files);
            onFilesAdded(array);
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setHighlight(true);
    }

    const handleDragLeave = () => {
        setHighlight(false);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        if(disabled) return;

        const files = e.dataTransfer.files;
        if(onFilesAdded) {
            const array = fileListToArray(files);
            onFilesAdded(array);
        }

        setHighlight(false);
    }

    const fileListToArray = (fileList) => {
        const array = [];
        for (let i = 0; i < fileList.length; i++) {
            array.push(fileList.item(i));
        }
        return array;
    }

    return (
        <div 
            className={`dropzone ${highlight ? 'highlight' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={openFileDialog}
            style={{ cursor: disabled ? 'default' : 'pointer' }}
        >
            <input 
                ref={fileInputRef}
                name={name}
                className="file-input"
                type="file"
                multiple
                onChange={handleFilesAdded}
            />
            <img 
                alt="upload"
                className="icon"
                src="/upload_file_black_24dp.svg"
            />
            <span>Upload Files</span>
        </div>
    )
}

export default Dropzone;