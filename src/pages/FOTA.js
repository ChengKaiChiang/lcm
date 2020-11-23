import { Table, Row, Button, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import './css/FOTA.css';
import swal from 'sweetalert';

function LcmStatus() {

    const [count, setCount] = useState([]);

    const [data, setdata] = useState([]);

    useEffect(() => {
        fetch('http://localhost/lcm/api/public/index.php/model')
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result[0].data);
                    setdata(result[0].data);
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
        setCount(items);
    }

    function test1() {
        const items = [...count];
        console.log(items.length);
        let model = document.getElementById('model_select').value;
        var data = new FormData();
        data.append("id", JSON.stringify(count));
        data.append("model", model);
        if (items.length !== 0) {
            fetch('http://localhost/lcm/api/public/index.php/updateModel', {
                method: 'POST',
                body: data
            }).then((res) => {
                swal("儲存成功!", "Model已更新!", "success").then(() => {
                    window.location.reload(false);
                })
            })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    return (
        <div>
            <Row>
                <Button variant="primary" className="offset-2 mb-3" onClick={test1}>Firmware Upload</Button>{' '}
                <Form.Control as="select" className="col-md-1 col-sm-1 ml-3" id="model_select">
                    {
                        data.map(data => {
                            return (
                                <option>{data.model}</option>
                            )
                        })
                    }
                </Form.Control>
            </Row>

            <Row>
                <Table striped bordered className="col-md-8 col-sm-9 col-8 offset-2">
                    <tbody>
                        <tr>
                            <td>
                                <label for="materialUnchecked"> ID：1</label>
                                <input type="checkbox" class="checkbox offset-1" id="1" onChange={(e) => onChangeorder(e)} />

                            </td>
                            <td>
                                <label for="materialUnchecked"> ID：2</label>
                                <input type="checkbox" class="checkbox offset-1" id="2" onChange={(e) => onChangeorder(e)} />
                            </td>
                            <td>
                                <label for="materialUnchecked"> ID：3</label>
                                <input type="checkbox" class="checkbox offset-1" id="3" onChange={(e) => onChangeorder(e)} />
                            </td>
                            <td>
                                <label for="materialUnchecked"> ID：4</label>
                                <input type="checkbox" class="checkbox offset-1" />
                            </td>
                            <td>
                                <label for="materialUnchecked"> ID：5</label>
                                <input type="checkbox" class="checkbox offset-1" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="materialUnchecked"> ID：6</label>
                                <input type="checkbox" class="checkbox offset-1" />

                            </td>
                            <td>
                                <label for="materialUnchecked"> ID：7</label>
                                <input type="checkbox" class="checkbox offset-1" />
                            </td>
                            <td>
                                <label for="materialUnchecked"> ID：8</label>
                                <input type="checkbox" class="checkbox offset-1" />
                            </td>
                            <td>
                                <label for="materialUnchecked"> ID：9</label>
                                <input type="checkbox" class="checkbox offset-1" />
                            </td>
                            <td>
                                <label for="materialUnchecked"> ID：10</label>
                                <input type="checkbox" class="checkbox offset-1" />
                            </td>
                        </tr>

                    </tbody>
                </Table>
            </Row>
        </div>
    );
}

export default LcmStatus;
