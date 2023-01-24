import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { RiEdit2Fill } from 'react-icons/ri';
import { RiDeleteBinFill } from 'react-icons/ri';
import { deletePremiubyId } from '../../../../api/API';
import useAuth from '../../../../hooks/useAuth';
import useStateProvider from '../../../../hooks/useStateProvider';
import styles from './Premiu.module.scss';
import Popup from '../../../PaginaPrincipala/Popup';

const Premiu = ({ data }) => {
    const { user } = useAuth();
    const [openPopup, setOpenPopup] = useState(false);
    const { setAlert, fetchPremiibyFilter, filtruPersonal, premiiEchipa } = useStateProvider();

    const navigate = useNavigate();
    function stopPropagation(e) {
        e.stopPropagation();
    }

    //popup
    const togglePopup = (props) => {
        setOpenPopup(!openPopup);
    };

    const handleDelete = async () => {
        try {
            const response = await deletePremiubyId(data?.id);
            if (response.status === 200) {
                togglePopup();
                fetchPremiibyFilter(filtruPersonal);
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

    return (
        <>
            <Card className={`${styles.cardPremiu} mt-5 mb-5`}>
                <Card.Body className={styles.descrierePremiu}>
                    <Col className={`${styles.coloana} ${styles.divider}`}>
                        <h4>Nume premiu</h4>
                        <Card.Text className={`${styles.text}`}>
                            {data.denumire}
                        </Card.Text>
                    </Col>
                    <Col className={`${styles.coloana} ${styles.divider}`}>
                        <h4>Locație</h4>
                        <Card.Text className={`${styles.text}`}>
                            {data.locCampionat}
                        </Card.Text>
                    </Col>
                    <Col className={`${styles.coloana}`}>
                        <h4>Anul obținerii</h4>
                        <Card.Text className={`${styles.text}`}>
                            {data.an}
                        </Card.Text>
                    </Col>

                </Card.Body>
                {user?.role === 'Administrator' && data?.id && (
                    <Card.Body className={`${styles.controls}`}>
                        <div onClick={stopPropagation} className={styles.butoane}>
                            <RiEdit2Fill className={styles.edit} onClick={() => { navigate(`/detalii/edit/premii/${data?.id}`); }} />

                            <RiDeleteBinFill className={styles.delete} onClick={() => { togglePopup(); }} />
                        </div>
                    </Card.Body>
                )}
            </Card>
            {/* POPUP delete */}
            {openPopup && (
                <Popup
                    setOpenPopup={setOpenPopup}
                    openPopup={openPopup}
                    content={
                        <div className={styles.popup}>
                            <h3 className={styles.titlePopup}>Ștergere personal</h3>
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
        </>
    );
};

export default Premiu;