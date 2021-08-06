import React, { useState, useEffect, useRef } from 'react';
import { Row, Button, Form, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes, faInfo } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from '../../components/Title';
import { getAuthToken } from "../../pages/auth/utils";

function CreateModel() {
    const [validated, setValidated] = useState(false);
    const [FirmwareData, setFirmwareData] = useState([]);
    const MySwal = withReactContent(Swal);

    const refSelect = useRef(null);

    useEffect(() => {
        const token = getAuthToken();

        fetch(`${process.env.REACT_APP_API_SERVER}/firmware`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }).then(res => res.json())
            .then(
                (result) => {
                    console.log(result.data)
                    setFirmwareData(result.data);
                }
            )
    }, []);

    const handleSubmit = (event) => {
        console.log(event.target[0].value);
        console.log(refSelect.current.value);

        const token = getAuthToken();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log('A');

            event.preventDefault();
            event.stopPropagation();
        } else if (event.target[0].value !== "") {
            console.log('B');

            event.preventDefault();
            event.stopPropagation();

            let data = new FormData();
            data.append("Model", event.target[0].value);
            data.append("Firmware", refSelect.current.value);

            fetch(`${process.env.REACT_APP_API_SERVER}/model`, {
                method: 'POST',
                body: data, 
                headers: {
                    authorization: `Bearer ${token}`,
                },
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
                            title: 'Model 重複',
                            icon: 'warning',
                            confirmButtonText: "OK",
                        });
                    }
                }).catch(e => {
                    console.log(e);
                })
        }
        setValidated(true);
    };

    const cancel = () => {
        refSelect.current.selectedIndex = 0;
    };

    const showFrimware = () => {
        let index = refSelect.current.selectedIndex - 1;
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
            <Title name="New Model" action="Back" link="Model" />

            <div className="col-md-8 offset-md-2">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="formModel">
                        <Form.Label column sm={2}>
                            Model
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="text" placeholder="Model Name" required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid Model Name.
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formFirmware">
                        <Form.Label column sm={2}>
                            Firmware Name
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control ref={refSelect} as="select">
                                <option value="default">Please Choose...</option>
                                {FirmwareData.length > 0 && FirmwareData.map((data) => {
                                    return (
                                        <option key={data.id} value={data.id}>{data.firmware}</option>
                                    )
                                })}
                            </Form.Control>
                        </Col>
                        <Col sm={1}>
                            <Button variant="warning" onClick={showFrimware} ><FontAwesomeIcon icon={faInfo} /> Info</Button>{' '}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="text-right mt-4">
                        <Col sm={{ offset: 2 }}>
                            <Button type="submit" variant="primary"><FontAwesomeIcon icon={faSave} /> Save</Button>{' '}
                            <Button variant="danger" onClick={cancel}><FontAwesomeIcon icon={faTimes} /> Cancel</Button>{' '}
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default CreateModel;
