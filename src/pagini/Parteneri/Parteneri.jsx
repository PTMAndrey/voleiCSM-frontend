import React from 'react'
import styles from './Parteneri.module.scss';

import Card from 'react-bootstrap/Card';
import Buton from '../../componente/Buton/Buton';
import Primaria from './../../assets/images/Primaria.svg';
import SUCT from './../../assets/images/SUCT.svg';
import Bucovina from './../../assets/images/Bucovina.svg';
import Bazzil from './../../assets/images/Bazzil.svg';
import Assist from './../../assets/images/Assist.svg';
import Celestin from './../../assets/images/Celestin.svg';

const Parteneri = () => {
    return (
        <div className={styles.containerParteneri}>
            <div>
                <h3 className={styles.titluPartener}>Parteneri</h3>
            </div>

            <div className={styles.parteneriBody}>
                
                <Card className={`${styles.cardPartener} mt-5`}>
                    <div className={styles.logoPartner}>
                        <Card.Img variant="top" className={styles.imgPartener} src={Primaria} />
                    </div>
                    <Card.Body className={styles.descrierePartener}>
                        <Card.Title>Suceava Orașul Cetății de Scaun</Card.Title>
                        <Card.Text>
                            Ediție sponsorizată 2022-2023
                        </Card.Text>
                        <Buton className={styles.linkPartener} variant="primary" label="Vezi website" onClick={() => { window.open('https://www.primariasv.ro/', '_blank', 'noreferrer') }} />
                    </Card.Body>
                </Card>

                <Card className={`${styles.cardPartener} mt-5`}>
                    <div className={styles.logoPartner}>
                        <Card.Img variant="top" className={styles.imgPartener} src={SUCT} />
                    </div>
                    <Card.Body className={styles.descrierePartener}>
                        <Card.Title>SUCT</Card.Title>
                        <Card.Text>
                            Ediție sponsorizată 2022-2023
                        </Card.Text>
                        <Buton className={styles.linkPartener} variant="primary" label="Vezi website" onClick={() => { window.open('https://www.facebook.com/suct.suceava/', '_blank', 'noreferrer') }} />
                    </Card.Body>
                </Card>

                <Card className={`${styles.cardPartener} mt-5`}>
                    <div className={styles.logoPartner}>
                        <Card.Img variant="top" className={styles.imgPartener} src={Bucovina} />
                    </div>
                    <Card.Body className={styles.descrierePartener}>
                        <Card.Title>Bucovina health club</Card.Title>
                        <Card.Text>
                            Ediție sponsorizată 2022-2023
                        </Card.Text>
                        <Buton className={styles.linkPartener} variant="primary" label="Vezi website" onClick={() => { window.open('https://www.facebook.com/bucovinahealthclub/', '_blank', 'noreferrer') }} />
                    </Card.Body>
                </Card>

                <Card className={`${styles.cardPartener} mt-5`}>
                    <div className={styles.logoPartner}>
                        <Card.Img variant="top" className={styles.imgPartener} src={Bazzil} />
                    </div>
                    <Card.Body className={styles.descrierePartener}>
                        <Card.Title>Restaurant Bazzil Suceava</Card.Title>
                        <Card.Text>
                            Ediție sponsorizată 2022-2023
                        </Card.Text>
                        <Buton className={styles.linkPartener} variant="primary" label="Vezi website" onClick={() => { window.open('https://bazzil.ro/', '_blank', 'noreferrer') }} />
                    </Card.Body>
                </Card>

                <Card className={`${styles.cardPartener} mt-5`}>
                    <div className={styles.logoPartner}>
                        <Card.Img variant="top" className={styles.imgPartener} src={Assist} />
                    </div>
                    <Card.Body className={styles.descrierePartener}>
                        <Card.Title>ASSIST Software</Card.Title>
                        <Card.Text>
                            Ediție sponsorizată 2022-2023
                        </Card.Text>
                        <Buton className={styles.linkPartener} variant="primary" label="Vezi website" onClick={() => { window.open('https://assist-software.net/', '_blank', 'noreferrer') }} />
                    </Card.Body>
                </Card>

                <Card className={`${styles.cardPartener} mt-5`}>
                    <div className={styles.logoPartner}>
                        <Card.Img variant="top" className={styles.imgPartener} src={Celestin} />
                    </div>
                    <Card.Body className={styles.descrierePartener}>
                        <Card.Title>Tipografia Celestin</Card.Title>
                        <Card.Text>
                            Ediție sponsorizată 2022-2023
                        </Card.Text>
                        <Buton className={styles.linkPartener} variant="primary" label="Vezi website" onClick={() => { window.open('https://www.facebook.com/profile.php?id=100063639667358', '_blank', 'noreferrer') }} />
                    </Card.Body>
                </Card>

            </div>
        </div>
    )
}

export default Parteneri