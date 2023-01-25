/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import Input from '../../componente/Input/Input';
import useStateProvider from '../../hooks/useStateProvider';
import styles from './Personal.module.scss';
import Button from '../../componente/Buton/Buton';
import DropdownComponent from '../../componente/Dropdown/Dropdown';
import ListPersonal from './ListPersonal/ListPersonal';
import Buton from '../../componente/Buton/Buton';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Personal = () => {
    const { user } = useAuth();
    const { divizii,
        fetchPersonalbyFilter,
        personal, filtruPersonal, setFiltruPersonal } = useStateProvider();

    const navigate = useNavigate();
    const [title, setTitle] = useState('Jucatori');

    let Divizii = [];

    useEffect(() => {
        divizii?.map(divizie =>
            Divizii.push({ value: `${divizie.denumireDivizie}`, label: `${divizie.denumireDivizie}` })
        )
    }, [divizii, Divizii]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltruPersonal((prev) => {
            return { ...prev, [name]: value };
        });
    };

    useEffect(() => {
        fetchPersonalbyFilter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, filtruPersonal.divizie]);

    const handleCauta = async () => {
        fetchPersonalbyFilter();
    };


    // pagination - current page with the content displayed
    const { pageSizePersonal, paginaCurentaPersonal } = useStateProvider();

    const currentTableData = useMemo(() => {
        if (personal) {
            const firstPageIndex = (paginaCurentaPersonal - 1) * pageSizePersonal;
            const lastPageIndex = firstPageIndex + pageSizePersonal;
            if (personal?.length < lastPageIndex && (lastPageIndex - personal?.length) > 0)
                return personal?.slice(firstPageIndex, lastPageIndex - (lastPageIndex - personal?.length));
            else
                return personal?.slice(firstPageIndex, lastPageIndex);
        }
        else
            return null;
    }, [pageSizePersonal, paginaCurentaPersonal, personal]);

    return (
        <div className={styles.containerPersonal}>
            <h3 className={styles.title}>Personal / {title} </h3>
            <div className={styles.navigation}>
                <div className={styles.titluDivizie}>
                    <span className={styles.linie1} />
                    <span>
                        <h1 className={styles.divizie}>Echipa</h1>
                        <h1 className={styles.divizie}>{filtruPersonal.divizie}</h1>
                    </span>
                    <span className={styles.linie2} />
                </div>
                <div className={styles.filtru}>
                    <p className={title === 'Jucatori' ? styles.isActive : null} onClick={() => { setFiltruPersonal({ ...filtruPersonal, tipPersonal: 'JUCATOR' }); setTitle('Jucatori') }}>Jucători</p>
                    <p className={title === 'Antrenori' ? styles.isActive : null} onClick={() => { setFiltruPersonal({ ...filtruPersonal, tipPersonal: 'ANTRENOR' }); setTitle('Antrenori') }}>Antrenori</p>
                </div>
            </div>
            <div className={styles.bodyPersonal}>
                <div className={styles.userAdmin}>
                    <span>Caută după:</span>
                    <span className={styles.linie1} />
                    {user?.role === 'Administrator' &&
                        <Buton
                            label="Adaugă personal"
                            className={styles.addPersonal}
                            onClick={() => {
                                navigate("/personal/adauga");
                            }}
                        />
                    }
                </div>
                <div className={styles.filtre}>
                    <div>
                        <Input
                            name="nume"
                            id="nume"
                            label="Nume"
                            placeholder="Nume"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Input
                            name="prenume"
                            id="prenume"
                            label="Prenume"
                            placeholder="Prenume"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.ddContainer}>
                        <p className={styles.label}>Echipe</p>
                        <DropdownComponent
                            title={filtruPersonal.divizie}
                            options={Divizii}
                            onChange={(e) => {
                                setFiltruPersonal({ ...filtruPersonal, divizie: e.value })
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            label="Cauta"
                            className={styles.cauta}
                            onClick={() => handleCauta()}
                        />
                    </div>
                </div>
                <div>
                    <ListPersonal currentTableData={currentTableData} fullData={personal} />
                </div>
            </div>
        </div >
    );
};

export default Personal;