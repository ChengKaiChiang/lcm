import { Table, Col, Row, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import ReactPlayer from 'react-player';
import axios from "axios";

function LcmStatus() {
    console.log('invoke function component');
    var a = () => {
        return parse(showData);
    }

    const [color, setcolor] = useState(["BLACK", "BLUE", "GREEN", "RED", "WHITE"]);
    const [color_num, setnum] = useState(0);
    const [quantity, setquantity] = useState(0);
    const [nowIP, setip] = useState("");
    const [data, setdata] = useState([]);

    const [showData, setshowData] = useState("");

    useEffect(() => {
        console.log("aaaa");
        fetch('http://localhost/lcm/api/public/index.php/lcm')
            .then(res => res.json())
            .then(
                (result) => {
                    setquantity(result[0].data.length);
                    setip(result[0].data[0].ip);
                    let a = [];
                    let x = 0;
                    for (let i = 0; i < Math.ceil(result[0].data.length / 2); i++) {
                        if (result[0].data[x + 1] !== undefined)
                            a[i] = { 'ip1': result[0].data[x], 'ip2': result[0].data[x + 1] };
                        else
                            a[i] = { 'ip1': result[0].data[x], 'ip2': undefined };
                        x += 2;
                    }
                    console.log(a);
                    console.log(result[0].data);
                    setdata(a);
                }
            )
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            let post_data = new FormData();
            post_data.append("color", color[color_num]);
            post_data.append("device_ip", nowIP);
            let num = color_num;
            if (num === 4)
                setnum(0);
            else
                setnum(++num);

            console.log(color_num + ", " + color[color_num] + ", " + nowIP);

            fetch('http://localhost/lcm/api/public/index.php/getVoltage', {
                method: 'POST',
                body: post_data
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        let show_str = "Color:" + color[color_num] + "<br/> LCM Power:" + result[0].data[0].lcm_power + "V <br/> LCM Current:" + result[0].data[0].lcm_current + "mA <br/>" +
                            " Back Light Power:" + result[0].data[0].backlight_power + "V <br/> Back Light Current:" + result[0].data[0].backlight_current + "mA";

                        setshowData(show_str);
                    }
                )
        }, 3000);
        return () => clearInterval(timer);
    });

    function changNowID(e) {
        // console.log(e.target.id);
        setip(e.target.id);
        console.log(nowIP);
    }

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
                                            <button type="button" class="offset-1 btn btn-success btn-circle btn-xl" id={data.ip1.ip} onClick={(e) => changNowID(e)}></button>
                                            <span class="h1 offset-1">{data.ip1.model}</span>
                                        </Col>
                                    </Row>
                                </td>
                                <td>
                                    <Row>
                                        <Col>
                                            <span class="h1">No{data.ip2.id}.</span>
                                            <button type="button" class="offset-1 btn btn-success btn-circle btn-xl" id={data.ip2.ip} onClick={(e) => changNowID(e)}></button>
                                            <span class="h1 offset-1">{data.ip2.model}</span>
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
                        <Card.Title>目前運作數量: {quantity}</Card.Title>
                        <Card.Text>
                            Device IP: {nowIP}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{a()}</ListGroupItem>
                    </ListGroup>
                </Card>

                <ReactPlayer url='https://www.youtube.com/watch?v=HjNkFHItWQk' />
            </div>

        </Row>
    );
}

export default LcmStatus;
