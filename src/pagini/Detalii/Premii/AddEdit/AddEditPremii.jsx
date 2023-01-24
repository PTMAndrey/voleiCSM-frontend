/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Calendar } from 'react-calendar';

import { updateMeci, getMeciById, addMeci, getPremiuById, addPremiu, updatePremiu } from '../../../../api/API';
import useStateProvider from '../../../../hooks/useStateProvider';
import Popup from '../../../PaginaPrincipala/Popup';
import Input from '../../../../componente/Input/Input';
import Buton from '../../../../componente/Buton/Buton';
import DropdownComponent from '../../../../componente/Dropdown/Dropdown';
import styles from './AddEditPremii.module.scss';
import moment from 'moment/moment';

const AddEditPremii = () => {
    const navigate = useNavigate();
    const { editii, divizii, echipe, setAlert } = useStateProvider();
    const { id } = useParams();

    const [showErrors, setShowErrors] = useState(false);

    const [disabledButton, setDisabledButton] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const togglePopup = () => {
        setOpenPopup(!openPopup);
    };
    const [formValue, setFormValue] = useState({
        id: '',
        denumire: '',
        locCampionat: '',
        an: '',
        idEditie: '',
        idDivizie: '',
        numeDivizie: '',
    });

    const getPremiu = async () => {
        const response = await getPremiuById(id);
        if (response?.status === 200) {
            setFormValue({
                id: response.data.id,
                denumire: response.data.denumire,
                locCampionat: response.data.locCampionat,
                an: response.data.an,
                idEditie: response.data.idEditie,
                idDivizie: response.data.idDivizie,
                numeDivizie: response.data.numeDivizie,
            });
            console.log('edit', response.data);
        }
    };

    useEffect(() => {
        if (id) {
            getPremiu();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (id && !formValue) {
            navigate('/not-found')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);



    // eslint-disable-next-line react-hooks/exhaustive-deps
    let Editii = [];
    useEffect(() => {
        editii?.map(editie =>
            Editii.push({ value: `${editie.idEditie}`, label: `${editie.numeEditie}` })
        )
    }, [editii, Editii]);


    let Divizii = [];

    useEffect(() => {
        divizii?.map(divizie =>
            Divizii.push({ value: `${divizie.idDivizie}`, label: `${divizie.denumireDivizie}` })
        )
    }, [divizii, Divizii]);


    //------------------------------- HANDLERE

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = async () => {
        if (!isFormValid()) {
            setShowErrors(true);
            setDisabledButton(false);
            setAlert({ type: 'danger', message: 'Câmpurile trebuie completate!' });
        }
        if (isFormValid()) {
            setShowErrors(false);
            try {
                setDisabledButton(true);
                const response = await addPremiu(formValue);

                if (response.status === 200) {
                    navigate('/detalii/premii');
                    setAlert({ type: 'success', message: 'Premiul a fost publicat' });
                }
                else {
                    setDisabledButton(false);
                    setAlert({ type: 'danger', message: 'Eroare la trimiterea datelor!' });
                }

            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleUpdate = async () => {
        if (!isFormValid()) {
            setDisabledButton(false);
            setShowErrors(true);
            setAlert({ type: 'danger', message: 'Câmpurile trebuie completate!' });
        }
        if (isFormValid()) {
            setShowErrors(false);
            try {
                setDisabledButton(true);
                const response = await updatePremiu(formValue);
                if (response?.status === 200) {
                    navigate('/detalii/premii');
                }
                else {
                    setDisabledButton(false);
                    setAlert({ type: 'danger', message: 'Eroare la actualizarea datelor!' });
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    //-------------------------------- VALIDARI
    // check errors
    const checkErrors = (field) => {

        if (field === 'denumire') {
            if (formValue.denumire.length > 0 && formValue.denumire.length < 5) {
                return 'Denumirea premiului trebuie sa conțină cel puțin 5 caractere!';
            } else if (formValue.denumire.length > 50) {
                return 'Denumirea premiului trebuie să conțină maxim 50 de caractere!';
            } else if (formValue.denumire.length === 0) {
                return 'Denumirea premiului este obligatorie!';
            }
        }

        if (field === 'locCampionat') {
            if (formValue.locCampionat.length > 0 && formValue.locCampionat.length < 5) {
                return 'Locatia trebuie sa conțină cel puțin 5 caractere!';
            } else if (formValue.locCampionat.length > 50) {
                return 'Locatia trebuie să conțină maxim 50 de caractere!';
            } else if (formValue.locCampionat.length === 0) {
                return 'Locatia este obligatorie!';
            }
        }

        if (field === 'an') {
            if (!formValue.an)
                return 'Anul obtinerii este obligatoriu!';
        }

        if (field === 'idEditie') {
            if (!formValue.idEditie)
                return 'Selectati editia!';
        }

        if (field === 'idDivizie') {
            if (!formValue.idDivizie)
                return 'Selectati echipa!';
        }


        return '';
    };

    // check if form is valid
    const isFormValid = () => {
        let isValid = true;
        Object.keys(formValue).forEach((field) => {
            if (checkErrors(field)) {
                isValid = false;
            }
        });
        return isValid;
    };

    return (
        <Container>
            {id ? <h1 className={styles.addTitlu}>Editare premiu</h1> :
                <h1 className={styles.addTitlu}>Adăugare premiu</h1>}
            <Row className='mt-5'>
                <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
                    <div className={styles.info}>
                        <h3>Echipa *</h3>
                    </div>
                </Col>
                <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
                    <div className={styles.inputs}>
                        <DropdownComponent
                            title={id ? formValue.idDivizie ? formValue.numeDivizie : 'Alege echipa' : 'Alege echipa'}
                            options={Divizii}
                            onChange={(e) => {
                                setFormValue({ ...formValue, idDivizie: e.value });
                            }}
                            error={showErrors && checkErrors('idDivizie') ? true : false}
                            helper={showErrors ? checkErrors('idDivizie') : ''}
                        />
                    </div>
                </Col>
            </Row>

            <Row className='mt-5'>
                <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
                    <div className={styles.info}>
                        <h3>Campionat *</h3>
                    </div>
                </Col>
                <Col md={{ span: 6, offset: 0 }} className={styles.bottomBorder}>
                    <div className={styles.inputs}>
                        <DropdownComponent
                            title={id ? formValue.idEditie ? formValue.numeEditie: 'Alege campionat' : 'Alege campionat'}
                            options={Editii}
                            onChange={(e) => {
                                setFormValue({ ...formValue, idEditie: e.value });
                            }}
                            error={showErrors && checkErrors('idEditie') ? true : false}
                            helper={showErrors ? checkErrors('idEditie') : ''}
                        />
                    </div>
                </Col>
            </Row>

            <Row className='mt-5'>
                <Col md={{ span: 4, offset: 0 }} className={styles.bottomBorder}>
                    <div className={styles.info}>
                        <h3>Detalii *</h3>
                    </div>
                </Col>
                <Col md={{ span: 8, offset: 0 }} className={styles.bottomBorder}>
                    <div className={styles.publicare}>

                        <Input
                            name='denumire'
                            id='denumire'
                            value={formValue.denumire}
                            label='Nume premiu'
                            placeholder='Nume premiu'
                            onChange={handleChange}
                            error={showErrors && checkErrors('denumire') ? true : false}
                            helper={showErrors ? checkErrors('denumire') : ''}
                        />

                        <Input
                            name='locCampionat'
                            id='locCampionat'
                            value={formValue.locCampionat}
                            label='Locatie'
                            placeholder='Locatie'
                            onChange={handleChange}
                            error={showErrors && checkErrors('locCampionat') ? true : false}
                            helper={showErrors ? checkErrors('locCampionat') : ''}
                        />
                        <Input
                            name='an'
                            id='an'
                            value={formValue.an}
                            label='Anul obtinerii'
                            placeholder='Ex: 2022-2023'
                            onChange={handleChange}
                            error={showErrors && checkErrors('an') ? true : false}
                            helper={showErrors ? checkErrors('an') : ''}
                        />
                    </div>
                </Col>
            </Row>

            <Row className='mt-5 mb-5'>
                <Col md={{ span: 5, offset: 0 }}></Col>
                <Col md={{ span: 5, offset: 0 }}>
                    <Row>
                        <Col sm={{ span: 4, offset: 0 }}>
                            <Buton
                                variant='primary'
                                disabled={disabledButton}
                                label={id ? 'Actualizează' : 'Publică'}
                                onClick={() => {
                                    if (id) handleUpdate(); else handleSubmit();
                                }} />
                        </Col>
                        <Col sm={{ span: 4, offset: 2 }} className={styles.phoneResolutionMarginTop}>
                            <Buton
                                variant='destructive'
                                disabled={disabledButton}
                                label='Anulează'
                                onClick={() => togglePopup()}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {openPopup && (
                <Popup
                    setOpenPopup={setOpenPopup}
                    openPopup={openPopup}
                    content={
                        <div className={styles.popup}>
                            <h3 className={styles.titlePopup}>Confirmare acțiuni efectuate</h3>
                            <p className={styles.descriptionPopup}>
                                Această acțiune este permanentă și nu poate fi anulată.
                            </p>
                            <div className={styles.butonsPopup}>
                                <button
                                    className={styles.backPopup}
                                    onClick={() => { navigate(-1) }}
                                >
                                    Confirm
                                </button>
                                <button
                                    className={styles.deletePopup}
                                    onClick={() => { togglePopup(); }}
                                >
                                    Renunț
                                </button>
                            </div>
                        </div>
                    }
                />
            )
            }
        </Container >
    );
};

export default AddEditPremii;