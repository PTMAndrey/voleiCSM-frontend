import React, { useState, useEffect } from 'react';

import useStateProvider from '../../hooks/useStateProvider';
import Partida from '../../componente/Partida/Partida';
import Header from '../../componente/Header/Header';
import Layout from '../Layout/Layout';
import Titlu from '../../componente/Titlu/Titlu';

import Carusel from '../../componente/Carusel/Carusel';

import butonClasament from './../../assets/images/butonClasament.svg';

import Iframe from 'react-iframe';

import styles from './PaginaPrincipala.module.scss'
import { getMeciuriByFilter } from '../../api/API';

const PaginaPrincipala = () => {

  const { stiriPublicate, meciuriOrdonate } = useStateProvider();
  const [meciViitor, setMeciViitor] = useState([{
    idMeci:'1234',
    tipMeci:'Campionat',
    status:'VIITOR',
    data:'12-01-2023 15:30',
    numeAdversar: 'CSA Steaua Bucuresti',
    logoAdversar: `${require('../../assets/images/logo csm.svg').default}`,
    locatie:'Sala de sport “Dumitru Bernicu”',
    scorCSM: '',
    scorAdversar: '',
    teren:'ACASA',
  }]);
  const [meciRezultat, setMeciRezultat] = useState([{
    idMeci:'4321',
    tipMeci:'Cupa Romaniei',
    status:'REZULTAT',
    data:'12-12-2022 15:30',
    numeAdversar: 'CS Foresta Dumbraveni',
    logoAdversar: `${require('../../assets/images/logo csm.svg').default}`,
    locatie:'Sala de sport “Aurel Vlaicu”',
    scorCSM: '2',
    scorAdversar: '3',
    teren:'DEPLASARE',
  }]);
  const [filtruMeciuri, setFiltruMeciuri] = useState({
    status: 'TOATE',
    dataSpecifica: '',
  })
  const getMeciViitor = async () => {
    try {
      const response = await getMeciuriByFilter(filtruMeciuri);
      response.status === 200 ? setMeciViitor(response.data[0]) : setMeciViitor(null);

    } catch (error) { console.log(error) }
  };

  const getMeciRezultat = async () => {
    try {
      const response = await getMeciuriByFilter(filtruMeciuri);
      response.status === 200 ? setMeciViitor(response.data[0]) : setMeciRezultat(null);

    } catch (error) { console.log(error) }
  };

  useEffect(() => {
    setFiltruMeciuri({ ...filtruMeciuri, status: 'VIITOR' });
    // getMeciViitor();
  }, []);

  useEffect(() => {
    setFiltruMeciuri({ ...filtruMeciuri, status: 'REZULTAT' });
    // getMeciRezultat();
  }, []);

  return (
    <>
      <Header />
      <Layout>
        {/* ################  MECIURI ################ */}
        {/* <span className={styles.linie} /> */}
        <div className={styles.timelinePartida}>
          <h3 className={styles.borderTimeline}>Urmatorul meci</h3>
        </div>
        <Partida data={meciViitor[0]} />
        <br /><br /><br />
        <div className={styles.timelinePartida}>
          <h3 className={styles.borderTimeline}>Ultimul meci</h3>
        </div>
        <Partida data={meciRezultat[0]} />

        {/* ################  CLASAMENT ################ */}

        <Titlu title='Clasament' />
        <a href='https://competitii.frvolei.eu/table/clasament-a1-masculin-22-23-faza-i' target='_blank' rel='noreferrer' className={styles.butonClasament}><img src={butonClasament} alt='Clasament oficial' /></a>
        <div className={styles.frameCampionat}>
          <Iframe url='https://competitii.frvolei.eu/table/clasament-a1-masculin-22-23-faza-i'
            width='100%'
            height='520px'
            id=''
            className=''
            display='block'
            position='relative'
          />
        </div>

        {/* ################  ULTIMELE NOUTATI ################ */}
        {stiriPublicate?.length > 0 &&
          <div className={styles.stiri}>
            <Carusel data={stiriPublicate} titluCarousel='Ultimele noutăți' showcontrols isHomePage />
          </div>
        }




      </Layout>
    </>
  )
}

export default PaginaPrincipala