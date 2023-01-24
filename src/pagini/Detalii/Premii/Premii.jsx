/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import useStateProvider from '../../../hooks/useStateProvider';
import styles from './Premii.module.scss';
import DropdownComponent from '../../../componente/Dropdown/Dropdown';
import ListPremii from './ListPremii/ListPremii';
import Buton from '../../../componente/Buton/Buton';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Premii = () => {
    const { user } = useAuth();
    const { divizii, fetchPremiibyFilter,
        premiiEchipa, filtruPremii, setFiltruPremii } = useStateProvider();

    const navigate = useNavigate();

    let Divizii = [];

    useEffect(() => {
        divizii?.map(divizie =>
            Divizii.push({ value: `${divizie.denumireDivizie}`, label: `${divizie.denumireDivizie}` })
        )
    }, [divizii, Divizii]);



    useEffect(() => {
        fetchPremiibyFilter();
    }, [filtruPremii.divizie]);


    // pagination - current page with the content displayed
    const { pageSizePremiiEchipa, paginaCurentaPremiiPersonal } = useStateProvider();

    const currentTablePremii = useMemo(() => {
        if (premiiEchipa) {
            const firstPageIndex = (paginaCurentaPremiiPersonal - 1) * pageSizePremiiEchipa;
            const lastPageIndex = firstPageIndex + pageSizePremiiEchipa;
            if (premiiEchipa?.length < lastPageIndex && (lastPageIndex - premiiEchipa?.length) > 0)
                return premiiEchipa?.slice(firstPageIndex, lastPageIndex - (lastPageIndex - premiiEchipa?.length));
            else
                return premiiEchipa?.slice(firstPageIndex, lastPageIndex);
        }
        else
            return null;
    }, [pageSizePremiiEchipa, paginaCurentaPremiiPersonal, premiiEchipa]);

    return (
        <div className={styles.containerPersonal}>
            <h3 className={styles.title}>Premii</h3>
            <div className={styles.navigation}>
                <div className={styles.titluDivizie}>
                    <span className={styles.linie1} />
                    <span>
                        <h1 className={styles.divizie}>Echipa</h1>
                        <h1 className={styles.divizie}>{filtruPremii.divizie}</h1>
                    </span>
                    <span className={styles.linie2} />
                </div>
            </div>
            <div className={styles.bodyPersonal}>
                <div className={styles.userAdmin}>
                    <span>Caută după:</span>
                    <span className={styles.linie1} />
                    {user?.role === 'Administrator' &&
                        <Buton
                            label="Adaugă premiu"
                            className={styles.addPersonal}
                            onClick={() => {
                                navigate("/detalii/adauga/premii");
                            }}
                        />

                    }
                </div>
                <div className={styles.filtre}>
                    <div className={styles.ddContainer}>
                        <p className={styles.label}>Echipe</p>
                        <DropdownComponent
                            title={filtruPremii.divizie}
                            options={Divizii}
                            style={{ width: '250px !important' }}
                            onChange={(e) => {
                                setFiltruPremii({ ...filtruPremii, divizie: e.value })
                                // setFiltruDivizie(e.value)
                            }}
                        ></DropdownComponent>

                    </div>

                </div>
                <div>
                    <ListPremii currentTableData={currentTablePremii} fullData={premiiEchipa} numeEchipa={filtruPremii.divizie} />
                </div>
            </div>
        </div >
    );
};

export default Premii;