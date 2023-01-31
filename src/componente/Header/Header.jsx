import React from 'react'
import Header100 from "../../assets/images/Header.svg";
import Header10 from "../../assets/images/Header10.svg";
import Header200 from "../../assets/images/Header200.svg";
import Header300 from "../../assets/images/Header300.svg";
import Header550 from "../../assets/images/Header550.svg";
import Header750 from "../../assets/images/Header750.svg";
import Header1440 from "../../assets/images/Frame-15.svg";
import useWindowDimensions from '../../hooks/useWindowDimensions';
import styles from "./Header.module.scss";

const Header = () => {
  const { width } = useWindowDimensions();
  return (
    <>

      <header style={{ backgroundImage: (width <= 200 ? `url('${Header200}')` : (width <= 385 ? `url('${Header300}')` : (width <= 550 ? `url('${Header550}')` : (width <= 750 ? `url('${Header750}')` : `url('${Header1440}')`)))), backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height:'600px', width: '100%', display: 'block', backgroundColor:'#ebebf9' }}>
        <div className={styles.siteBanner}>
          <div className='d-flex justify-content-center align-items-center h-100 pt-5'>
            <div className={`text-white ${styles.textHeader}`}>
              <h1 className='mb-3 pt-5'><strong>C.S.M. SUCEAVA</strong></h1>
              <h4 className='mb-3'><b>ECHIPA DE VOLEI</b></h4>
              {/* <div className={styles.arrowRotate}>
                  <span><BsFillArrowDownCircleFill/></span>
                </div>*/}
              {/* <a className='btn btn-outline-light btn-lg' href='#!' role='button'>
                    Call to action
  </a> */}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header