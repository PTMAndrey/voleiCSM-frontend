import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "./swipper.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";

import Button from "../Button/Button";
import Card from "../Card/Card";
import useStateProvider from "../../hooks/useStateProvider";

import styles from "./Carusel.module.scss";
const Carusel = ({
    stiri,
    titluCarousel,
    pending,
    pending2,
    showcontrols,
    category,
    previewDescription,
    screenWidth,
    isHomePage,
    all,
}) => {

    const navigate = useNavigate();

    return (
        <Row>
            <div>
                <div>
                    <Col>
                        <div className={styles.headerSwiper}>
                            <h5>{titluCarousel}</h5>
                            <span onClick={() => navigate("/stiri")}>
                                <Button
                                    icon={<ArrowRight />}
                                    position="right"
                                    variant="tertiary"
                                    label="Vezi toate"
                                />
                            </span>
                        </div>
                    </Col>
                    <Col>
                        <Row>
                            <Swiper
                                slidesPerView={3}
                                spaceBetween={1}
                                slidesPerGroup={1}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                className="mySwipper"
                            >
                                { isHomePage ?
                                    stiri?.slice(0, 4).map((stire, index) =>
                                    stire.status === 'Publicat' && (
                                            // latest
                                            <Col>
                                                <SwiperSlide key={stire.id_stiri}>
                                                    <Card
                                                        showcontrols={showcontrols}
                                                        style={{ width: "90%" }}
                                                        fotografii={stire.fotografii}
                                                        titlu={stire.titlu}
                                                        descriere={stire.descriere}
                                                        data_publicarii={stire.data_publicarii}
                                                        id_stiri={stire.id_stiri}
                                                        onClick={() => {
                                                            navigate("/stiri/" + stire.id_stiri);
                                                        }}
                                                    />
                                                </SwiperSlide>
                                            </Col>
                                    ))
                                 :
                                stiri?.map((stire, index) =>//.slice(0, 3)
                                    all
                                        ? stire.status !== pending &&
                                        stire.status !== pending2 && (
                                            // latest
                                            <Col>
                                                <SwiperSlide key={stire.id_stiri}>
                                                    <Card
                                                        showcontrols={showcontrols}
                                                        style={{ width: "90%" }}
                                                        fotografii={stire.fotografii}
                                                        titlu={stire.titlu}
                                                        descriere={stire.descriere}
                                                        data_publicarii={stire.data_publicarii}
                                                        id_stiri={stire.id_stiri}
                                                        onClick={() => {
                                                            navigate("/stiri/" + stire.id_stiri);
                                                        }}
                                                    />
                                                </SwiperSlide>
                                            </Col>
                                        ) :
                                        // : stire.status !== pending &&
                                        // stire.status !== pending2 &&
                                        stire.status === 'Publicat' && (
                                            <Col>
                                                <SwiperSlide key={stire.id_stiri}>
                                                    <Card
                                                        showcontrols={showcontrols}
                                                        style={{ width: "90%" }}
                                                        fotografii={stire.fotografii}
                                                        titlu={stire.titlu}
                                                        descriere={stire.descriere}
                                                        data_publicarii={stire.data_publicarii}
                                                        id_stiri={stire.id_stiri}
                                                        previewDescription={previewDescription}
                                                        onClick={() => {
                                                            navigate("/stiri/" + stire.id_stiri);
                                                        }}
                                                    />
                                                </SwiperSlide>
                                            </Col>
                                        )
                                )}
                                {/* <SwiperSlide>
                        <div onClick={() => navigate("/stiri")}>
                            <div className={styles.seeEverything}>
                                <span>
                                    <ArrowRight className={styles.chevron} />
                                </span>
                                <p className={styles.text}>See Everything</p>
                            </div>
                        </div>
                    </SwiperSlide> */}
                            </Swiper>
                        </Row>
                    </Col>
                </div>
            </div>
        </Row>
    )
};

export default Carusel;