import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { RiEdit2Fill } from 'react-icons/ri';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { deletePersonalById } from '../../api/API';
import useAuth from '../../hooks/useAuth';
import useStateProvider from '../../hooks/useStateProvider';
import Popup from '../../pagini/PaginaPrincipala/Popup';
import styles from './Card.module.scss';

const CardPersonal = ({ data }) => {
    const { user } = useAuth();
    const [openPopup, setOpenPopup] = useState(false);
    const { setAlert, fetchPersonalbyFilter, filtruPersonal } = useStateProvider();

    const navigate = useNavigate();
    function stopPropagation(e) {
        e.stopPropagation();
    }

    const handleDelete = async () => {
        try {
            const response = await deletePersonalById(data?.id);
            if (response.status === 200) {
                togglePopup();
                fetchPersonalbyFilter(filtruPersonal);
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
    const defaultAvatar = `${require('../../assets/images/Jucator-Default.svg').default}`;
    return (
        <>
            <Card className={styles.personalContainer} onClick={() => { navigate("/personal/" + data?.id); }} >
                <div className={styles.imgContainer}>
                    <Card.Img className={`${styles.imagesDiv} ${styles.imagine}`} variant="top" src={`${data.imagine ? data.imagine : defaultAvatar}`} />
                </div><Card.Body>
                    {data ?
                        <Card.Title className={styles.alignCenter} >{data.nume + ' ' + data.prenume}</Card.Title>
                        :
                        <Card.Title className={styles.alignCenter} >Jucator</Card.Title>
                    }

                    {user?.role === 'Administrator' && data?.id && (
                        <Card.Title className={`${styles.controls}`}>
                            <div onClick={stopPropagation} className={styles.butoane}>
                                <RiEdit2Fill className={styles.edit} onClick={() => { navigate(`/personal/edit/${data?.id}`); }} />

                                <RiDeleteBinFill className={styles.delete} onClick={() => { togglePopup(); }} />
                            </div>
                        </Card.Title>
                    )}
                </Card.Body>

            </Card>
            {/* POPUP delete */}
            {
                openPopup && (
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
    )
}

export default CardPersonal