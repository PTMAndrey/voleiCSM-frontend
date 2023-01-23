import React from 'react';
import { MDBFooter, MDBContainer, MDBBtn, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import styles from './Subsol.module.scss'

import { RiFacebookCircleLine } from 'react-icons/ri'
import { RiInstagramLine } from 'react-icons/ri'
import { RiYoutubeLine } from 'react-icons/ri'

const Subsol = () => {
    return (
        <MDBFooter bgColor='transparent' color='light' className='text-center text-lg-start text-white'>
            <div className={styles.bgColor}>
                <section className='d-flex justify-content-center align-items-center justify-content-lg-between p-4 border-bottom'>
                    <div className='me-5 d-none d-lg-block'>
                        <h4>Rețele de socializare</h4>
                    </div>

                    <div className='d-flex  justify-content-center '>
                        <MDBBtn color="transparent" floating className='m-1' href='https://www.facebook.com/people/VOLEI-CSM-Suceava/100057069055225/' target='_blank' role='button'>
                            {/* <BsFacebook /> */}
                            <RiFacebookCircleLine className={styles.icon} />
                        </MDBBtn>

                        <MDBBtn color="transparent" floating className='m-1' href='https://www.instagram.com/csmsuceavavolei/' target='_blank' role='button'>
                            <RiInstagramLine className={styles.icon} />
                        </MDBBtn>

                    </div>
                </section>

                <section className=''>
                    <MDBContainer className='text-center text-md-start mt-5'>
                        <MDBRow className='mt-3'>
                            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                                <p> csm.suceava@sport.gov.ro</p>
                                <p> 0230 531 289</p>
                                <p> 0230 524 767</p>
                            </MDBCol>

                            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Adresa</h6>
                                <p>1 Decembrie 1918, nr.7 Suceava Romania</p>
                            </MDBCol>


                        </MDBRow>
                    </MDBContainer>
                </section>
            </div>
        </MDBFooter >
    );
}
export default Subsol;