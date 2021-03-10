import { Table, Row, Button } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
function Firmware() {

    return (
        <div>
            <div className="col-md-8 offset-2 mb-2">
                <Row>
                    <div className="col-md-6">
                        <h2>Firmwares</h2>
                    </div>
                    <div className="col-md-6 text-right">
                        <Link to="/CreateFirmware">
                            <Button variant="primary">Create</Button>{' '}
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Row>
        </div>
    );
}

export default Firmware;
