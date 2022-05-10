import { useContext } from 'react';
import Logo from "../images/logo.png";
import { Container, Navbar as NavbarComp, Nav, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/userContext'

export default function NavAdmin(props) {
    const [state, dispatch] = useContext(UserContext)

    let navigate = useNavigate()

    const logout = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/auth")
    }

    return (
        <NavbarComp expand="lg">
            <Container>
                <NavbarComp.Brand as={Link} to="/complain-admin">
                    <img src={Logo} className="img-fluid" style={{ width: '60px', height: '60px' }} />
                </NavbarComp.Brand>
                <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
                <NavbarComp.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/complain-admin" className={props?.title === 'Complain admin' ? `text-navbar-active` : `text-navbar`}>Complain</Nav.Link>
                        <Nav.Link as={Link} to="/category" className={props?.title === 'Category admin' ? `text-navbar-active` : `text-navbar`}>Category</Nav.Link>
                        <Nav.Link as={Link} to="/productlist" className={props?.title === 'Product admin' ? `text-navbar-active` : `text-navbar`}>Product</Nav.Link>
                        <Nav.Link onClick={logout} className="text-navbar">Logout</Nav.Link>
                    </Nav>
                </NavbarComp.Collapse>
            </Container>
        </NavbarComp>
    )
}

