import React, { useState, useEffect } from 'react';
import { Table, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Title from '../../components/Title';
import { getAuthToken } from "../../pages/auth/utils";

function Model() {
    const [ModelData, setModelData] = useState([]);
    const MySwal = withReactContent(Swal);

    const getModel = () => {
        const token = getAuthToken();

        fetch(`${process.env.REACT_APP_API_SERVER}/model`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }).then(res => res.json())
            .then(
                (result) => {
                    console.log(result.data);
                    setModelData(result.data);
                }
            )
    }

    useEffect(() => {
        getModel()
    }, []);

    const data_Delete = (e, id, model) => {
        const token = getAuthToken();
        
        console.log(id);
        if (id !== '') {
            MySwal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                text: '是否要刪除 ' + model + ' ?',
                showDenyButton: true,
                confirmButtonText: "OK",
                denyButtonText: "Cancel"
            }).then((result) => {
                console.log(result);
                if (result.value) {
                    let requestOptions = {
                        method: 'DELETE',
                        redirect: 'follow',
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    };
                    fetch(`${process.env.REACT_APP_API_SERVER}/model/${id}`, requestOptions)
                        .then(res => res.json())
                        .then(
                            (result) => {
                                console.log(result.data);
                                if (result.status === 'OK') {
                                    MySwal.fire({
                                        title: '刪除成功',
                                        icon: 'success',
                                        confirmButtonText: "OK",
                                    }).then(
                                        getModel()
                                    )
                                }
                            }
                        )
                }
            })
        }

    };

    return (
        <div>
            <Title name="Models" action="Create" link="CreateModel" />

            <Row>
                <div className="col-md-8 offset-2">
                    <Table striped bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th>Model</th>
                                <th>Firmware</th>
                                <th>Version</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {ModelData.map((data, index) => {
                                return (
                                    <tr key={data.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{data.model}</td>
                                        <td>{data.firmware.firmware}</td>
                                        <td>V{data.firmware.version}</td>
                                        <td>
                                            <Link to={`/UpdateModel/${data.id}/${data.firmware.id}`}>
                                                <Button variant="warning"><FontAwesomeIcon icon={faEdit} /></Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Button variant="danger" id={data.id} onClick={(e) => data_Delete(e, data.id, data.model)}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </Button>
                                        </td>
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

export default Model;
