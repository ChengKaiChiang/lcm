import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from '../../components/Title';

function Firmware() {
    const [firmware_data, setfirmwaredata] = useState([]);
    const MySwal = withReactContent(Swal);

    const getFirmware = () => {
        fetch(`${process.env.REACT_APP_API_SERVER}/firmware`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.data);
                    setfirmwaredata(result.data);
                }
            )
    }

    useEffect(() => {
        getFirmware()
    }, []);

    const data_Delete = (e, id, firmware) => {
        if (id !== '') {
            MySwal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                text: '是否要刪除 ' + firmware + ' ?',
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

                    fetch(`${process.env.REACT_APP_API_SERVER}/firmware/${id}`, requestOptions)
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
                                        getFirmware()
                                    })
                                }
                            }
                        )
                }
            })
        }
    };

    return (
        <div>
            <Title name="Firmwares" action="Create" link="CreateFirmware" />

            <div className="col-md-8 offset-2">
                <Table striped bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>Firmware</th>
                            <th>File</th>
                            <th>Version</th>
                            <th>MD5</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {firmware_data.map((data, index) => {
                            return (
                                <tr key={data.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{data.firmware}</td>
                                    <td>{data.file}</td>
                                    <td>V{data.version}</td>
                                    <td>{data.MD5}</td>
                                    <td>
                                        <Link to={`/UpdateFirmware/${data.id}/${data.version}`}>
                                            <Button variant="warning" id={data.id}><FontAwesomeIcon icon={faEdit} /></Button>
                                        </Link>
                                    </td>
                                    <td>
                                        <Button variant="danger" id={data.id} onClick={(e) => data_Delete(e, data.id, data.firmware)}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Firmware;
