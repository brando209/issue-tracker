import { Navbar } from 'react-bootstrap'
import './NavBar.css';

function NavBar({ title, logo, render, ...props }) {
    return (
        <Navbar className="NavBar" {...props}>
            <Navbar.Brand id="brand" href="/">
                {logo ? 
                    <img 
                        alt=""
                        src={logo}
                        className="logo"
                    /> : 
                    null
                }
                {title}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                {render()}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;