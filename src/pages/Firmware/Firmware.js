import React, { useState, useEffect } from 'react';
import { Table, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Firmware() {
    const [firmware_data, setfirmwaredata] = useState([]);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        fetch("http://localhost/lcm/laravel_api/public/index.php/firmware")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.data);
                    setfirmwaredata(result.data);
                }
            )
    }, []);

    const data_Delete = (e) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };

        fetch(`http://localhost/lcm/laravel_api/public/index.php/firmware/${e.target.id}`, requestOptions)
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
    };

    return (
        <div>
            <div className="col-md-8 offset-2 mb-2">
                <Row>
                    <div className="col-md-6">
                        <h2>Firmwares</h2>
                    </div>
                    <div className="col-md-6 text-right">
                        <Link to="/CreateFirmware">
                            <Button variant="info">Create</Button>{' '}
                        </Link>
                    </div>
                </Row>
            </div>
            <Row>
                <div className="col-md-8 offset-2">
                    <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th>Firmware</th>
                                <th>Version</th>
                                <th>MD5</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {firmware_data.map((data, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.firmware}</td>
                                        <td>V{data.version}</td>
                                        <td>{data.MD5}</td>
                                        <td>
                                            <Link to={`/UpdateFirmware/${data.id}/${data.version}`}>
                                                <Button variant="warning" id={data.id}><FontAwesomeIcon icon={faEdit} /></Button>
                                            </Link>
                                        </td>
                                        <td><Button variant="danger" id={data.id} onClick={(e) => data_Delete(e)}><FontAwesomeIcon icon={faTrashAlt} /></Button></td>
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

export default Firmware;
