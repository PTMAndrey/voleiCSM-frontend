/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RiEdit2Fill } from 'react-icons/ri';
import { MdAddCircleOutline } from 'react-icons/md';
import { RiDeleteBinFill } from 'react-icons/ri';
import moment from "moment";
import 'moment/locale/ro';
import { ReactComponent as AvatarDefault } from "../../../assets/images/Jucator-Default.svg";
import { deleteIstoricPosturiById, deleteRealizarePersonalaById, getPersonalById } from "../../../api/API";
import useStateProvider from "../../../hooks/useStateProvider";
import useAuth from "../../../hooks/useAuth";
import styles from "./Persoana.module.scss";
import Popup from "../../PaginaPrincipala/Popup";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { EditorState, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import '../../../styles/MyEditor.css';

const Persoana = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const { setAlert } = useStateProvider();

  // states for the details page
  const [persoana, setPersoana] = useState(null);
  // descriere - form

  const [istoricId, setIstoricId] = useState();
  const [istoricSters, setIstoricSters] = useState(false);
  const [raportCronologic, setRaportCronologic] = useState('');

  useEffect(() => {
    if (id.length < 30)
      navigate('/not-found');
  }, [id]);

  // get persoana from API
  useEffect(() => {
    (async () => {
      try {
        const response = await getPersonalById(id);
        if (response.status === 200) {
          console.log(response.data);
          setPersoana(response.data);
          // setEditorState(response.data.descriere)
        }
        else {
          setPersoana(null);
        }

      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [id, istoricSters]);

  // const contentState = persoana?.descriere ? convertFromRaw(JSON.parse(persoana?.descriere)) : null;
  // const rawContentState = contentState ? convertToRaw(contentState) : null;
  // const blocks = rawContentState ? rawContentState.blocks : null;

  // const [editorState, setEditorState] = useState(persoana?.descriere ?  EditorState.createWithContent(convertFromRaw(JSON.parse(persoana?.descriere))) : EditorState.createEmpty()) 

  // const getHtml = editorState => JSON.stringify(editorState.getCurrentContent());
  // const readOnly = false;
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty());

  useEffect(() => {
    if (persoana?.descriere) {
      const content = JSON.parse(persoana?.descriere);
      const contentState = convertFromRaw(content);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState)
    }
  }, [persoana?.descriere])

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
                  <p className={styles.dynamicField}>{persoana?.personal === 'JUCATOR' ? ('Jucator ' + post) : (post)}</p>
                </Row>
              </Col>
            </Row>
            <Row >
              <h6 className={styles.defaultField}>Descriere</h6>
              <div className="parent">
                <div className="overlay mt-3" onClick={(e) => e.stopPropagation()} > </div>
                <div className='hide-toolbar-and-disable-input' contentEditable={false}>
                  <Editor
                    editorState={editorState}
                    toolbarHidden
                    readOnly={true}

                  />
                </div>
              </div>
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
                <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Col><h4>Roluri</h4></Col>
                  {user?.role === 'Administrator' &&
                    <>
                      <Col>
                        <div className={styles.directionRow}>
                          <Tooltip title="Adaugă rol" placement="top" arrow onClick={() => { navigate(`/personal/adauga/roluri/` + persoana.id); }} >
                            <IconButton className={styles.iconStyle}>
                              <MdAddCircleOutline id='addRol' className={styles.edit} />
                            </IconButton>
                          </Tooltip>
                          {persoana?.istoricPosturi.length > 0 &&
                            <Tooltip title="Editează roluri" placement="top" arrow onClick={() => { navigate(`/personal/edit/roluri/` + persoana.id); }}>
                              <IconButton className={styles.iconStyle}>
                                <RiEdit2Fill id='deleteRol' className={styles.edit} />
                              </IconButton>
                            </Tooltip>
                          }
                        </div>
                      </Col>
                    </>
                  }

                </Row>
              </div>
              {persoana?.istoricPosturi.length > 0 ?
                <>
                  <Row className={styles.rol}>
                    <Col><p className={styles.headerRaport}>Data început</p></Col>
                    <Col><p className={styles.headerRaport}>Data sfârșit</p></Col>
                    <Col><p className={styles.headerRaport}>Post</p></Col>
                    <Col><p className={styles.quickActions}>Ștergere rapidă</p></Col>
                    <Col />
                  </Row>
                  {persoana?.istoricPosturi.map(istoric => (
                    <Row key={istoric.idIstoricPersoana} className={styles.rol}>


                      <Col>{moment(istoric.dataInceput, 'DD-MM-YYYY').format('DD MMMM YYYY')}</Col>
                      <Col>{moment(istoric.dataFinal, 'DD-MM-YYYY').format('DD MMMM YYYY')}</Col>
                      <Col>{istoric.post}</Col> <Col>
                        {user.role === 'Administrator' &&
                          <Tooltip title="Șterge rol" placement="right" arrow onClick={() => { setIstoricId(istoric.idIstoricPersoana); setRaportCronologic('rol'); togglePopup(); }}>
                            <IconButton className={styles.iconStyle}>
                              <RiDeleteBinFill className={styles.delete} />
                            </IconButton>
                          </Tooltip>
                        }
                      </Col>
                      <Col />
                    </Row>
                  ))

                  }
                </>
                :
                <div>
                  <h6>Nu deține un raport cronologic în privința rolurilor anterioare</h6>
                </div>
              }
            </Col>
          </Row>

          <Row className={styles.premii}>
            <Col>
              <div className={styles.directionRow}>
                <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Col><h4>Premii</h4> </Col>
                  {user?.role === 'Administrator' &&
                    <>
                      <Col>
                        <div className={styles.directionRow}>
                          <Tooltip title="Adaugă premiu" placement="top" arrow>
                            <IconButton className={styles.iconStyle} onClick={() => { navigate(`/personal/adauga/premii/` + persoana.id); }} >
                              <MdAddCircleOutline id='addPremiu' className={styles.edit} />
                            </IconButton>
                          </Tooltip>
                          {persoana?.realizariPersonale.length > 0 &&
                            <Tooltip title="Editează premii" placement="top" arrow onClick={() => { navigate(`/personal/edit/premii/` + persoana.id); }} >
                              <IconButton className={styles.iconStyle}>
                                <RiEdit2Fill id='deletePremiu' title="Adauga rol" className={styles.edit} />
                              </IconButton>
                            </Tooltip>
                          }
                        </div>
                      </Col>
                    </>
                  }
                </Row>
              </div>
              {persoana?.realizariPersonale.length > 0 ?
                <div>
                  <Row className={styles.premiu}>
                    <Col><p className={styles.headerRaport}>Data obținerii</p></Col>
                    <Col><p className={styles.headerRaport}>Denumire</p></Col>
                    <Col><p className={styles.quickActions}>Ștergere rapidă</p></Col>
                    <Col />
                    <Col />
                  </Row>
                  {persoana.realizariPersonale.map(istoric => (
                    <Row key={istoric.idRealizariPersonale} className={styles.premiu}>

                      <Col>{moment(istoric.dataObtinerii, 'DD-MM-YYYY').format('DD MMMM YYYY')}</Col>
                      <Col>{istoric.denumireRezultat}</Col><Col>
                        {user.role === 'Administrator' &&

                          <Tooltip title="Șterge premiu" placement="right" arrow onClick={() => { setIstoricId(istoric.idRealizariPersonale); setRaportCronologic('premiu'); togglePopup(); }}>
                            <IconButton className={styles.iconStyle}>
                              <RiDeleteBinFill className={styles.delete} />
                            </IconButton>
                          </Tooltip>
                        }
                      </Col>
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
  );
};

export default Persoana;
