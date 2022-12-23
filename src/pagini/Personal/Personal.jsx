import React, { useEffect, useMemo, useState } from 'react';
import Input from '../../componente/Input/Input';
import useStateProvider from '../../hooks/useStateProvider';
import styles from './Personal.module.scss';
import Button from '../../componente/Buton/Buton';
import DropdownComponent from '../../componente/Dropdown/Dropdown';
import ListPersonal from './ListPersonal/ListPersonal';

const Personal = () => {

    const { divizii, fetchPersonalbyFilter, filtruPersonal, setFiltruPersonal, personal } = useStateProvider();

    // const [personal, setPersonal] = useState('jucatori');

    // const [dummy, setDummy] = useState([
    //     {
    //         id:12345,
    //         nume: 'Cosmin',
    //         prenume: 'Boghean',
    //         imagine: 'https://voleiapp.blob.core.windows.net/volei/-1791400213Cosmin BOGHEAN.jpg',
    //     },
    //     {
    //         id:1234,
    //         nume: 'Cosmin',
    //         prenume: 'Boghean',
    //         imagine: 'https://voleiapp.blob.core.windows.net/volei/-1791400213Cosmin BOGHEAN.jpg',
    //     },
    //     {
    //         id:123,
    //         nume: 'Cosmin',
    //         prenume: 'Boghean',
    //         imagine: 'https://voleiapp.blob.core.windows.net/volei/-1791400213Cosmin BOGHEAN.jpg',
    //     },
    //     {
    //         id:12,
    //         nume: 'Cosmin',
    //         prenume: 'Boghean',
    //         imagine: 'https://voleiapp.blob.core.windows.net/volei/-1791400213Cosmin BOGHEAN.jpg',
    //     },
    //     {
    //         id:1,
    //         nume: 'Cosmin',
    //         prenume: 'Boghean',
    //         imagine: 'https://voleiapp.blob.core.windows.net/volei/-1791400213Cosmin BOGHEAN.jpg',
    //     },
    //     {
    //         id:21,
    //         nume: 'Cosmin',
    //         prenume: 'Boghean',
    //         imagine: 'https://voleiapp.blob.core.windows.net/volei/-1791400213Cosmin BOGHEAN.jpg',
    //     },
    //     {
    //         id:213,
    //         nume: 'Cosmin',
    //         prenume: 'Boghean',
    //         imagine: 'https://voleiapp.blob.core.windows.net/volei/-1791400213Cosmin BOGHEAN.jpg',
    //     },
    //     {
    //         id:2123,
    //         nume: 'Cosmin',
    //         prenume: 'Boghean',
    //         imagine: 'https://voleiapp.blob.core.windows.net/volei/-1791400213Cosmin BOGHEAN.jpg',
    //     },
    //     {
    //         id:1213,
    //         nume: 'Cosmin',
    //         prenume: 'Boghean',
    //         imagine: 'https://voleiapp.blob.core.windows.net/volei/-1791400213Cosmin BOGHEAN.jpg',
    //     },
    //     {
    //         id:2136,
    //         nume: 'Cosmin',
    //         prenume: 'Boghean',
    //         imagine: 'https://voleiapp.blob.core.windows.net/volei/-1791400213Cosmin BOGHEAN.jpg',
    //     },
    //     {
    //         id:21356,
    //         nume: 'Cosmin',
    //         prenume: 'Boghean',
    //         imagine: 'https://voleiapp.blob.core.windows.net/volei/-1791400213Cosmin BOGHEAN.jpg',
    //     },
    //     {
    //         id:21311,
    //         nume: 'Cosmin',
    //         prenume: 'Boghean',
    //         imagine: 'https://voleiapp.blob.core.windows.net/volei/-1791400213Cosmin BOGHEAN.jpg',
    //     },

    // ]);

    let Divizii = [];

    useEffect(() => {
        divizii.map(divizie => {
            Divizii.push({ value: `${divizie.denumireDivizie}`, label: `${divizie.denumireDivizie}` });
        })
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
    }, [filtruPersonal.tipPersonal]);

    const handleCautaPersoana = async () => {
        const resp = fetchPersonalbyFilter();
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
            <h3 className={styles.title}>Personal</h3>
            <div className={styles.navigation}>
                <div className={styles.titluDivizie}>
                    <span className={styles.linie1} />
                    <span>
                        <h1 className={styles.divizie}>{filtruPersonal.divizie}</h1>
                    </span>
                    <span className={styles.linie2} />
                </div>
                <div className={styles.filtru}>
                    <p className={filtruPersonal.tipPersonal === 'JUCATOR' ? styles.isActive : null} onClick={() => { setFiltruPersonal({ ...filtruPersonal, tipPersonal: 'JUCATOR' }) }}>Jucători</p>
                    <p className={filtruPersonal.tipPersonal === 'ANTRENOR' ? styles.isActive : null} onClick={() => { setFiltruPersonal({ ...filtruPersonal, tipPersonal: 'ANTRENOR' }) }}>Antrenori</p>
                </div>
            </div>
            <div className={styles.bodyPersonal}>
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
                            title='Alege echipa'
                            options={Divizii}
                            clearable={true}
                            onChange={(e) => {
                                e === null ?
                                    setFiltruPersonal({ ...filtruPersonal, divizie: 'A1' }) :
                                    setFiltruPersonal({ ...filtruPersonal, divizie: e.value });
                            }}
                        ></DropdownComponent>
                    </div>
                    <div>
                        <Button
                            label="Cauta"
                            className={styles.cauta}
                            onClick={() => handleCautaPersoana()}
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