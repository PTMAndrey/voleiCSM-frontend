import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './Partida.module.scss'

const Partida = (props) => {
    const srcc=`${require('../../assets/images/logo csm.svg').default}`;
    return (
        <>
            <div className={styles.timelinePartida}>
                <h3 className={styles.borderTimeline}>{props.timeline}</h3>
                <span className={styles.linie} />
            </div>
            <div className={styles.containerPartida}>
                <Container>
                    <Row>
                        <Col md={4} xs={{ order: 1 }}>
                            <Row>
                                <Col className={styles.coloanaNumeEchipa}><p>{props.echipa1}</p></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className={styles.logoContainer}>
                                        <div className={styles.logoEchipa}>
                                            <img src={srcc} className={styles.imagine} alt="Team 1" />
                                        </div>
                                    </div>

                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{ order: 2 }} md={4} className={styles.detaliiPartida}>
                            {props.scorCSM != null ? <><Row>
                                <Col>
                                    <h4><b>{props.scorCSM} - {props.scorAdversar}</b></h4>
                                </Col>
                            </Row>
                            </> : null}
                            <Row>
                                <Col>
                                    <h5>{props.locatie}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h6>{props.data}</h6>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{ order: 3 }} md={4}>
                            <Row>
                                <Col className={styles.coloanaNumeEchipa}><p>{props.echipa2}</p></Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className={styles.logoContainer}>
                                        <div className={styles.logoEchipa}>
                                            <img src={srcc} className={styles.imagine} alt="Team " />
                                        </div>
                                    </div>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Partida