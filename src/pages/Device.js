import React, { useState, useEffect } from 'react';
import { Table, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from '../components/Title';

function Device() {
    const [ModelData, setModelData] = useState([]);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_SERVER}/device`)
            .then(res => res.json())
            .then(
                (result) => {
                    setModelData(result.data);
                }
            )
        const timer = setInterval(() => {
            fetch(`${process.env.REACT_APP_API_SERVER}/device`)
                .then(res => res.json())
                .then(
                    (result) => {
                        setModelData(result.data);
                    }
                )
        }, 3000)
        return () => clearInterval(timer);
    }, []);

    const data_Delete = (e, device, position) => {
        MySwal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            text: '是否要刪除 ' + device + '_' + position + ' ?',
            showDenyButton: true,
            confirmButtonText: "OK",
            denyButtonText: "Cancel"
        }).then((result) => {
            console.log(result);
            if (result.value) {
                let requestOptions = {
                    method: 'DELETE',
                    redirect: 'follow'
                };

                fetch(`${process.env.REACT_APP_API_SERVER}/device/${e.target.id}`, requestOptions)
                    .then(res => res.json())
                    .then(
                        (result) => {
                            console.log(result.data);
                            if (result.status === 'OK') {
                                MySwal.fire({
                                    title: '刪除成功',
                                    icon: 'success',
                                    confirmButtonText: "OK",
                                }).then(() => {
                                    window.location.reload(false);
                                })
                            }
                        }
                    )
            }
        })
    };

    const test = (Device_status) => {

        let color = 'secondary';
        if (Device_status === '-1') {
            color = 'secondary';
        }
        else if (Device_status === '0') {
            color = 'success';
        } else if (Device_status === '1') {
            color = 'warning';
        } else if (Device_status === '2') {
            color = 'danger';
        }

        return (<Button variant={color} className='btn-circle'></Button>)
    }
    return (
        <div>
            <Title name="Devices" action="no" />

            <Row>
                <div className="col-md-8 offset-2">
                    <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th>Position</th>
                                <th>Device</th>
                                <th>Model</th>
                                <th>Firmware</th>
                                <th>Version</th>
                                <th>Status</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {ModelData.map((data, index) => {
                                return (
                                    <tr key={data.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.position}</td>
                                        <td>{data.device}</td>
                                        <td>{data.model}</td>
                                        <td>{data.firmware}</td>
                                        <td>V{data.version}</td>
                                        <td>
                                            {test(data.status)}
                                        </td>
                                        <td><Button variant="danger" id={data.id} onClick={(e) => data_Delete(e, data.device, data.position)}><FontAwesomeIcon icon={faTrashAlt} /></Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </Row>
        </div>
    );
}

export default Device;
