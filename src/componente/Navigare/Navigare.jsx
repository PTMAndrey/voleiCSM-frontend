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
                  <Nav.Link className={`text-black  ${styles.onHover}`} href="/personal">Personal</Nav.Link>              
                  <Nav.Link className={`text-black  ${styles.onHover}`} href="/parteneri">Parteneri</Nav.Link>                  
                  <Nav.Link className={`text-black  ${styles.onHover}`} href="/detalii">Detalii</Nav.Link>                  
                  <Nav.Link className={`text-black  ${styles.onHover}`} href="/conectare">Conectare</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
  );
};

export default Navigare;