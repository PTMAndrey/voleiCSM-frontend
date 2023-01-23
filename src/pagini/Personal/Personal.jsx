import React, { useEffect, useMemo, useState } from 'react';
import Input from '../../componente/Input/Input';
import useStateProvider from '../../hooks/useStateProvider';
import styles from './Personal.module.scss';
import Button from '../../componente/Buton/Buton';
import DropdownComponent from '../../componente/Dropdown/Dropdown';
import ListPersonal from './ListPersonal/ListPersonal';
import ListPremii from './ListPremii/ListPremii';
import Buton from '../../componente/Buton/Buton';
import { useNavigate } from 'react-router-dom';
import { userInfo } from 'os';
import { Col } from "react-bootstrap";
import useAuth from '../../hooks/useAuth';

const Personal = () => {
    const { user } = useAuth();
    const { divizii, fetchPersonalbyFilter, filtruPersonal, setFiltruPersonal, personal } = useStateProvider();
    const navigate = useNavigate();
    const [filtruDivizie, setFiltruDivizie] = useState('A1');
    const [premiiEchipa, setPremiiEchipa] = useState('');

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
    }, [filtruPersonal.tipPersonal]);

    const handleCautaPersoana = async () => {
        setFiltruDivizie(filtruPersonal.divizie);
        const resp = fetchPersonalbyFilter();
    };


    // pagination - current page with the content displayed
    const { pageSizePersonal, paginaCurentaPersonal, pageSizePremiiEchipa, paginaCurentaPremiiPersonal } = useStateProvider();

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

    // const currentTablePremii = useMemo(() => {
    //     if (personal) {
    //         const firstPageIndex = (paginaCurentaPremiiPersonal - 1) * pageSizePremiiEchipa;
    //         const lastPageIndex = firstPageIndex + pageSizePremiiEchipa;
    //         if (personal?.length < lastPageIndex && (lastPageIndex - personal?.length) > 0)
    //             return personal?.slice(firstPageIndex, lastPageIndex - (lastPageIndex - personal?.length));
    //         else
    //             return personal?.slice(firstPageIndex, lastPageIndex);
    //     }
    //     else
    //         return null;
    // }, [pageSizePremiiEchipa, paginaCurentaPremiiPersonal, personal]);

    return (
        <div className={styles.containerPersonal}>
            <h3 className={styles.title}>Personal</h3>
            <div className={styles.navigation}>
                <div className={styles.titluDivizie}>
                    <span className={styles.linie1} />
                    <span>
                        <h1 className={styles.divizie}>Echipa</h1>
                        <h1 className={styles.divizie}>{filtruDivizie}</h1>
                    </span>
                    <span className={styles.linie2} />
                </div>
                <div className={styles.filtru}>
                    <p className={filtruPersonal.tipPersonal === 'JUCATOR' && !premiiEchipa ? styles.isActive : null} onClick={() => { setFiltruPersonal({ ...filtruPersonal, tipPersonal: 'JUCATOR' }); setPremiiEchipa('') }}>Jucători</p>
                    <p className={filtruPersonal.tipPersonal === 'ANTRENOR' && !premiiEchipa ? styles.isActive : null} onClick={() => { setFiltruPersonal({ ...filtruPersonal, tipPersonal: 'ANTRENOR' }); setPremiiEchipa('') }}>Antrenori</p>
                    <p className={premiiEchipa === 'PREMII' ? styles.isActive : null} onClick={() => { setPremiiEchipa('PREMII') }}>Premii</p>
                </div>
            </div>
            <div className={styles.bodyPersonal}>
                <div className={styles.userAdmin}>
                    {!premiiEchipa && <span>Caută după:</span>}
                    <span className={styles.linie1} />
                    {user?.role === 'Administrator' && !premiiEchipa &&
                        <Buton
                            label="Adaugă personal"
                            className={styles.addPersonal}
                            onClick={() => {
                                navigate("/personal/adauga");
                            }}
                        />
                    }
                    {user?.role === 'Administrator' && premiiEchipa &&
                        <Buton
                            label="Adaugă premiu"
                            className={styles.addPersonal}
                            onClick={() => {
                                navigate("/personal/adauga/premii");
                            }}
                        />

                    }
                </div>
                <div className={styles.filtre}>
                    {!premiiEchipa ? <>
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
                    </>
                        : <>
                            <Col />
                            <Col />
                        </>
                    }
                    <div className={styles.ddContainer}>
                        <p className={styles.label}>Echipe</p>
                        <DropdownComponent
                            title='Alege echipa'
                            options={Divizii}
                            // clearable={true}
                            onChange={(e) => {
                                e === null ?
                                    setFiltruPersonal({ ...filtruPersonal, divizie: 'A1' }) :
                                    setFiltruPersonal({ ...filtruPersonal, divizie: e.value });
                            }}
                        ></DropdownComponent>
                    </div>
                    {premiiEchipa ? <div className='mr-5'/> : null}
                    <div>
                        <Button
                            label="Cauta"
                            className={styles.cauta}
                            onClick={() => handleCautaPersoana()}
                        />
                    </div>
                </div>
                {/* {premiiEchipa ?
                    <div>
                        <ListPremii currentTableData={currentTablePremii} fullData={premii} />
                        <ListPremii currentTableData={currentTablePremii} fullData={personal} />
                    </div>
                    : */}
                    <div>
                        <ListPersonal currentTableData={currentTableData} fullData={personal} />
                    </div>
                {/* } */}
            </div>
        </div >
    );
};

export default Personal;