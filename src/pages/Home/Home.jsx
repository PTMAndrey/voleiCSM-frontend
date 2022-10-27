import React from 'react'
import Partida from '../../components/Partida/Partida'

import Header from "./../../components/Header/Header"
import Layout from './../../pages/Layout/Layout'

const Home = (props) => {
  return (
    <>
    <Header width={props.width} />
      <Layout>
        <Partida echipa1={"C.S.M. SUCEAVA"} echipa2={"CSA STEAUA BUCURESTI"} timeline={"Urmatorul meci"} locatie={'Sala de sport “Dumitru Bernicu”'} data={'22 octombrie 2022'} />

        <Partida echipa1={"CSA STEAUA BUCURESTI"} echipa2={"C.S.M. SUCEAVA"} timeline={"Ultimul meci"} scorCSM={1} scorAdversar={2} locatie={'Sala de sport “Dumitru Bernicu”'} data={'22 octombrie 2022'} />

        <p>Home</p>

        <p>Home</p>

        <p>Home</p>

        <p>Home</p>

        <p>Home</p>
      </Layout>
    </>
  )
}

export default Home