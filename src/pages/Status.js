import { Table, Col, Row, Card, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function LcmStatus() {
    const [LCMDevice, setLCMDevice] = useState([]);
    const [showData, setshowData] = useState([]);
    const [SelectIndex, setSelectIndex] = useState(0);
    const [NowTime, setNowTime] = useState('');

    useEffect(() => {
        getDevices();
        const timer = setInterval(() => {
            getDevices();
        }, 5000)
        return () => clearInterval(timer);
    }, []);

    const getDevices = () => {
        fetch(`${process.env.REACT_APP_API_SERVER}/device`)
            .then(res => res.json())
            .then(
                (result) => {
                    setLCMDevice(result.data);
                    setNowTime(result.now_time);
                }
            )
    }

    const show_all_details = (color) => {
        if (showData.length > 0) {
            return (
                <Card.Text>
                    LCM Power: {showData[0].[color].lcm_power} V<br />
                    LCM Current: {showData[0].[color].lcm_current} mA <br />
                    Back Light Power: {showData[0].[color].backlight_power} V<br />
                    Back Light Current: {showData[0].[color].backlight_current} mA
                </Card.Text>
            )
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            let post_data = new FormData();
            post_data.append("device", LCMDevice[SelectIndex].device);
            post_data.append("position", LCMDevice[SelectIndex].position);

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
    });

    const changNowID = (e) => {
        setSelectIndex(e.target.id);
    }

    const data_process = (datas) => {
        var lists = [];

        datas.map((data, index) => {
            let update_at = Date.parse(data.updated_at);
            let now = Date.parse(NowTime);
            let Variant = 'secondary';

            if (data.lcm_status === '1' && (now - update_at) < 5 * 60 * 1000) {
                Variant = 'success';
            } else if (data.lcm_status === '2') {
                Variant = 'danger';
            } else if (data.lcm_status === '0') {
                Variant = 'secondary';
            }
            else if ((now - update_at) > 5 * 60 * 1000) {
                console.log('a');
                Variant = 'secondary';
                set_deive_offline(data.id);
            }

            lists.push(
                <td>
                    <Row>
                        <Col >
                            <span className="h2">No.{index + 1}</span>
                            <Button className="offset-1 btn-circle" variant={Variant} id={index} onClick={(e) => changNowID(e)}></Button>
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

    const set_deive_offline = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_API_SERVER}/setDeviceOffline/${id}`, requestOptions)
            .then(res => res.json())
            .then((res) => {
                if (res.status === 'OK') {
                    console.log('OK')
                }
            }).catch(e => {
                console.log(e);
            })

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
                        <Card.Title>目前運作數量: {LCMDevice.length}</Card.Title>
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
