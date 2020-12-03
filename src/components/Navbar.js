import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import Navbar from 'react-bootstrap/Navbar';

function myNavbar() {
    return (
        <div className="mb-3">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/"><h2>LCM Aging</h2></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="Lcm_Status"><h3>Status</h3></Nav.Link>
                        <Nav.Link href="/"><h3>Update</h3></Nav.Link>
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
