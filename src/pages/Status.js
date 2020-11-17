import { Table, Col, Row, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import parse from 'html-react-parser';
import ReactPlayer from 'react-player';

function lcmstatus() {

    var a = () => {
        var str = 'Color: BLACK <br/> LCM Power:3.15V <br/> LCM Current:334.4mA <br/> Back Light Power:12.16V <br/> Back Light Current:521.4mA';
        return parse(str);
    }
    return (
        <Row>
            <div className="offset-2 col-md-4">
                <Table striped bordered >
                    <tbody>
                        <tr>
                            <td>
                                <Row>
                                    <Col>
                                        <span class="offset-1">1 </span>
                                        <button type="button" class="btn btn-success btn-circle"></button>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <Row>
                                    <Col>
                                        <span class="offset-1">2 </span>
                                        <button type="button" class="btn btn-success btn-circle"></button>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <Row>
                                    <Col>
                                        <span class="offset-1">3 </span>
                                        <button type="button" class="btn btn-success btn-circle"></button>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <Row>
                                    <Col>
                                        <span class="offset-1">4 </span>
                                        <button type="button" class="btn btn-success btn-circle"></button>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <Row>
                                    <Col>
                                        <span class="offset-1">5 </span>
                                        <button type="button" class="btn btn-success btn-circle"></button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Row>
                                    <Col>
                                        <span class="offset-1">6 </span>
                                        <button type="button" class="btn btn-success btn-circle"></button>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <Row>
                                    <Col>
                                        <span class="offset-1">7 </span>
                                        <button type="button" class="btn btn-success btn-circle"></button>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <Row>
                                    <Col>
                                        <span class="offset-1">8 </span>
                                        <button type="button" class="btn btn-success btn-circle"></button>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <Row>
                                    <Col>
                                        <span class="offset-1">9 </span>
                                        <button type="button" class="btn btn-success btn-circle"></button>
                                    </Col>
                                </Row>
                            </td>
                            <td>
                                <Row>
                                    <Col>
                                        <span class="offset-1">10 </span>
                                        <button type="button" class="btn btn-success btn-circle"></button>
                                    </Col>
                                </Row>
                            </td>
                        </tr>
                    </tbody>
                </Table>

            </div>
            <div class="col-md-6">
                <Card className="mb-3 col-md-8">
                    <Card.Body>
                        <Card.Title>Device ID: 1</Card.Title>
                        <Card.Text>
                            Device IP: 192.168.1.196
                    </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{a()}</ListGroupItem>
                    </ListGroup>
                </Card>

                <ReactPlayer url='https://www.youtube.com/watch?v=YGzrowrKkw4' />
            </div>

        </Row>
    );
}

export default lcmstatus;
