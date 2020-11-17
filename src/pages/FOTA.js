import { Table, Col, Row, Button } from 'react-bootstrap';
import './css/FOTA.css';
function lcmstatus() {
    return (
        <div>
            <Button variant="primary" className="offset-2 mb-3">Firmware Upload</Button>{' '}
            <Row>
                <Table striped bordered className="col-md-8 col-sm-9 col-8 offset-2">
                    <tbody>
                        <tr>
                            <td>
                                <label for="materialUnchecked"> ID：1</label>
                                <input type="checkbox" class="checkbox offset-1" />

                            </td>
                            <td>
                                <label for="materialUnchecked"> ID：2</label>
                                <input type="checkbox" class="checkbox offset-1" />
                            </td>
                            <td>
                                <label for="materialUnchecked"> ID：3</label>
                                <input type="checkbox" class="checkbox offset-1" />
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

export default lcmstatus;
