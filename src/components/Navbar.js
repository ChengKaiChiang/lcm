import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar';

function myNavbar() {
    return (
        <div class="mb-3">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">LCM Aging</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="Lcm_Status">Status</Nav.Link>
                        <Nav.Link href="/">Update</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

    );
}

export default myNavbar;
