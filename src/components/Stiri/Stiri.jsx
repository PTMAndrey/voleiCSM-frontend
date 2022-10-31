import React from 'react'

import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { BsArrowRight } from 'react-icons/bs';

import styles from './Stiri.module.scss'
const Stiri = (props) => {
    return (
        <div className={styles.stiri}>
            <div className={styles.containerInfo}>
                <div className={styles.header}>
                    <h4>{props.title}</h4>
                    <p>Vezi toate{' '} <span style={{ color: 'orange' }}><BsArrowRight /></span> </p>

                </div>

                <Container>
                    <Row>
                        <Col md={4} xs={{ order: 1 }}>
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">{props.date}</small>
                                    </Card.Footer>
                                    <Card.Title className='text-black'>Card title 1</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in
                                        to additional content. This content is a little bit longer.
                                    </Card.Text>
                                </Card.Body>

                            </Card>
                        </Col>
                        <Col md={4} xs={{ order: 2 }}>
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                    <Card.Title>Card title 2</Card.Title>
                                    <Card.Text>
                                        This card has supporting text below as a natural lead-in to
                                        additional content.{' '}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col md={4} xs={{ order: 3 }}>
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in
                                        to additional content. This card has even longer content than the
                                        first to show that equal height action.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Stiri