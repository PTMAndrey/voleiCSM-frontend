import React from 'react';
import styles from './FiltreCalendarMeciuri.module.scss';
import { getMeciuriByFilter } from '../../../api/API';
import useStateProvider from '../../../hooks/useStateProvider';

import Calendar from 'react-calendar';

const FiltreCalendarMeciuri = (props) => {

    const { filtruMeciuri, setFiltruMeciuri } = useStateProvider();

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
            <div className={styles.filtruMeciuri}>
                <h5>Tip de campionat</h5>
                <div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value='DIVIZIAA1'
                                checked={filtruMeciuri.tipMeci === 'DIVIZIAA1'}
                                onChange={(e) => { handleFilter(); setFiltruMeciuri({ ...filtruMeciuri, tipMeci: 'DIVIZIAA1' }) }}
                            />
                            {" "} Diviza A1
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value="CUPAROMANIEI"
                                checked={filtruMeciuri.tipMeci === 'CUPAROMANIEI'}
                                onChange={(e) => { handleFilter(); setFiltruMeciuri({ ...filtruMeciuri, tipMeci: 'CUPAROMANIEI' }) }}
                            />
                            {" "}Cupa României
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value="SUPERCUPAROMANIEI"
                                checked={filtruMeciuri.tipMeci === 'SUPERCUPAROMANIEI'}
                                onChange={(e) => { handleFilter(); setFiltruMeciuri({ ...filtruMeciuri, tipMeci: 'SUPERCUPAROMANIEI' }) }}
                            />
                            {" "}Super Cupa României
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value="TURNEUPROMOVAREA1M"
                                checked={filtruMeciuri.tipMeci === 'TURNEUPROMOVAREA1M'}
                                onChange={(e) => { handleFilter(); setFiltruMeciuri({ ...filtruMeciuri, tipMeci: 'TURNEUPROMOVAREA1M' }) }}
                            />
                            {" "}Turneu Promovare A1M
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value="DIVIZIAA2VEST"
                                checked={filtruMeciuri.tipMeci === 'DIVIZIAA2VEST'}
                                onChange={(e) => { handleFilter(); setFiltruMeciuri({ ...filtruMeciuri, tipMeci: 'DIVIZIAA2VEST' }) }}
                            />
                            {" "}Divizia A2 Vest
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value="DIVIZIAA2EST"
                                checked={filtruMeciuri.tipMeci === 'DIVIZIAA2EST'}
                                onChange={(e) => { handleFilter(); setFiltruMeciuri({ ...filtruMeciuri, tipMeci: 'DIVIZIAA2EST' }) }}
                            />
                            {" "}Divizia A2 Est
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value="DIVIZIAJUNIORI"
                                checked={filtruMeciuri.tipMeci === 'DIVIZIAJUNIORI'}
                                onChange={(e) => { handleFilter(); setFiltruMeciuri({ ...filtruMeciuri, tipMeci: 'DIVIZIAJUNIORI' }) }}
                            />
                            {" "}Divizia Juniori
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value="DIVIZIACADETI"
                                checked={filtruMeciuri.tipMeci === 'DIVIZIACADETI'}
                                onChange={(e) => { handleFilter(); setFiltruMeciuri({ ...filtruMeciuri, tipMeci: 'DIVIZIACADETI' }) }}
                            />
                            {" "}Divizia Cadeti
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value="DIVIZIASPERANTE"
                                checked={filtruMeciuri.tipMeci === 'DIVIZIASPERANTE'}
                                onChange={(e) => { handleFilter(); setFiltruMeciuri({ ...filtruMeciuri, tipMeci: 'DIVIZIASPERANTE' }) }}
                            />
                            {" "}Diviza Sperante
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value="DIVIZIAMINIVOLEI"
                                checked={filtruMeciuri.tipMeci === 'DIVIZIAMINIVOLEI'}
                                onChange={(e) => { handleFilter(); setFiltruMeciuri({ ...filtruMeciuri, tipMeci: 'DIVIZIAMINIVOLEI' }) }}
                            />
                            {" "}Divizia Minivolei
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value="MECIURIAMICALE"
                                checked={filtruMeciuri.tipMeci === 'MECIURIAMICALE'}
                                onChange={(e) => { handleFilter(); setFiltruMeciuri({ ...filtruMeciuri, tipMeci: 'MECIURIAMICALE' }) }}
                            />
                            {" "}Meciuri Amicale
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type='radio'
                                value="TOATE"
                                checked={filtruMeciuri.tipMeci === 'TOATE'}
                                onChange={(e) => { handleFilter(); setFiltruMeciuri({ ...filtruMeciuri, tipMeci: 'TOATE' }) }}
                            />
                            {" "}Toate campionatele
                        </label>
                    </div>
                </div>
            </div>

            <div className={styles.filtruMeciuri}>
                <div><h5>Alege zi</h5>
                <Calendar onChange={(e) => {
                    console.log("calendar", (e.getDate() < 10 ? ('0' + String(e.getDate())) : e.getDate()) + '-' + ((e.getMonth() + 1) < 10 ? ('0' + String(e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + e.getFullYear());
                    handleFilter();
                    setFiltruMeciuri({ ...filtruMeciuri, dataSpecifica: (e.getDate() < 10 ? ('0' + String(e.getDate())) : e.getDate()) + '-' + ((e.getMonth() + 1) < 10 ? ('0' + String(e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + e.getFullYear() })
                }} minDate={new Date(2010, 1, 1)} />
            </div></div>
        </div>
    )
}

export default FiltreCalendarMeciuri
