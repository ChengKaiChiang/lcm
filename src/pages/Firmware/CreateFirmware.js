import React, { useState } from 'react';
import { Row, Button, Form, Col } from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';
import md5 from "md5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from '../../components/Title';


function CreateFirmware() {
    const [validated, setValidated] = useState(false);
    const [FileName, setfilename] = useState('');
    const [FileSize, setfilesize] = useState('');
    const [Firmware_MD5, setMD5] = useState('');
    const [File, setFile] = useState(new Uint8Array());
    const MySwal = withReactContent(Swal);

    const handleFiles = files => {
        setfilename(files[0].name);
        setfilesize(files[0].size);

        var reader = new FileReader();
        reader.onload = () => {
            let u8_continuous = new Uint8Array(reader.result);
            console.log(u8_continuous)
            setFile(u8_continuous);
            setMD5(md5(u8_continuous));
        }
        reader.readAsArrayBuffer(files[0]);
    }

    const handleSubmit = (event) => {
        console.log(event);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log('A');

            event.preventDefault();
            event.stopPropagation();
        } else if (FileName !== '' && event.target[0].value !== "") {
            console.log('B');

            event.preventDefault();
            event.stopPropagation();

            let data = new FormData();
            data.append("Name", event.target[0].value);
            data.append("File", FileName);
            data.append("Size", FileSize);
            data.append("Version", '1');
            data.append("MD5", Firmware_MD5);
            data.append("data", File);

            fetch(`${process.env.REACT_APP_API_SERVER}/firmware`, {
                method: 'POST',
                body: data
            }).then(res => res.json())
                .then((res) => {
                    console.log(res);
                    if (res.status === 'OK') {
                        MySwal.fire({
                            title: '儲存成功',
                            icon: 'success',
                            confirmButtonText: "OK",
                        }).then(() => {
                            window.history.back();
                        })
                    } else if (res.DataBase_ErrorCode === 1062) {
                        MySwal.fire({
                            title: 'Firmware 重複',
                            icon: 'warning',
                            confirmButtonText: "OK",
                        });
                    }
                }).catch(e => {
                    console.log(e);
                })
        } else {
            console.log('C');

            event.preventDefault();
            event.stopPropagation();
            MySwal.fire({
                title: '請上傳檔案',
                icon: 'warning',
                confirmButtonText: "OK",
            })
        }
        setValidated(true);
    };

    const cancel = () => {
        setfilename('');
        setfilesize('');
        setMD5('');
    }

    return (
        <div>
            <Title name="New Firmware" action="Back" link="Firmware" />

            <div className="col-md-2 offset-md-2 mb-4">
                <ReactFileReader fileTypes={["*"]} handleFiles={handleFiles}>
                    <Button variant="success"><FontAwesomeIcon icon={faUpload} /> Upload File</Button>
                </ReactFileReader>
            </div>

            <div className="col-md-8 offset-md-2">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="formFirmware">
                        <Form.Label column sm={2}>
                            Firmware
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Firmware Name" required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Firmware Name.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formFile">
                        <Form.Label column sm={2}>
                            File Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="File Name" value={FileName} readOnly />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formSize">
                        <Form.Label column sm={2}>
                            File Size
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="File Size" value={FileSize} readOnly />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formMD5">
                        <Form.Label column sm={2}>
                            MD5
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="MD5" value={Firmware_MD5} readOnly />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="text-right">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button type="submit" variant="primary"><FontAwesomeIcon icon={faSave} /> Save</Button>{' '}
                            <Button variant="danger" onClick={cancel}><FontAwesomeIcon icon={faTimes} /> Cancel</Button>{' '}
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default CreateFirmware;
