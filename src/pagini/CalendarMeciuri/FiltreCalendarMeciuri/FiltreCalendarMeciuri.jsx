import React, { useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import Buton from '../../../componente/Buton/Buton';
import { getMeciuriByFilter } from '../../../api/API';
import useStateProvider from '../../../hooks/useStateProvider';
import styles from './FiltreCalendarMeciuri.module.scss';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { BsFillFilterCircleFill } from 'react-icons/bs';
import Popup from '../../PaginaPrincipala/Popup';
import { Col, Row } from 'react-bootstrap';

const FiltreCalendarMeciuri = () => {

    const { filtruMeciuri, setFiltruMeciuri, editii } = useStateProvider();
    const { width } = useWindowDimensions();
    const [openPopup, setOpenPopup] = useState(false);
    const [filtruContent, setFiltruContent] = useState(1);

    //popup
    const togglePopup = (props) => {
        setOpenPopup(!openPopup);
    };

    const handleFilter = async () => {
        try {
            await getMeciuriByFilter(filtruMeciuri);
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <>
            {width >= 550 ?
                <div className={styles.containerFiltre}>
                    <h3 className={styles.titlu}>Filtre</h3>
                    {editii &&
                        <div className={styles.filtruMeciuri}>
                            <h5>Tip de campionat</h5>
                            <div>
                                {editii?.map(editieCampionat => (
                                    <div key={editieCampionat.idEditie}>
                                        <label>
                                            <input
                                                type='radio'
                                                value={editieCampionat.idEditie}
                                                checked={filtruMeciuri.editieId === editieCampionat.idEditie}
                                                onChange={(e) => { handleFilter(); setFiltruMeciuri({ ...filtruMeciuri, editieId: editieCampionat.idEditie }) }}
                                            />
                                            {" "} {editieCampionat?.numeEditie}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }

                    <div className={styles.filtruMeciuri}>
                        <div>
                            {!filtruMeciuri.dataSpecifica &&
                                <>
                                    <h5>Alege zi</h5>
                                    <Calendar onChange={(e) => {
                                        handleFilter();
                                        setFiltruMeciuri({ ...filtruMeciuri, dataSpecifica: (e.getDate() < 10 ? ('0' + String(e.getDate())) : e.getDate()) + '-' + ((e.getMonth() + 1) < 10 ? ('0' + String(e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + e.getFullYear() })
                                    }} minDate={new Date(2010, 1, 1)} />
                                </>
                            }
                        </div>
                        {filtruMeciuri.dataSpecifica &&
                            <>
                                <h5>Ziua aleasă</h5>
                                <strong>{moment(filtruMeciuri.dataSpecifica, 'DD-MM-YYYY').format('DD MMMM YYYY')}</strong>
                                <Buton
                                    label="Anulează"
                                    className={styles.addMeciuri}
                                    onClick={() => {
                                        handleFilter();
                                        setFiltruMeciuri({ ...filtruMeciuri, dataSpecifica: '' });
                                    }}
                                />
                            </>
                        }
                    </div>
                </div>
                :
                <>
                    <div className={styles.filterMobile} onClick={() => { togglePopup(); }}>
                        <BsFillFilterCircleFill />
                    </div>
                    {/* POPUP filtre */}
                    {
                        openPopup && (
                            <Popup
                                filtre={true}
                                setOpenPopup={setOpenPopup}
                                openPopup={openPopup}
                                content={
                                    <div className={styles.popup}>
                                        <h3 className={styles.titlePopup}>Filtre</h3>
                                        <Row className={styles.filtre}>
                                            <Col className={`${filtruContent === 1 ? 'text-success' : 'text-muted'} d-flex justify-content-center`} onClick={() => { setFiltruContent(1) }} >Campionat</Col>
                                            <Col className={`${filtruContent === 2 ? 'text-success' : 'text-muted'} d-flex justify-content-center`} onClick={() => { setFiltruContent(2) }} >Alege zi</Col>
                                        </Row>
                                        <Row className={styles.contentFiltru}>
                                            {filtruContent === 1 ?
                                                <div className='mt-3'>
                                                    <div>
                                                        {editii?.map(editieCampionat => (
                                                            <div key={editieCampionat.idEditie}>
                                                                <label>
                                                                    <input
                                                                        type='radio'
                                                                        value={editieCampionat.idEditie}
                                                                        checked={filtruMeciuri.editieId === editieCampionat.idEditie}
                                                                        onChange={(e) => { handleFilter(); setFiltruMeciuri({ ...filtruMeciuri, editieId: editieCampionat.idEditie }); setOpenPopup(!openPopup); }}
                                                                    />
                                                                    {" "} {editieCampionat?.numeEditie}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                                :
                                                <div className='mt-3'>
                                                    <div>
                                                        {!filtruMeciuri.dataSpecifica &&
                                                            <>
                                                                <Calendar onChange={(e) => {
                                                                    handleFilter();
                                                                    setFiltruMeciuri({ ...filtruMeciuri, dataSpecifica: (e.getDate() < 10 ? ('0' + String(e.getDate())) : e.getDate()) + '-' + ((e.getMonth() + 1) < 10 ? ('0' + String(e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + e.getFullYear() });
                                                                    setOpenPopup(!openPopup);
                                                                }} minDate={new Date(2010, 1, 1)} />
                                                            </>
                                                        }
                                                    </div>
                                                    {filtruMeciuri.dataSpecifica &&
                                                        <>
                                                            <h5>Ziua aleasă</h5>
                                                            <strong>{moment(filtruMeciuri.dataSpecifica, 'DD-MM-YYYY').format('DD MMMM YYYY')}</strong>
                                                            <Buton
                                                                label="Anulează"
                                                                className={styles.addMeciuri}
                                                                onClick={() => {
                                                                    handleFilter();
                                                                    setFiltruMeciuri({ ...filtruMeciuri, dataSpecifica: '' });
                                                                    // setOpenPopup(!openPopup);
                                                                }}
                                                            />
                                                        </>
                                                    }
                                                </div>
                                            }
                                        </Row>
                                    </div>
                                }
                            />
                        )
                    }
                </>
            }
        </>
    );
};

export default FiltreCalendarMeciuri;
