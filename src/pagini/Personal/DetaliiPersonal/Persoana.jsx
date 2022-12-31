import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RiEdit2Fill } from 'react-icons/ri';
import { RiDeleteBinFill } from 'react-icons/ri';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import moment from "moment";
import 'moment/locale/ro';
import { ReactComponent as AvatarDefault } from "../../../assets/images/Jucator-Default.svg";
import { deleteIstoricPosturiById, deletePersonalById, deleteRealizarePersonalaById, getPersonalById } from "../../../api/API";
import useStateProvider from "../../../hooks/useStateProvider";
import Carusel from '../../../componente/Carusel/Carusel';
import useWindowDimensions from "../../../hooks/useWindowDimensions"
import NotFound from "../../NotFound/NotFound";
import Input from "../../../componente/Input/Input";
import useAuth from "../../../hooks/useAuth";
import styles from "./Persoana.module.scss";
import Popup from "../../PaginaPrincipala/Popup";

const Persoana = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const { setAlert, filtruPersonal } = useStateProvider();

  // states for the details page
  const [persoana, setPersoana] = useState(null);

  const [istoricId, setIstoricId] = useState();
  const [istoricSters, setIstoricSters] = useState(false);
  const [raportCronologic, setRaportCronologic] = useState('');

  // get persoana from API
  useEffect(() => {
    (async () => {
      try {
        const response = await getPersonalById(id);
        if (response.status === 200) {
          setPersoana(response.data);
        }
        else {
          setPersoana(null);
        }

      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [id, istoricSters]);


  //popup
  const togglePopup = (props) => {
    setOpenPopup(!openPopup);
  };

  const handleDelete = async () => {
    try {
      let response;
      (raportCronologic === 'rol') ? response = await deleteIstoricPosturiById(istoricId)
        : response = await deleteRealizarePersonalaById(istoricId);

      if (response.status === 200) {
        togglePopup();
        setIstoricSters(true);
        setAlert({ type: 'success', message: 'Deleted' });
      }
    } catch (error) {
      togglePopup();
      setAlert({
        type: 'danger',
        message: 'Something went wrong',
      });
    }
  };


  let nationalitate, post;
  if (persoana) {
    nationalitate = String(persoana?.nationalitate)[0].toUpperCase() + String(persoana?.nationalitate).substr(1).toLowerCase();
    post = String(persoana?.post)[0] + String(persoana?.post).substr(1).toLowerCase();
  }

  return (
    <>{persoana !== null ?
      < section className={styles.container} >
        <div className={styles.numePersoana}>
          <p>{persoana !== null ? (persoana.nume + ' ' + persoana.prenume) : 'Persoana'}</p>
        </div>
        <div className={styles.persoanaBody}>
          <div className={styles.details}>
            {/* description */}
            <div>
              <Row className={styles.detaliiJucator}>
                <Col xs={{ order: 1 }} className={styles.imageResize}>
                  {persoana?.imagine ?
                    <img
                      src={persoana?.imagine}
                      className={styles.imagine}
                      alt={"[ " + persoana.personal + " ] " + persoana.nume + ' ' + persoana.prenume}
                    />
                    :
                    <img src={<AvatarDefault />} alt="Default avatar" />
                  }

                </Col>

                <Col xs={{ order: 2 }}>
                  <Row className={styles.detaliiJucatorRow}>
                    <p className={styles.defaultField}>Data nașterii</p>
                    <p className={styles.dynamicField}>{moment(persoana?.dataNasterii, 'DD-MM-YYYY').format('DD MM YYYY')}</p>
                  </Row>

                  <Row className={styles.detaliiJucatorRow}>
                    <p className={styles.defaultField}>Naționalitate</p>
                    <p className={styles.dynamicField}>{nationalitate}</p>
                  </Row>
                </Col>

                <Col xs={{ order: 3 }}>
                  <Row className={styles.detaliiJucatorRow}>
                    <p className={styles.defaultField}>Înălțime</p>
                    <p className={styles.dynamicField}>{persoana?.inaltime} m</p>
                  </Row>

                  <Row className={styles.detaliiJucatorRow}>
                    <p className={styles.defaultField}>Post</p>
                    <p className={styles.dynamicField}>{persoana.personal === 'JUCATOR' ? ('Jucator ' + post) : (post)}</p>
                  </Row>
                </Col>
              </Row>
              <Row >
                <h6 className={styles.defaultField}>Descriere</h6>
                <p className={styles.dynamicField}>{persoana?.descriere}</p>
              </Row>
            </div>
          </div>

        </div>

        <div className={styles.raportCronologic}>
          <div className={styles.titlu}>
            <span>
              <p className={styles.divizie}>Raport cronologic</p>
            </span>
            <span className={styles.linie1} />
          </div>
          <div className={styles.raport}>
            <Row className={styles.roluri}>
              <Col>
                <div className={styles.directionRow}>
                  <Row>
                    <Col><h4>Roluri</h4></Col>
                    {user.role &&
                      <Col>
                        <RiEdit2Fill id='deleteRol' className={styles.edit} onClick={() => { navigate(`/personal/edit/roluri/`+persoana.id); }} />
                      </Col>
                    }
                  </Row>
                </div>
                {persoana?.istoricPosturi.length > 0 ?
                  <>
                    <Row className={styles.rol}>
                      <Col />
                      <Col><p className={styles.headerRaport}>Data Inceput</p></Col>
                      <Col><p className={styles.headerRaport}>Data Sfarsit</p></Col>
                      <Col><p className={styles.headerRaport}>Post</p></Col>
                      <Col />
                      <Col />
                    </Row>
                    {persoana?.istoricPosturi.map(istoric => (
                      <Row key={istoric.idIstoricPersoana} className={styles.rol}>
                        <Col>
                          {user.role &&
                            <RiDeleteBinFill className={styles.delete} onClick={() => { setIstoricId(istoric.idIstoricPersoana); setRaportCronologic('rol'); togglePopup(); }} />
                          }
                        </Col>

                        <Col>{istoric.dataInceput}</Col>
                        <Col>{istoric.dataFinal}</Col>
                        <Col>{istoric.post}</Col>
                        <Col />
                        <Col />
                      </Row>
                    ))

                    }
                  </>
                  :
                  <>
                    <h6>Nu deține un raport cronologic în privința rolurilor anterioare</h6>
                  </>
                }
              </Col>
            </Row>

            <Row className={styles.premii}>
              <Col>

                <div className={styles.directionRow}>
                  <Row>
                    <Col><h4>Premii</h4></Col>

                    {user.role &&
                      <Col>
                        <RiEdit2Fill id='deletePremiu' className={styles.edit} onClick={() => { navigate(`/personal/edit/premii/`+persoana.id); }} />
                      </Col>
                    }
                  </Row>
                </div>
                {persoana?.realizariPersonale.length > 0 ?
                  <div>
                    <Row className={styles.premiu}>
                      <Col>
                      </Col>

                      <Col><p className={styles.headerRaport}>Data obtinerii</p></Col>
                      <Col><p className={styles.headerRaport}>Denumire</p></Col>
                      <Col />
                      <Col />
                      <Col />
                    </Row>
                    {persoana.realizariPersonale.map(istoric => (
                      <Row key={istoric.idRealizariPersonale} className={styles.premiu}>
                        <Col>
                          {user.role &&
                            <RiDeleteBinFill className={styles.delete} onClick={() => { setIstoricId(istoric.idRealizariPersonale); setRaportCronologic('premiu'); togglePopup(); }} />
                          }
                        </Col>
                        <Col>{istoric.dataObtinerii}</Col>
                        <Col>{istoric.denumireRezultat}</Col>
                        <Col />
                        <Col />
                        <Col />
                      </Row>
                    ))

                    }
                  </div>
                  :
                  <div>
                    <h6>Nu deține un raport cronologic în privința premiilor pe care le deține</h6>
                  </div>
                }
              </Col>
            </Row>
          </div>

        </div>
        {/* POPUP delete */}
        {
          openPopup && (
            <Popup
              setOpenPopup={setOpenPopup}
              openPopup={openPopup}
              content={
                <div className={styles.popup}>
                  <h3 className={styles.titlePopup}>Ștergere {raportCronologic}</h3>
                  <p className={styles.descriptionPopup}>
                    Această acțiune este permanentă și nu poate fi anulată.
                  </p>
                  <div className={styles.butonsPopup}>
                    <button
                      className={styles.deletePopup}
                      onClick={(e) => { handleDelete(e); }}
                    >
                      Șterge
                    </button>
                    <button
                      className={styles.backPopup}
                      onClick={() => { setOpenPopup(!openPopup); }}
                    >
                      Anulează
                    </button>
                  </div>
                </div>
              }
            />
          )
        }
      </section >

      :
      <NotFound />
    }</>
  );
};

export default Persoana;