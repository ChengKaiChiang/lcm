import { Table, Col, Row, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import ReactPlayer from 'react-player';
function LcmStatus() {
    const [color] = useState(["White", "White", "Black", "Red", "Green", "Blue", 'V127']);
    const [color_num, setnum] = useState(0);
    const [LCMDevice, setLCMDevice] = useState([]);
    const [showData, setshowData] = useState("");
    const [SelectIndex, setSelectIndex] = useState(0);

    useEffect(() => {
        getLCMData();
        const timer = setInterval(() => {
            getLCMData();
        }, 5000)
        return () => clearInterval(timer);
    }, []);

    const getLCMData = () => {
        fetch(`${process.env.REACT_APP_API_SERVER}/device`)
            .then(res => res.json())
            .then(
                (result) => {
                    setLCMDevice(result.data);
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
            post_data.append("device", LCMDevice[SelectIndex].device);
            post_data.append("position", LCMDevice[SelectIndex].position);

            let num = color_num;
            if (num === 6)
                setnum(0);
            else
                setnum(++num);

            console.log(color_num + ", " + color[color_num] + ", " + LCMDevice[SelectIndex].device + ", " + LCMDevice[SelectIndex].device);

            fetch(`${process.env.REACT_APP_API_SERVER}/getStatus`, {
                method: 'POST',
                body: post_data
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        let show_str = "Color: " + color[color_num] + "<br/> LCM Power: " + result[0].lcm_power + "V <br/> LCM Current: " + result[0].lcm_current + "mA <br/>" +
                            " Back Light Power: " + result[0].backlight_power + "V <br/> Back Light Current: " + result[0].backlight_current + "mA";

                        setshowData(show_str);
                    }
                )
        }, 2000);
        return () => clearInterval(timer);
    });

    const changNowID = (e) => {
        setSelectIndex(e.target.id);
    }

    const data_process = (datas) => {
        var lists = [];
        datas.map((data, index) => {
            lists.push(
                <td>
                    <Row>
                        <Col >
                            <span className="h2">No.{index + 1}</span>
                            <button type="button" className="offset-1 btn btn-success btn-circle" id={index} onClick={(e) => changNowID(e)}></button>
                            <span className="h2 offset-1">{data.model}</span>
                        </Col>
                    </Row>
                </td>
            )
            return 0;
        })

        if (datas.length % 2 !== 0) {
            lists.push(
                <td>
                    <Row>
                        <Col>
                            <span className="h1 offset-1">null</span>
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

    const test = () => {
        if (LCMDevice.length !== 0) {
            return (
                <div>
                    Device: {LCMDevice[SelectIndex].device} <br />
                    Position: {LCMDevice[SelectIndex].position}
                </div>
            );
        }
    }

    return (
        <Row>
            <div className="offset-1 col-md-6">
                <Table striped bordered >
                    <tbody>
                        {show_all_LCM(LCMDevice)}
                    </tbody>
                </Table>
            </div>
            <div className="col-md-4">
                <Card className="mb-3 col-md-8">
                    <Card.Body>
                        <Card.Title>目前運作數量: {LCMDevice.length}</Card.Title>
                        <Card.Subtitle>
                            {test()}
                        </Card.Subtitle>
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
