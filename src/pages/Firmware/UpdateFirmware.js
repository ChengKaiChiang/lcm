import React, { useState, useEffect } from 'react';
import { Row, Button, Form, Col } from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';
import md5 from "md5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUpload } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useParams } from "react-router-dom";
import InputSpinner from 'react-bootstrap-input-spinner';
import Title from '../../components/Title';

function UpdateFirmware() {
    let { id, version } = useParams();
    const [FontColor, setFont] = useState('');

    //old Firmware info
    const [Firmware, setFirmware] = useState('');
    const [OldData, setOldData] = useState([]);

    //new Firmware info
    const [FileName, setFileName] = useState('');
    const [FirmwareSize, setSize] = useState('');
    const [FirmwareMD5, setMD5] = useState('');
    const [Firmware_Version, setversion] = useState(version);
    
    const [File, setFile] = useState(new Uint8Array());

    const MySwal = withReactContent(Swal);

    const handleFiles = files => {
        setFont("text-danger");
        setFileName(files[0].name);
        setSize(files[0].size);
        var reader = new FileReader();
        reader.onload = () => {
            let u8_continuous = new Uint8Array(reader.result);
            setFile(u8_continuous);
            setMD5(md5(u8_continuous));
        }
        reader.readAsArrayBuffer(files[0]);

    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_SERVER}/firmware/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.data);
                    setFirmware(result.data.firmware);
                    setSize(result.data.size);
                    setMD5(result.data.MD5);
                    setOldData(result.data);
                }
            )
    }, [id]);

    const save = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let data = new URLSearchParams();
        data.append("File", FileName);
        data.append("Size", FirmwareSize);
        data.append("Version", Firmware_Version);
        data.append("MD5", FirmwareMD5);
        data.append("data", File);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        if (FileName === "" || FileName === null) {
            MySwal.fire({
                title: '請上傳檔案',
                icon: 'warning',
            })
        }
        else if (OldData.version !== Firmware_Version && OldData.version < Firmware_Version) {
            fetch(`${process.env.REACT_APP_API_SERVER}/firmware/${id}`, requestOptions)
                .then(res => res.json())
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
        } else {
            MySwal.fire({
                title: '儲存失敗',
                icon: 'warning',
                text: '版本號需要更新!'
            })
        }
    }

    const setVer = (num) => {
        setversion(num);
    }

    return (
        <div>
            <Title name="Update Firmware" action="Back" link="Firmware" />

            <div className="col-md-2 offset-md-2 mb-4">
                <ReactFileReader fileTypes={["*"]} handleFiles={handleFiles}>
                    <Button variant="success"><FontAwesomeIcon icon={faUpload} /> Upload File</Button>
                </ReactFileReader>
            </div>

            <div className="col-md-8 offset-md-2">
                <Form>
                    <Form.Group as={Row} controlId="formFirmware">
                        <Form.Label column sm={2}>
                            Firmware
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Firmware Name" value={Firmware} readOnly />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formFile">
                        <Form.Label column sm={2}>
                            File Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control className={FontColor} type="text" placeholder="File Name" value={FileName} readOnly />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formSize">
                        <Form.Label column sm={2}>
                            File Size
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control className={FontColor} type="text" placeholder="File Size" value={FirmwareSize} readOnly />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formMD5">
                        <Form.Label column sm={2}>
                            MD5
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control className={FontColor} type="text" placeholder="MD5" value={FirmwareMD5} readOnly />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formVersion">
                        <Form.Label column sm={2}>
                            Version
                        </Form.Label>
                        <Col sm={2}>
                            <InputSpinner
                                type={'real'}
                                editable={false}
                                max={10000}
                                min={version}
                                step={1}
                                value={version}
                                onChange={num => setVer(num)}
                                variant={'primary'}
                                size="sm"
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="text-right">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Button variant="primary" onClick={save}><FontAwesomeIcon icon={faSave} /> Save</Button>{' '}
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default UpdateFirmware;
