/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe';
import parse from 'date-fns/parse'
import { BiRefresh } from 'react-icons/bi';
import butonClasament from './../../assets/images/butonClasament.svg';
import Primaria from './../../assets/images/Primaria.svg';
import SUCT from './../../assets/images/SUCT.svg';
import Bucovina from './../../assets/images/Bucovina.svg';
import Bazzil from './../../assets/images/Bazzil.svg';
import Assist from './../../assets/images/Assist.svg';
import Celestin from './../../assets/images/Celestin.svg';
import useStateProvider from '../../hooks/useStateProvider';
import Layout from '../Layout/Layout';
import Partida from '../../componente/Partida/Partida';
import Header from '../../componente/Header/Header';
import Titlu from '../../componente/Titlu/Titlu';
import Carusel from '../../componente/Carusel/Carusel';
import CaruselPersonal from '../../componente/Carusel/CaruselPersonal';
import { getMeciuriByStatus } from '../../api/API';
import styles from './PaginaPrincipala.module.scss'

const PaginaPrincipala = () => {
  const { stiriPublicate, personal } = useStateProvider();

  const [meciViitor, setMeciViitor] = useState([]);
  const [meciRezultat, setMeciRezultat] = useState([]);
  const [iframe, setIframe] = useState({ url: 'https://competitii.frvolei.eu/table/clasament-a1-masculin-22-23-faza-i', key: 0 })



  const getMeciViitor = async () => {
    try {
      const response = await getMeciuriByStatus('VIITOR');
      response ? setMeciViitor(getUrmatorulMeci(response)) : setMeciViitor(null);

    } catch (error) { console.log(error) }
  };

  const getMeciRezultat = async () => {
    try {
      const response = await getMeciuriByStatus('REZULTAT');
      response ? setMeciRezultat(getUltimulMeci(response)) : setMeciRezultat(null);

    } catch (error) { console.log(error) }
  };

  useEffect(() => {
    getMeciViitor();
  }, []);

  useEffect(() => {
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

  const iframeRefresh = () => {
    setIframe({ ...iframe, key: iframe.key + 1 });
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
        <div>
          <a href={iframe.url} target='_blank' rel='noreferrer' className={styles.butonClasament}>
            <img src={butonClasament} alt='Clasament oficial' />
          </a>
          <BiRefresh className={styles.butonRefresh} style={{width:'80px'}} onClick={() => { iframeRefresh(); }} />
        </div>
        <div key={iframe.key} className={styles.frameCampionat}>
          <Iframe
            url={iframe.url}
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
            <Carusel data={stiriPublicate} titluCarousel='Ultimele noutăți' caruselPopup={true} />
          </div>
        }
        {/* ################  PERSONAL ################ */}
        {personal?.length > 0 &&
          <div className={styles.personal}>
            <CaruselPersonal data={personal} titluCarousel='Întâlnește echipa' caruselPopup={true} />
          </div>
        }

        <div className={styles.parteneri}>
          <h3>Parteneri</h3>
          <div className={styles.bgParteneri}>
            <div className={styles.img3}>
              <img src={Primaria} alt='' />
              <img src={SUCT} alt='' />
              <img src={Bucovina} alt='' />
            </div>
            <div className={styles.img3}>
              <img src={Bazzil} alt='' />
              <img src={Assist} alt='' />
              <img src={Celestin} alt='' />
            </div>

          </div>
        </div>

      </Layout>
    </>
  )
}

export default PaginaPrincipala