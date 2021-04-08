import { Table, Col, Row, Card, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function LcmStatus() {
    const [LCMDevice, setLCMDevice] = useState([]);
    const [showData, setshowData] = useState([]);
    const [SelectIndex, setSelectIndex] = useState(0);
    const [Device, setDevice] = useState('');
    const [Position, setPosition] = useState('');
    const [OnlineNum, setOnlineNum] = useState(0);

    useEffect(() => {
        getDevices(true);
        const timer = setInterval(() => {
            getDevices(false);
        }, 5000)
        return () => clearInterval(timer);
    }, []);

    const getDevices = (first) => {
        fetch(`${process.env.REACT_APP_API_SERVER}/device`)
            .then(res => res.json())
            .then(
                (result) => {
                    setLCMDevice(result.data);
                    setOnlineNum(result.online);
                    if (first) {
                        setDevice(result.data[0].device);
                        setPosition(result.data[0].position);
                    }
                }
            )
    }

    const show_all_details = (color) => {
        if (showData.length > 0) {
            return (
                <Card.Text>
                    LCM Power: {showData[0][color].lcm_power} V<br />
                    LCM Current: {showData[0][color].lcm_current} mA <br />
                    Back Light Power: {showData[0][color].backlight_power} V<br />
                    Back Light Current: {showData[0][color].backlight_current} mA
                </Card.Text>
            )
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            let post_data = new FormData();
            post_data.append("device", Device);
            post_data.append("position", Position);

            fetch(`${process.env.REACT_APP_API_SERVER}/getStatus`, {
                method: 'POST',
                body: post_data
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setshowData(result);
                    }
                )
        }, 2000);

        return () => clearInterval(timer);
    }, [Device, Position]);

    const changNowID = (e) => {
        setSelectIndex(e.target.id);
        setDevice(LCMDevice[SelectIndex].device);
        setPosition(LCMDevice[SelectIndex].position);
    }

    const data_process = (datas) => {
        var lists = [];
        
        datas.map((data, index) => {
            lists.push(
                <td>
                    <Row>
                        <Col >
                            <span className="h2">No.{index + 1}</span>
                            <Button className="offset-1 btn-circle" variant={data.variant} id={index} onClick={(e) => changNowID(e)}></Button>
                            {/* <button type="button" className="offset-1 btn btn-success btn-circle" id={index} onClick={(e) => changNowID(e)}></button> */}
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

    const getDevice = () => {
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
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>目前運作數量: {OnlineNum}</Card.Title>
                        <Card.Subtitle>
                            {getDevice()}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
                <Card bg='light' text='dark' style={{ width: '18rem' }} >
                    <Card.Body>
                        {show_all_details('light')}
                    </Card.Body>
                </Card>
                <Card bg='dark' text='white' style={{ width: '18rem' }} >
                    <Card.Body>
                        {show_all_details('dark')}
                    </Card.Body>
                </Card>
                <Card bg='danger' text='white' style={{ width: '18rem' }} >
                    <Card.Body>
                        {show_all_details('danger')}
                    </Card.Body>
                </Card>
                <Card bg='success' text='white' style={{ width: '18rem' }} >
                    <Card.Body>
                        {show_all_details('success')}
                    </Card.Body>
                </Card>
                <Card bg='primary' text='white' style={{ width: '18rem' }} >
                    <Card.Body>
                        {show_all_details('primary')}
                    </Card.Body>
                </Card>
                <Card bg='secondary' text='white' style={{ width: '18rem' }} >
                    <Card.Body>
                        {show_all_details('secondary')}
                    </Card.Body>
                </Card>
            </div>
        </Row>
    );
}

export default LcmStatus;
