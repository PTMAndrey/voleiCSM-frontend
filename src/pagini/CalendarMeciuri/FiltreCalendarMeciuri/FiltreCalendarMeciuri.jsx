import React from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import Buton from '../../../componente/Buton/Buton';
import { getMeciuriByFilter } from '../../../api/API';
import useStateProvider from '../../../hooks/useStateProvider';
import styles from './FiltreCalendarMeciuri.module.scss';

const FiltreCalendarMeciuri = () => {

    const { filtruMeciuri, setFiltruMeciuri, editii } = useStateProvider();

    const handleFilter = async () => {
        try {
            await getMeciuriByFilter(filtruMeciuri);
        } catch (e) {
            console.log(e);
        }
    }


    return (
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
    );
};

export default FiltreCalendarMeciuri;
