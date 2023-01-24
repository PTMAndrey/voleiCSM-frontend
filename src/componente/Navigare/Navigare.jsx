import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LogoCSM from '../../assets/images/Logo-CSM.svg';
import styles from './Navigare.module.scss';
import useWindowDimensions from "../../hooks/useWindowDimensions"
import useAuth from '../../hooks/useAuth';
import { Dropdown } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logout } from "../../assets/icons/logout.svg";

const Navigare = (props) => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/');
  }
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
          <Offcanvas.Body >
            <Nav className={`justify-content-end flex-grow-1 pe-3 d-flex align-items-center`}>
              <Nav.Link className={`text-black  ${styles.onHover}`} href="/noutati" >Noutăți</Nav.Link>
              <Nav.Link className={`text-black  ${styles.onHover}`} href="/calendar">Calendar meciuri</Nav.Link>
              <Nav.Link className={`text-black  ${styles.onHover}`} href="/personal">Personal</Nav.Link>
              <Nav.Link className={`text-black  ${styles.onHover}`} href="/parteneri">Parteneri</Nav.Link>
              {/* <Nav.Link className={`text-black  ${styles.onHover}`} href="/detalii">Detalii</Nav.Link> */}
              <NavDropdown
                  title={"Detalii"}
                  className={`text-black  ${styles.onHover}`}
                  id={`offcanvasNavbarDropdown-expand-${props.expand}`}
                >
                  <NavDropdown.Item className={styles.hello} href='/detalii/viziune'>
                    Viziune
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className={styles.hello} href='/detalii/istorie'>
                    Istorie
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className={styles.hello} href='/detalii/premii'>
                    Premii
                  </NavDropdown.Item>
                </NavDropdown>
              {!user ?
                <Nav.Link className={`text-black  ${styles.onHover}`} href="/login">Conectare</Nav.Link>
                :
                <NavDropdown
                  title={<div className={styles.profile}>
                    <div className={styles.photoDiv}>
                      <img
                        src={user?.photo}
                        alt=""
                        className={styles.userPhoto}
                      />
                    </div>
                    {user?.nume}
                  </div>}
                  className={`${styles.profileTitle} `}
                  id={`offcanvasNavbarDropdown-expand-${props.expand}`}
                >
                  <NavDropdown.Item className={styles.hello}>
                    {'Hello, ' + user.prenume}
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={handleLogout}
                      className={styles.profileOption}
                    >
                      <Logout className={styles.logout} />
                      Logout
                  </NavDropdown.Item>
                </NavDropdown>
              }
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Navigare;