import React, {} from 'react';

import useStateProvider from "../../hooks/useStateProvider";
import Partida from '../../components/Partida/Partida';
import Header from "../../components/Header/Header";
import Layout from '../Layout/Layout';
import Title from '../../components/Title/Title';

import Carusel from '../../components/Carusel/Carusel';

import butonClasament from './../../assets/images/butonClasament.svg';

import Iframe from 'react-iframe';

import styles from './PaginaPrincipala.module.scss'

const PaginaPrincipala = (props) => {

  const { stiriPublicate } = useStateProvider();

  return (
    <>
      <Header screenWidth={props.screenWidth} />
      <Layout>

        {/* ################  MECIURI ################ */}

        <Partida echipa1={"C.S.M. SUCEAVA"} echipa2={"CSA STEAUA BUCURESTI"} timeline={"Următorul meci"} locatie={'Sala de sport “Dumitru Bernicu”'} data={'22 octombrie 2022'} />

        <Partida echipa1={"CSA STEAUA BUCURESTI"} echipa2={"C.S.M. SUCEAVA"} timeline={"Ultimul meci"} scorCSM={1} scorAdversar={2} locatie={'Sala de sport “Dumitru Bernicu”'} data={'22 octombrie 2022'} />

        {/* ################  CLASAMENT ################ */}

        <Title title="Clasament" />
        <a href="https://competitii.frvolei.eu/table/clasament-a1-masculin-22-23-faza-i" target="_blank" rel="noreferrer" className={styles.butonClasament}><img src={butonClasament} alt="Clasament oficial" /></a>
        <div className={styles.frameCampionat}>
          <Iframe url="https://competitii.frvolei.eu/table/clasament-a1-masculin-22-23-faza-i"
            width="100%"
            height="520px"
            id=""
            className=''
            display="block"
            position="relative"
          />
        </div>

        {/* ################  ULTIMELE NOUTATI ################ */}

        <div className={styles.stiri}>
          <Carusel data={stiriPublicate} titluCarousel="Ultimele noutăți" screenWidth={props.screenWidth} showcontrols isHomePage />
        </div>




      </Layout>
    </>
  )
}

export default PaginaPrincipala