import React from 'react';

import Partida from '../../components/Partida/Partida';
import Header from "./../../components/Header/Header";
import Layout from './../../pages/Layout/Layout';
import Title from '../../components/Title/Title';
import Stiri from '../../components/Stiri/Stiri';
import Carousel from "../../components/Carousel/Carousel";

import butonClasament from './../../assets/images/butonClasament.svg';

import useAuth from "../../hooks/useAuth";

import Iframe from 'react-iframe';

import styles from './Home.module.scss'

const Home = (props, { showcontrols }) => {

  const { user } = useAuth();
  
  return (
    <>
      <Header width={props.width} />
      <Layout>

        {/* ################  MECIURI ################ */}

        <Partida echipa1={"C.S.M. SUCEAVA"} echipa2={"CSA STEAUA BUCURESTI"} timeline={"Urmatorul meci"} locatie={'Sala de sport “Dumitru Bernicu”'} data={'22 octombrie 2022'} />

        <Partida echipa1={"CSA STEAUA BUCURESTI"} echipa2={"C.S.M. SUCEAVA"} timeline={"Ultimul meci"} scorCSM={1} scorAdversar={2} locatie={'Sala de sport “Dumitru Bernicu”'} data={'22 octombrie 2022'} />

        {/* ################  CLASAMENT ################ */}

        <Title title="Clasament" />
        <a href="https://competitii.frvolei.eu/table/clasament-a1-masculin-22-23-faza-i" rel='noreferrer' target="_blank" className={styles.butonClasament}><img src={butonClasament} alt="Clasament oficial" /></a>
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

        {/* <Stiri title="Ultimele noutati"/> */}

        {user?.role === null ?

          <div className={styles.stiri}>
            <Carousel titluCarousel="Ultimele noutati"/>
            <h1>sideways white page!</h1>
          </div>
          : null
        }

      </Layout>
    </>
  )
}

export default Home