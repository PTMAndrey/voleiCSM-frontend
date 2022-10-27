import React from 'react'
import Partida from '../../components/Partida/Partida'


const Home = () => {
  return (
    <>
      <Partida timeline={"Urmatorul meci"} locatie={'Sala de sport “Dumitru Bernicu”'} data={'22 octombrie 2022'}/>

      <Partida timeline={"Ultimul meci"} scorCSM={1} scorAdversar={2} locatie={'Sala de sport “Dumitru Bernicu”'} data={'22 octombrie 2022'}/>

      <p>Home</p>

      <p>Home</p>

      <p>Home</p>

      <p>Home</p>

      <p>Home</p>
    </>
  )
}

export default Home