import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Button } from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';
import md5 from "md5";

function CreateFirmware() {
    const [FileName, setfilename] = useState('');
    const [FileSize, setfilesize] = useState('');
    const [Firmware_MD5, setMD5] = useState('');

    const handleFiles = files => {
        setfilename(files[0].name);
        setfilesize(files[0].size);
        var reader = new FileReader();
        reader.onload = (e) => {
            // Use reader.result
            setMD5(md5(reader.result));
        }
        reader.readAsText(files[0]);

    }

    const test = () => {
        console.log(Firmware_MD5);
    }

    const cancel = () => {
        setfilename('');
        setfilesize('');
        setMD5('');
    }

    return (
        <div>
            <div className="col-md-8 offset-2 mb-2">
                <Row>
                    <div className="col-md-6">
                        <h2>New Firmware</h2>
                    </div>
                    <div className="col-md-6 text-right">
                        <Link to="/Firmware">
                            <Button variant="warning">Back</Button>{' '}
                        </Link>
                    </div>
                </Row>
            </div>
            <div className="col-md-8 offset-2 mb-2">
                <div className="mb-2">
                    <ReactFileReader fileTypes={["*"]} handleFiles={handleFiles}>
                        <Button variant="success"><i class="fas fa-check"></i>Upload File</Button>
                    </ReactFileReader>
                </div>

                <p>File Name：{FileName}</p>
                <p>File Size：{FileSize}</p>
                <p>MD5：{Firmware_MD5}</p>
            </div>

            <div className="col-md-8 offset-2 mb-2 text-right">
                <Button variant="danger" onClick={test}>Create</Button>{' '}
                <Button variant="primary" onClick={cancel}>Cancel</Button>{' '}
            </div>
        </div>
    );
}

export default CreateFirmware;
