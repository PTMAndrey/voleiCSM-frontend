import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { RiEdit2Fill } from 'react-icons/ri';
import { RiDeleteBinFill } from 'react-icons/ri';
import moment from 'moment';
import 'moment/locale/ro';
import useStateProvider from '../../hooks/useStateProvider';
import useAuth from '../../hooks/useAuth';
import { deleteMeciById } from '../../api/API';
import Popup from '../../pagini/PaginaPrincipala/Popup';
import styles from './Partida.module.scss';

const Partida = ({ data }) => {
    const CSMLOGO = `${require('../../assets/images/logo csm.svg').default}`;
    const [openPopup, setOpenPopup] = useState(false);
    const { user } = useAuth();

    const navigate = useNavigate();

    const { setAlert } = useStateProvider();
    const { fetchMeciuribyFilter } = useStateProvider();

    function stopPropagation(e) {
        e.stopPropagation();
    }
    // //delete announce
    const handleDelete = async () => {
        try {
            const response = await deleteMeciById(data?.id);
            if (response.status === 200) {
                togglePopup();
                fetchMeciuribyFilter();
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
    //popup
    const togglePopup = (props) => {
        setOpenPopup(!openPopup);
    };
    return (
        <div className={`${styles.containerPartida} ${data.status === 'VIITOR' ? styles.timelineViitor : styles.timelineRezultat}`} >
            <Container>
                <Row>
                    <Col md={4} xs={{ order: 1 }}>
                        <Row>
                            <Col className={styles.coloanaNumeEchipa}><p>{data.teren === 'ACASA' ? 'C.S.M. SUCEAVA' : data.numeAdversar}</p></Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className={styles.logoContainer}>
                                    <div className={styles.logoEchipa}>
                                        {data.teren === 'ACASA' ?
                                            <img src={CSMLOGO} className={styles.imagine} alt='C.S.M. SUCEAVA' />
                                            :
                                            <img src={data.logoAdversar} className={styles.imagine} alt={data.numeAdversar} />
                                        }
                                    </div>
                                </div>

                            </Col>
                        </Row>
                    </Col>
                    <Col xs={{ order: 2 }} md={4} className={styles.detaliiPartida}>
                        <Row>
                            <Col>
                                <h6>{moment(data.data, 'DD-MM-YYYY HH:mm').format('DD MMMM YYYY HH:mm')}</h6>
                            </Col>
                        </Row>


                        {data.status === 'REZULTAT' ?
                            <Row>
                                {data.teren === 'ACASA' &&
                                    <Col>
                                        <h4><b>{data.scorCSM} - {data.scorAdversar}</b></h4>
                                    </Col>
                                }
                                {data.teren === 'DEPLASARE' &&
                                    <Col>
                                        <h4><b>{data.scorAdversar} - {data.scorCSM} </b></h4>
                                    </Col>
                                }
                            </Row>
                            : null}
                        <Row>
                            <Col>
                                <h6>{data.tipdata}</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h5>{data.locatie}</h5>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={{ order: 3 }} md={4}>
                        <Row>
                            <Col className={styles.coloanaNumeEchipa}><p>{data.teren === 'DEPLASARE' ? 'C.S.M. SUCEAVA' : data.numeAdversar}</p></Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className={styles.logoContainer}>
                                    <div className={styles.logoEchipa}>
                                        {data.teren === 'DEPLASARE' ?
                                            <img src={CSMLOGO} className={styles.imagine} alt='C.S.M. SUCEAVA' />
                                            :
                                            <img src={data.logoAdversar} className={styles.imagine} alt={data.numeAdversar} />
                                        }
                                    </div>
                                </div>

                            </Col>
                        </Row>
                    </Col>
                </Row>
                {user?.role && (
                    <div onClick={stopPropagation} className={styles.controls}>
                        <RiEdit2Fill className={styles.edit} onClick={() => { console.log(`${data?.id}`); navigate(`/partida/edit/${data?.id}`); }} />

                        <RiDeleteBinFill className={styles.delete} onClick={() => togglePopup()} />
                    </div>
                )}
            </Container>
            {/* POPUP delete */}
            {
                openPopup && (
                    <Popup
                        setOpenPopup={setOpenPopup}
                        openPopup={openPopup}
                        content={
                            <div className={styles.popup}>
                                <h3 className={styles.titlePopup}>Ștergere știre</h3>
                                <p className={styles.descriptionPopup}>
                                    Această acțiune este permanentă și nu poate fi anulată.
                                </p>
                                <div className={styles.butonsPopup}>
                                    <button
                                        className={styles.deletePopup}
                                        onClick={(e) => {
                                            handleDelete(e);
                                        }
                                        }
                                    >
                                        Șterge
                                    </button>
                                    <button
                                        className={styles.backPopup}
                                        onClick={() => setOpenPopup(!openPopup)}
                                    >
                                        Anulează
                                    </button>
                                </div>
                            </div>
                        }
                    />
                )
            }
        </div>
    );
};

export default Partida