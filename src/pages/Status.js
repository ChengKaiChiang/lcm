import { Table, Col, Row, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import ReactPlayer from 'react-player';
import axios from "axios";

function LcmStatus() {

    var a = () => {
        var str = 'Color: BLACK <br/> LCM Power:3.15V <br/> LCM Current:334.4mA <br/> Back Light Power:12.16V <br/> Back Light Current:521.4mA';
        return parse(str);
    }

    const [data, setdata] = useState([]);

    useEffect(() => {
        fetch('http://localhost/lcm/api/public/index.php/lcm')
            .then(res => res.json())
            .then(
                (result) => {
                    let a = [];
                    let x = 0;
                    for (let i = 0; i < Math.ceil(result[0].data.length / 2); i++) {
                        if (result[0].data[x + 1] !== undefined)
                            a[i] = {'ip1': result[0].data[x], 'ip2': result[0].data[x + 1] };
                        else
                            a[i] = {'ip1': result[0].data[x], 'ip2': 0 };
                        x += 2;
                    }
                    console.log(a);
                    console.log(result[0].data);
                    setdata(a);
                }
            )
    }, []);

    return (
        <Row>
            <div className="col-md-7">
                <Table striped bordered >
                    <tbody>
                        {data.map((data, index) =>
                            <tr>
                                <td>
                                    <Row>
                                        <Col>
                                            <span class="h1">No{data.ip1.id}.</span>
                                            <button type="button" class="offset-1 btn btn-success btn-circle btn-xl" id={data.ip1.ip}></button>
                                            <span class="h1 offset-1">{data.ip1.Lcm_model}</span>
                                        </Col>
                                    </Row>
                                </td>
                                <td>
                                    <Row>
                                        <Col>
                                            <span class="h1">No{data.ip2.id}.</span>
                                            <button type="button" class="offset-1 btn btn-success btn-circle btn-xl" id={data.ip2.ip}></button>
                                            <span class="h1 offset-1">{data.ip2.Lcm_model}</span>
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>

            </div>
            <div class="col-md-4">
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

export default LcmStatus;
