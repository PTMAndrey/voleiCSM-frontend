import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LogoCSM from '../../assets/images/logo csm.svg';
import styles from './Navigation.module.scss';


const Navigation = (props) => {
  return (
        <Navbar key={props.expand} bg="light" expand={props.expand} className="mb-3 border-bottom">
          <Container fluid>
            <Navbar.Brand href="/"><img src={LogoCSM} className={styles.logoNavbar} alt="C.S.M. SUCEAVA - VOLEI" /></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${props.expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${props.expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${props.expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${props.expand}`}>
                <Nav.Link href="/"><img src={LogoCSM} className={styles.logoNabvar} alt="C.S.M. SUCEAVA - VOLEI" /></Nav.Link>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Noutati</Nav.Link>
                  <Nav.Link href="#action2">Calendar meciuri</Nav.Link>
                  <NavDropdown
                    title="Personal"
                    id={`offcanvasNavbarDropdown-expand-${props.expand}`}
                  >
                    <NavDropdown.Item href="#action3">Pagina 1</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Pagina 2
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Pagina 5
                    </NavDropdown.Item>
                  </NavDropdown>
                  
                  <Nav.Link href="#action6">Volei juvenil</Nav.Link>
                  
                  <Nav.Link href="#action7">Parteneri</Nav.Link>
                  
                  <Nav.Link href="#action8">Detalii</Nav.Link>
                  
                  <Nav.Link href="#action9">Conectare</Nav.Link>
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
  );
};

export default Navigation;