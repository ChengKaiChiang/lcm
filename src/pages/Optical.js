import { Table, Row, Button, Form } from 'react-bootstrap';
import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

function Optical() {
    const [optical, setOptical] = useState([]);
    const [options, setOptions] = useState({
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 1,
            },
        },
        responsive: true,
        scales: {
            x: {
                ticks: {
                    stepSize: 1
                }
            },
        },
        animation: true,
    });
    const [data, setData] = useState({});

    useEffect(() => {
        getOptical(true);
        const timer = setInterval(() => {
            getOptical(false)
        }, 1000)
        return () => clearInterval(timer);
    }, []);

    const getOptical = (first) => {
        fetch(`${process.env.REACT_APP_API_SERVER}/optical`)
            .then(res => res.json())
            .then(
                (result) => {
                    let chartData = {
                        labels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'],
                        datasets: [
                            {
                                label: 'Qty',
                                data: [0, 0, 0, 0, 0],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }
                    
                    let length = result.table.length;
                    for (let i = 0; i < length; i++) {
                        let level = parseInt(result.table[i].level) - 1;
                        chartData.datasets[0].data[level] = result.table[i].count;
                    }
                    setData(chartData);
                    setOptical(result.optical_data);

                    if(!first){
                        let option = {
                            indexAxis: 'y',
                            elements: {
                                bar: {
                                    borderWidth: 1,
                                },
                            },
                            responsive: true,
                            scales: {
                                x: {
                                    ticks: {
                                        stepSize: 1
                                    }
                                },
                            },
                            animation: false,
                        }
    
                        setOptions(option)
                    }
                }
            )
    }

    return (
        <div>
            <Row className="justify-content-center mb-2">
                <h3 >Model：</h3>
                <Form.Control as="select" className="col-md-1 col-sm-1" id="model_select">
                    <option id={0}>LQ144P1JX01</option>
                    <option id={1}>LQ156R1JX01</option>
                    <option id={2}>LQ144P1JX01</option>
                </Form.Control>
                <Button variant="primary" className="ml-3">Search</Button>{' '}
            </Row>

            <Row className="col-md-6 col-sm-9 col-8 offset-3 mb-2">
                <Bar data={data} height={130} options={options} />
            </Row>

            <div className="col-md-8 offset-2">
                <Table striped bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>#</th>
                            <th>Model</th>
                            <th>NTSC</th>
                            <th>Gamma</th>
                            <th>Brightness</th>
                            <th>Temperature</th>
                            <th>Level</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {optical.map((data, index) => {
                            return (
                                <tr key={data.id}>
                                    <th scope="row">{data.lcm_id}</th>
                                    <td>{data.model}</td>
                                    <td>{data.ntsc}</td>
                                    <td>{data.gamma}</td>
                                    <td>{data.brightness}</td>
                                    <td>{data.temperature}</td>
                                    <td>{data.level}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Optical;