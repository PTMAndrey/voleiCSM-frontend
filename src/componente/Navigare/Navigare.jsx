import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LogoCSM from '../../assets/images/logo csm.svg';
import styles from './Navigare.module.scss';
import useWindowDimensions from "../../hooks/useWindowDimensions"

const Navigare = (props) => {
  const { width } = useWindowDimensions();
  return (
        <Navbar key={props.expand} bg="light" expand={props.expand} className={`mb-3 border-bottom ${width <= 750 && styles.stickyNav}`}>
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
                <Nav.Link href="/"><img src={LogoCSM} className={styles.logoNavbar} alt="C.S.M. SUCEAVA - VOLEI" /></Nav.Link>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className={`justify-content-end flex-grow-1 pe-3`}>
                  <Nav.Link className={`text-black  ${styles.onHover}`} href="/noutati" >Noutăți</Nav.Link>
                  <Nav.Link className={`text-black  ${styles.onHover}`} href="/calendar">Calendar meciuri</Nav.Link>
                  <NavDropdown
                    title="Personal"className={`${styles.onHover}`}
                    id={`offcanvasNavbarDropdown-expand-${props.expand} `}
                  >
                    <NavDropdown.Item href="#action3">Pagina 1</NavDropdown.Item>
                    <NavDropdown.Item href="#action4"> Pagina 2</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">Pagina 5</NavDropdown.Item>
                  </NavDropdown>
                  
                  <Nav.Link className={`text-black  ${styles.onHover}`} href="#action6">Volei juvenil</Nav.Link>
                  
                  <Nav.Link className={`text-black  ${styles.onHover}`} href="#action7">Parteneri</Nav.Link>
                  
                  <Nav.Link className={`text-black  ${styles.onHover}`} href="#action8">Detalii</Nav.Link>
                  
                  <Nav.Link className={`text-black  ${styles.onHover}`} href="#action9">Conectare</Nav.Link>
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Buton variant="outline-success">Search</Buton>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
  );
};

export default Navigare;