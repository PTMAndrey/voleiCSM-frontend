import React from 'react'
import Header100 from "../../assets/images/Logo-Personal.svg";

const Header = () => {
  return (
      <header style={{ backgroundImage: `url('${Header100}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '500px', width: '100%', display:'block', backgroundColor:'#ebebf9'}}>
      </header>
  )
}

export default Header