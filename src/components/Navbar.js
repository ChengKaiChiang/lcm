import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar';

function myNavbar() {
    return (
        <div className="mb-3">
            <Navbar bg="light" expand="md">
                <Navbar.Brand href="/">LCM Aging</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Status</Nav.Link>
                        <Nav.Link href="/Update">Update</Nav.Link>
                        <Nav.Link href="/Device">Device</Nav.Link>
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/Firmware">Firmware</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/Model">Model</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

    );
}

export default myNavbar;
