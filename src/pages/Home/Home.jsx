import React, { useEffect, useState } from 'react';

import useAuth from '../../hooks/useAuth';
import useStateProvider from "../../hooks/useStateProvider";
import Partida from '../../components/Partida/Partida';
import Header from "./../../components/Header/Header";
import Layout from './../../pages/Layout/Layout';
import Title from '../../components/Title/Title';
import Stiri from '../../components/Stiri/Stiri';

import Carusel from '../../components/Carusel/Carusel';

import butonClasament from './../../assets/images/butonClasament.svg';

import Iframe from 'react-iframe';

import styles from './Home.module.scss'

const Home = (props, { showcontrols }) => {

  const { user } = useAuth();

  const { stiriOrdonate } = useStateProvider();


  // const [stiriSortat, setStiriSortat] = useState([]);
  // useEffect(() => {
  //   setStiriSortat(stiri?.sort((a, b) => new Date(...b.data_publicarii.split('-').reverse()) - new Date(...a.data_publicarii.split('-').reverse())));
  // }, [stiri])

  return (
    <>
      <Header screenWidth={props.screenWidth} />
      <Layout>

        {/* ################  MECIURI ################ */}

        <Partida echipa1={"C.S.M. SUCEAVA"} echipa2={"CSA STEAUA BUCURESTI"} timeline={"Următorul meci"} locatie={'Sala de sport “Dumitru Bernicu”'} data={'22 octombrie 2022'} />

        <Partida echipa1={"CSA STEAUA BUCURESTI"} echipa2={"C.S.M. SUCEAVA"} timeline={"Ultimul meci"} scorCSM={1} scorAdversar={2} locatie={'Sala de sport “Dumitru Bernicu”'} data={'22 octombrie 2022'} />

        {/* ################  CLASAMENT ################ */}

        <Title title="Clasament" />
        <a href="https://competitii.frvolei.eu/table/clasament-a1-masculin-22-23-faza-i" className={styles.butonClasament}><img src={butonClasament} alt="Clasament oficial" /></a>
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
          <Carusel stiri={stiriOrdonate} titluCarousel="Ultimele noutati" screenWidth={props.screenWidth} showcontrols isHomePage />
        </div>

        


      </Layout>
    </>
  )
}

export default Home