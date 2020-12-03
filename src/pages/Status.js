import { Table, Col, Row, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import ReactPlayer from 'react-player';
function LcmStatus() {
    const [color] = useState(["WHITE", "WHITE", "BLACK", "RED", "GREEN", "BLUE"]);
    const [color_num, setnum] = useState(0);
    const [quantity, setquantity] = useState(0);
    const [nowIP, setip] = useState("");
    const [data, setdata] = useState([]);
    const [showData, setshowData] = useState("");

    useEffect(() => {
        let first = true;
        getLCMData(first);
        const timer = setInterval(() => {
            first = false;
            getLCMData(first);
        }, 5000)
        return () => clearInterval(timer);
    }, []);

    const getLCMData = (first) => {
        fetch('http://localhost/lcm/api/public/index.php/lcm')
            .then(res => res.json())
            .then(
                (result) => {
                    setquantity(result[0].data.length);
                    if (first)
                        setip(result[0].data[0].ip);
                    setdata(result[0].data);
                }
            )
    }

    const show_all_details = () => {
        return parse(showData);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            let post_data = new FormData();
            post_data.append("color", color[color_num]);
            post_data.append("device_ip", nowIP);
            let num = color_num;
            if (num === 5)
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
        }, 2000);
        return () => clearInterval(timer);
    });

    const changNowID = (e) => {
        setip(e.target.id);
    }

    const data_process = (data) => {
        var lists = [];
        for (let x of data) {
            lists.push(
                <td>
                    <Row>
                        <Col>
                            <span className="h1">No.{x.id}</span>
                            <button type="button" className="offset-1 btn btn-success btn-circle btn-xl" id={x.ip} onClick={(e) => changNowID(e)}></button>
                            <span className="h1 offset-1">{x.model}</span>
                        </Col>
                    </Row>
                </td>
            )
        }
        return (lists)
    }

    const show_all_LCM = (data) => {
        let dataProcess = data_process(data);

        let show_lists = [];
        let length = Math.ceil(dataProcess.length / 2);
        for (let t = 0; t < length; t++) {
            show_lists.push(
                <tr key={t}>
                    {dataProcess[t * 2]}
                    {dataProcess[(t * 2) + 1]}
                </tr>
            )
        }

        return (show_lists)
    }

    return (
        <Row>
            <div className="col-md-7">
                <Table striped bordered >
                    <tbody>
                        {show_all_LCM(data)}
                    </tbody>
                </Table>
            </div>
            <div className="col-md-4">
                <Card className="mb-3 col-md-8">
                    <Card.Body>
                        <Card.Title>目前運作數量: {quantity}</Card.Title>
                        <Card.Text>
                            Device IP: {nowIP}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{show_all_details()}</ListGroupItem>
                    </ListGroup>
                </Card>

                <ReactPlayer url='https://www.youtube.com/watch?v=HjNkFHItWQk' />
            </div>
        </Row>
    );
}

export default LcmStatus;
