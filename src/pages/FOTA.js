import { Table, Row, Button, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './css/FOTA.css';
import swal from 'sweetalert';

function FirmwareUpdate() {
    const [count, setCount] = useState([]);
    const [lcminfo, setinfo] = useState([]);
    const [model_data, setmodeldata] = useState([]);

    useEffect(() => {
        fetch('http://localhost/lcm/laravel_api/public/model')
            .then(res => res.json())
            .then(
                (result) => {
                    setmodeldata(result.data);
                }
            )
    }, []);

    useEffect(() => {
        fetch('http://localhost/lcm/laravel_api/public/lcm')
            .then(res => res.json())
            .then(
                (result) => {
                    setinfo(result.data);
                }
            )
    }, []);

    //改值的時候
    const onChangeorder = (e) => {
        const items = [...count];
        if (e.target.checked === true)
            items.push(e.target.id);
        else {
            items.forEach(function (item, index, arr) {
                if (item === e.target.id) {
                    arr.splice(index, 1);
                }
            });
        }

        console.log(items);
        setCount(items);
    }

    const data_process = (data) => {
        var lists = [];
        for (let x of data) {
            lists.push(
                <td>
                    <label> No.{x.id}</label>
                    <input type="checkbox" className="checkbox offset-1" id={x.id} onChange={(e) => onChangeorder(e)} />
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
        const items = [...count];
        console.log(items.length);
        let model_id = document.getElementById('model_select').selectedOptions[0].id;
        console.log(document.getElementById('model_select').selectedOptions[0].id);
        let data = new FormData();
        data.append("id", items);
        data.append("model", model_id);

        if (items.length !== 0) {
            fetch('http://localhost/lcm/laravel_api/public/updateLcmModel', {
                method: 'POST',
                body: data
            }).then((res) => {
                swal("儲存成功!", "Model已更新!", "success").then(() => {
                    window.location.reload(false);
                })
            }).catch(e => {
                console.log(e);
            })
        }
    }

    return (
        <div>
            <Row>
                <Button variant="primary" className="offset-2 mb-3" onClick={Firmware_update}>Firmware Upload</Button>{' '}
                <Form.Control as="select" className="col-md-1 col-sm-1 ml-3" id="model_select">
                    {
                        model_data.map(data => {
                            return (
                                <option key={data.id} id={data.id}>{data.model_name}</option>
                            )
                        })
                    }
                </Form.Control>
            </Row>

            <Row>
                <Table striped bordered className="col-md-8 col-sm-9 col-8 offset-2">
                    <tbody>
                        {show_all_LCM(lcminfo)}
                    </tbody>
                </Table>
            </Row>
        </div>
    );
}

export default FirmwareUpdate;
