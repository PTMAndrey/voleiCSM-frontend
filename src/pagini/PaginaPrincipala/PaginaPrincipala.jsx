import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe';
import parse from 'date-fns/parse'

import butonClasament from './../../assets/images/butonClasament.svg';
import useStateProvider from '../../hooks/useStateProvider';
import Layout from '../Layout/Layout';
import Partida from '../../componente/Partida/Partida';
import Header from '../../componente/Header/Header';
import Titlu from '../../componente/Titlu/Titlu';
import Carusel from '../../componente/Carusel/Carusel';
import { getMeciuriByFilter, getMeciuriByStatus } from '../../api/API';
import styles from './PaginaPrincipala.module.scss'

const PaginaPrincipala = () => {

  const { stiriPublicate, meciuriOrdonate, editii } = useStateProvider();

  const [meciViitor, setMeciViitor] = useState([]);
  const [meciRezultat, setMeciRezultat] = useState([]);
  const getMeciViitor = async () => {
    try {
      const response = await getMeciuriByStatus('VIITOR');
      response ? setMeciViitor(getUrmatorulMeci(response)) : setMeciViitor([]);

    } catch (error) { console.log(error) }
  };

  const getMeciRezultat = async () => {
    try {
      const response = await getMeciuriByStatus('REZULTAT');
      response ? setMeciRezultat(getUltimulMeci(response)) : setMeciRezultat([]);

    } catch (error) { console.log(error) }
  };

  useEffect(() => {
    // setFiltruMeciuri({status: 'VIITOR'})
    getMeciViitor();
  }, []);

  useEffect(() => {
    // setFiltruMeciuri({status: 'REZULTAT'});
    getMeciRezultat();
  }, []);

  const getUltimulMeci = (response) => {
    const format = 'd-M-y H:m'
    const parseDate = d => parse(d, format, new Date())
    const resp = (response?.sort((a, b) => parseDate(b.data) - parseDate(a.data)));
    return resp[0];
  }
  const getUrmatorulMeci = (response) => {
    const format = 'd-M-y H:m'
    const parseDate = d => parse(d, format, new Date())
    const resp = (response?.sort((a, b) => parseDate(a.data) - parseDate(b.data)));
    return resp[0];
  }

  return (
    <>
      <Header />
      <Layout>
        {/* ################  MECIURI ################ */}
        {meciViitor && <>
          <div className={styles.timelinePartida}>
            <h3 className={styles.borderTimeline}>Următorul meci în `{meciViitor?.numeEditie}`</h3>
          </div>
          <Partida data={meciViitor} className='mb-5' />
        </>}
        {meciRezultat && <>
        <div className={`mt-5 ${styles.timelinePartida}`}>
          <h3 className={styles.borderTimeline}>Ultimul meci din `{meciRezultat?.numeEditie}`</h3>
        </div>
        <Partida data={meciRezultat} />
        </>}
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