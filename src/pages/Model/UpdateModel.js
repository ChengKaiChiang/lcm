import React, { useState, useEffect, useRef } from 'react';
import { Row, Button, Form, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faInfo } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useParams } from "react-router-dom";
import Title from '../../components/Title';

function UpdateModel() {
    let { id, firmware } = useParams();

    //old Firmware info
    const [ModelName, setModelName] = useState("");
    const [FirmwareData, setFirmwareData] = useState([]);

    const refSelect = useRef(null);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_SERVER}/model/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setModelName(result.data.model);
                }
            )
    }, [id]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_SERVER}/firmware`)
            .then(res => res.json())
            .then(
                (result) => {
                    setFirmwareData(result.data);
                }
            )
    }, []);

    const save = () => {
        console.log(refSelect.current.value);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let data = new URLSearchParams();
        data.append("Firmware", refSelect.current.value);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        if (firmware !== refSelect.current.value) {
            fetch(`${process.env.REACT_APP_API_SERVER}/model/${id}`, requestOptions)
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
        }
    }

    const showFrimware = () => {
        let index = refSelect.current.selectedIndex;
        if (refSelect.current.value !== 'default') {
            let text = "Firmware: " + FirmwareData[index].firmware + "<br />" +
                "File Name: " + FirmwareData[index].file + "<br />" +
                "size: " + FirmwareData[index].size + "<br />" +
                "MD5: " + FirmwareData[index].MD5 + "<br />";
            MySwal.fire({
                title: 'Frimware Information',
                icon: 'info',
                html: text,
                confirmButtonText: "OK",
            })
        }

    }

    return (
        <div>
            <Title name="Update Model" action="Back" link="Model" />

            <div className="col-md-8 offset-md-2">
                <Form>
                    <Form.Group as={Row} controlId="formModel">
                        <Form.Label column sm={2}>
                            Model
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Model Name" value={ModelName} readOnly />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formFirmware">
                        <Form.Label column sm={2}>
                            Firmware Name
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control ref={refSelect} as="select" >
                                {FirmwareData.map((data) => {
                                    if (firmware.toString() === data.id.toString()) {
                                        return (
                                            <option key={data.id} value={data.id} selected="selected">{data.firmware}</option>
                                        )
                                    } else {
                                        return (
                                            <option key={data.id} value={data.id} >{data.firmware}</option>
                                        )
                                    }
                                })}
                            </Form.Control>
                        </Col>
                        <Col sm={1}>
                            <Button variant="warning" onClick={showFrimware} ><FontAwesomeIcon icon={faInfo} /> Info</Button>{' '}
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

export default UpdateModel;
