import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Button } from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';
import md5 from "md5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faSave, faUpload } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useParams } from "react-router-dom";
import InputSpinner from 'react-bootstrap-input-spinner';

function UpdateFirmware() {
    let { id, version } = useParams();

    //old Firmware info
    const [Firmware, setFirmware] = useState('');
    const [OldData, setOldData] = useState([]);

    //new Firmware info
    const [FirmwareSize, setSize] = useState('');
    const [FirmwareMD5, setMD5] = useState('');
    const [Firmware_Version, setversion] = useState(version);
    const MySwal = withReactContent(Swal);

    const handleFiles = files => {
        setSize(files[0].size);
        var reader = new FileReader();
        reader.onload = (e) => {
            // Use reader.result
            setMD5(md5(reader.result));
        }
        reader.readAsText(files[0]);

    }

    useEffect(() => {
        fetch(`http://localhost/lcm/laravel_api/public/index.php/firmware/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.data);
                    setFirmware(result.data.firmware);
                    setSize(result.data.size);
                    setMD5(result.data.MD5);
                    setOldData(result.data);
                }
            )
    }, [id]);

    const save = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let data = new URLSearchParams();
        data.append("Size", FirmwareSize);
        data.append("Version", Firmware_Version);
        data.append("MD5", FirmwareMD5);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        if (OldData.version !== Firmware_Version && OldData.version < Firmware_Version) {
            fetch(`http://localhost/lcm/laravel_api/public/index.php/firmware/${id}`, requestOptions)
                .then(res => res.json())
                .then((res) => {
                    if (res.status === 'OK') {
                        MySwal.fire({
                            title: '儲存成功',
                            icon: 'success',
                            confirmButtonText: "OK",
                        }).then(() => {
                            window.history.back();
                        })
                    }
                }).catch(e => {
                    console.log(e);
                })
        } else {
            MySwal.fire({
                title: '儲存失敗',
                icon: 'error',
                text: 'Something went wrong!'
            })
        }
    }

    const setVer = (num) => {
        setversion(num);
    }

    return (
        <div>
            <div className="col-md-8 offset-2 mb-2">
                <Row>
                    <div className="col-md-6">
                        <h2>Update Firmware</h2>
                    </div>
                    <div className="col-md-6 text-right">
                        <Link to="/Firmware">
                            <Button variant="info"><FontAwesomeIcon icon={faAngleDoubleLeft} /> Back</Button>{' '}
                        </Link>
                    </div>
                </Row>
            </div>
            <div className="col-md-8 offset-2 mb-4">
                <div className="mb-2">
                    <ReactFileReader fileTypes={["*"]} handleFiles={handleFiles}>
                        <Button variant="success"><FontAwesomeIcon icon={faUpload} /> Upload File</Button>
                    </ReactFileReader>
                </div>

                <p>File Name：{Firmware}</p>
                <p>File Size：{FirmwareSize}</p>
                <p>MD5：{FirmwareMD5}</p>
                <Row>
                    <p className="col-md-1">Version：</p>
                    <div className="col-md-2">
                        <InputSpinner
                            type={'real'}
                            editable={false}
                            max={10000}
                            min={version}
                            step={1}
                            value={version}
                            onChange={num => setVer(num)}
                            variant={'primary'}
                            size="sm"
                        />
                    </div>

                </Row>
            </div>

            <div className="col-md-8 offset-2 text-right">
                <Button variant="primary" onClick={save}><FontAwesomeIcon icon={faSave} /> Save</Button>
            </div>
        </div>
    );
}

export default UpdateFirmware;
