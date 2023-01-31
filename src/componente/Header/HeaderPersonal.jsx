import React from 'react'
import HeaderMare from "../../assets/images/Logo-Personal.svg";
import Header750 from "../../assets/images/Logo-Personal750.svg";
import useWindowDimensions from '../../hooks/useWindowDimensions';

const Header = () => {
  const {width} = useWindowDimensions();
  return (
      <header style={{ backgroundImage: width > 750 ? `url('${HeaderMare}')` : `url('${Header750}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '500px', width: '100%', display:'block', backgroundColor:'#ebebf9'}}>
      </header>
  )
}

export default Header