import React from 'react'
import Header100 from "../../assets/images/Header5.svg";
import styles from "./Header.module.scss";


const Header = ({width}) => {
  return (
    <>
    {width }
      <header style={{ backgroundImage: `url('${Header100}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '600px', width: '100%', display:'block'}}>
        <div className={styles.siteBanner}>
          <div className='d-flex justify-content-center align-items-center h-100 pt-5'>
            <div className={`text-white ${styles.textHeader}`}>
              <h1 className='mb-3 pt-5'><strong>C.S.M. SUCEAVA</strong></h1>
              <h4 className='mb-3'><b>ECHIPA DE VOLEI</b></h4>
              {/* <div className={styles.arrowRotate}>
                  <span><BsFillArrowDownCircleFill/></span>
                </div> */}
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