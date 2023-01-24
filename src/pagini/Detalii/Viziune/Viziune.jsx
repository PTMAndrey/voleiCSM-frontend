import React from 'react'
import { Card } from 'react-bootstrap';
import ImgViziune from '../../../assets/images/ImgViziune.svg';
import styles from './Viziune.module.scss';

const Viziune = () => {
    return (
        <div className={styles.containerViziune}>
            <div>
                <h3 className={styles.titluViziune}>Viziune</h3>
            </div>

            <div className={styles.viziuneBody}>
                <Card className={`${styles.cardViziune} mt-5`}>
                    <Card.Body className={styles.descriereViziune}>
                        <Card.Img variant="top" className={styles.imgViziune} src={ImgViziune} />

                        <div className={styles.descriere}>
                            <Card.Title className={styles.titluArticol}>Suceava Orașul Cetății de Scaun</Card.Title>

                            <Card.Text className='text-white mt-5'>
                                <p>
                                    Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
                                </p>
                                <p>
                                    "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt turpis mi, vel pretium tellus pellentesque vel. Duis in nunc sem. Ut sagittis volutpat magna imperdiet vehicula. Donec placerat, neque quis bibendum tempus, orci ipsum scelerisque nisi, bibendum luctus est ante non eros. Ut a ligula arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                </p>
                                <p>
                                    Praesent commodo sed urna eleifend euismod. Sed sodales lorem id sem sollicitudin pretium. Vivamus ipsum erat, condimentum eget vulputate in, eleifend eu massa. Aenean imperdiet gravida vehicula. Suspendisse potenti. Nulla sed est nibh. Donec auctor placerat dui ac suscipit. Curabitur eleifend dui vel justo rhoncus tincidunt in vitae sapien. Cras malesuada porta bibendum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean mollis, leo sed interdum laoreet, neque ante malesuada risus, id mollis diam augue nec ligula. Mauris in magna nibh. Maecenas lacinia tellus eu mauris faucibus, a faucibus est accumsan. Maecenas semper vestibulum posuere. Duis facilisis, odio et sodales semper, mauris justo bibendum turpis, in tempus risus dolor sit amet nisl. In pellentesque fringilla erat, ac venenatis dui rhoncus non. Maecenas sit amet tincidunt risus, eget luctus urna. Sed lectus arcu, tempus eu mi non, hendrerit convallis arcu. Aenean sodales mi vel dolor lobortis volutpat. Aliquam erat volutpat. Cras tempor tortor malesuada libero vestibulum condimentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed mollis nunc mauris, ac maximus elit lacinia non. Pellentesque id lectus quis elit aliquam fringilla. Integer tincidunt laoreet posuere. Phasellus ut leo nec odio consectetur feugiat venenatis id mi. In vehicula sapien sapien, id pulvinar lorem pulvinar et. Duis condimentum, leo eget imperdiet maximus, nibh libero gravida urna, a pretium quam purus nec magna. Morbi varius, dui vitae congue consequat, dolor purus fermentum orci, eu convallis magna diam in enim. Vestibulum mollis varius ipsum, eu vestibulum ex semper vel. Donec et molestie tortor. Etiam laoreet varius ullamcorper. Mauris et luctus sem. Nulla molestie lacus vel neque interdum ullamcorper. Fusce molestie sollicitudin dapibus. Morbi euismod nunc a sem condimentum, eu blandit ex luctus. Donec consectetur mauris quis velit volutpat, vehicula ornare metus scelerisque. Cras non accumsan dui. Vestibulum a faucibus libero, ac suscipit enim. Aliquam congue ligula aliquam gravida dictum. Mauris enim arcu, sagittis vitae dapibus sit amet, lacinia id nisi. Integer ut dui semper augue mattis efficitur ac sed arcu.
                                </p>
                            </Card.Text>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default Viziune