import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { AuthContext } from "../pages/auth/context";
import { setAuthToken, getAuthToken } from "../pages/auth/utils";
import { LinkContainer } from "react-router-bootstrap";

export default function MyNavbar() {
    const location = useLocation();
    const { user, setUser } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        const token = getAuthToken();

        fetch(`${process.env.REACT_APP_API_SERVER}/signout`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }).then(res => res.json())
            .then((res) => {
                console.log(res);
                if (res.message === 'sign out success') {
                    setAuthToken("");
                    setUser(null);
                    if (location.pathname !== "/") {
                        history.push("/");
                    }
                }
            }).catch(e => {
                console.log(e);
            })
    };

    return (
        <div className="mb-3">
            <Navbar bg="light" expand="md">
                <LinkContainer to="/">
                    <Navbar.Brand>LCM Aging</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Status</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/Device">
                            <Nav.Link>Device</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/Optical">
                            <Nav.Link>Optical</Nav.Link>
                        </LinkContainer>

                        {user && (<LinkContainer to="/Update">
                            <Nav.Link>Update</Nav.Link>
                        </LinkContainer>)}

                        {user && (<NavDropdown title="Setting" id="basic-nav-dropdown">
                            <LinkContainer to="/Firmware">
                                <NavDropdown.Item>Firmware</NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            <LinkContainer to="/Model">
                                <NavDropdown.Item>Model</NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>)}
                    </Nav>

                    <Nav inline>
                        {user && (<LinkContainer to="/SignUp">
                            <Nav.Link>Sign Up</Nav.Link>
                        </LinkContainer>)}
                        {user && (<Nav.Link onClick={handleLogout}>Logout</Nav.Link>)}
                        {!user && (<LinkContainer to="/SignIn">
                            <Nav.Link>Sign In</Nav.Link>
                        </LinkContainer>)}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>

    );
}
