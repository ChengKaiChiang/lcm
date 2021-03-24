import { Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

function myTitle(props) {
    return (
        <div className="col-md-8 offset-2 mb-3">
            <Row>
                <div className="col-md-6">
                    <h2>{props.name}</h2>
                </div>
                <div className="col-md-6 text-right">
                    <Link to={`/${props.link}`}>
                        <SelectButton action={props.action} />
                    </Link>
                </div>
            </Row>
        </div>
    );
}

function SelectButton(props) {
    if (props.action === 'Create') {
        return (
            <Button variant="info"><FontAwesomeIcon icon={faPlus} /> {props.action}</Button>
        );
    } else if (props.action === 'Back') {
        return (
            <Button variant="info"><FontAwesomeIcon icon={faAngleDoubleLeft} /> {props.action}</Button>
        );
    } else if (props.action === 'no') {
        return (
            <Button hidden></Button>
        );
    }

}

export default myTitle;
