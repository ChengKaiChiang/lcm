import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Button } from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';
import md5 from "md5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faSave, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function CreateFirmware() {
    const [FileName, setfilename] = useState('');
    const [FileSize, setfilesize] = useState('');
    const [Firmware_MD5, setMD5] = useState('');
    const MySwal = withReactContent(Swal);

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

    const save = () => {
        let data = new FormData();
        data.append("Name", FileName);
        data.append("Size", FileSize);
        data.append("Version", '1');
        data.append("MD5", Firmware_MD5);

        if (FileName != '') {
            fetch('http://localhost/lcm/laravel_api/public/index.php/firmware', {
                method: 'POST',
                body: data
            }).then(res => res.json())
                .then((res) => {
                    if (res.status === 'OK') {
                        MySwal.fire({
                            title: '儲存成功',
                            icon: 'success',
                            confirmButtonText: "OK",
                        }).then(() => {
                            window.history.back();
                        })
                    }
                }).catch(e => {
                    console.log(e);
                })
        }else {
            MySwal.fire({
                title: '儲存失敗',
                icon: 'error',
                text: 'Something went wrong!'
            })
        }
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
                            <Button variant="info"><FontAwesomeIcon icon={faAngleDoubleLeft} /> Back</Button>{' '}
                        </Link>
                    </div>
                </Row>
            </div>
            <div className="col-md-8 offset-2 mb-2">
                <div className="mb-2">
                    <ReactFileReader fileTypes={["*"]} handleFiles={handleFiles}>
                        <Button variant="success"><FontAwesomeIcon icon={faUpload} /> Upload File</Button>
                    </ReactFileReader>
                </div>

                <p>File Name：{FileName}</p>
                <p>File Size：{FileSize}</p>
                <p>MD5：{Firmware_MD5}</p>
            </div>

            <div className="col-md-8 offset-2 mb-2 text-right">
                <Button variant="primary" onClick={save}><FontAwesomeIcon icon={faSave} /> Save</Button>{' '}
                <Button variant="danger" onClick={cancel}><FontAwesomeIcon icon={faTimes} /> Cancel</Button>{' '}
            </div>
        </div>
    );
}

export default CreateFirmware;
