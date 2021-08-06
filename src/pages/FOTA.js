import { Table, Row, Button, Form, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './css/FOTA.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getAuthToken } from "../pages/auth/utils";

function FirmwareUpdate() {
    const [count, setCount] = useState([]);
    const [Device, setDevice] = useState([]);
    const [model_data, setmodeldata] = useState([]);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        const token = getAuthToken();

        fetch(`${process.env.REACT_APP_API_SERVER}/model`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }).then(res => res.json())
            .then(
                (result) => {
                    setmodeldata(result.data);
                }
            )
    }, []);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_SERVER}/device`)
            .then(res => res.json())
            .then(
                (result) => {
                    setDevice(result.data);
                }
            )
    }, []);

    //改值的時候
    const onChangeorder = (e) => {
        const items = [...count];
        if (e.target.checked === true) {
            let device = e.target.id.split('_')[0];
            let position = e.target.id.split('_')[1];
            let arr_data = { 'device': device, 'position': position }
            items.push(arr_data);
        }
        else {
            items.forEach(function (item, index, arr) {
                let device = e.target.id.split('_')[0];
                let position = e.target.id.split('_')[1];
                if (item.device === device && item.position === position) {
                    arr.splice(index, 1);
                }
            });
        }
        setCount(items);
    }

    const data_process = (data) => {
        var lists = [];
        for (let x of data) {
            lists.push(
                <td>
                    <Row>
                        <Col>
                            <span className="h3">Device.{x.device} </span>
                            <input type="checkbox" className="checkbox" id={x.device + '_' + x.position} onChange={(e) => onChangeorder(e)} />
                        </Col>
                    </Row>
                </td>
            )
        }
        return (lists)
    }

    const show_all_LCM = (data) => {
        let dataProcess = data_process(data);
        let show_lists = [];
        let length = Math.ceil(dataProcess.length / 5);
        for (let t = 0; t < length; t++) {
            show_lists.push(
                <tr key={t}>
                    {dataProcess[(t * 5)]}
                    {dataProcess[(t * 5) + 1]}
                    {dataProcess[(t * 5) + 2]}
                    {dataProcess[(t * 5) + 3]}
                    {dataProcess[(t * 5) + 4]}
                </tr>
            )
        }

        return (show_lists)
    }

    function Firmware_update() {
        const items = count;
        console.log(items);
        let index = document.getElementById('model_select').selectedOptions[0].id;


        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "id": items, "file": model_data[index].firmware.file, "MD5": model_data[index].firmware.MD5 });

        if (items.length !== 0) {
            fetch(`${process.env.REACT_APP_API_SERVER}/FOTA`, {
                method: 'POST',
                headers: myHeaders,
                body: raw
            }).then((res) => {
                MySwal.fire({
                    title: '開始更新',
                    icon: 'success',
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.href = '/Device';
                })
            }).catch(e => {
                console.log(e);
            })
        }
    }

    return (
        <div>
            <Row>
                <Button variant="primary" className="offset-2 mb-3" onClick={Firmware_update}>Firmware Update</Button>{' '}
                <Form.Control as="select" className="col-md-1 col-sm-1 ml-3" id="model_select">
                    {
                        model_data.map((data, index) => {
                            return (
                                <option key={data.id} id={index}>{data.model}</option>
                            )
                        })
                    }
                </Form.Control>
            </Row>

            <Row>
                <Table striped bordered className="col-md-8 col-sm-9 col-8 offset-2">
                    <tbody>
                        {show_all_LCM(Device)}
                    </tbody>
                </Table>
            </Row>
        </div>
    );
}

export default FirmwareUpdate;
