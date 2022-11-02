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
    titluCarousel,
    pending,
    pending2,
    showcontrols,
    category,
    previewDescription,
    screenWidth,
    all,
}) => {

    const navigate = useNavigate();
    const { listings } = useStateProvider();
    const { setListView } = useStateProvider();

    useEffect(() => {
        setListView(false);
    }, [setListView]);
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
                                {listings?.slice(0, 6).map((listing, index) =>
                                    all
                                        ? listing.status !== pending &&
                                        listing.status !== pending2 && (
                                            // latest
                                            <Col>
                                                <SwiperSlide key={listing.id_stiri}>
                                                    <Card
                                                        showcontrols={showcontrols}
                                                        style={{ width: "90%" }}
                                                        fotografii={listing.fotografii}
                                                        titlu={listing.titlu}
                                                        descriere={listing.descriere}
                                                        data_publicarii={listing.data_publicarii}
                                                        id_stiri={listing.id_stiri}
                                                        previewDescription={previewDescription}
                                                        onClick={() => {
                                                            navigate("/stiri/" + listing.id_stiri);
                                                        }}
                                                    />
                                                </SwiperSlide>
                                            </Col>
                                        ) :
                                        // : listing.status !== pending &&
                                        // listing.status !== pending2 &&
                                        listing.status === 'Publicat' && (
                                            <Col>
                                                <SwiperSlide key={listing.id_stiri}>
                                                    <Card
                                                        showcontrols={showcontrols}
                                                        style={{ width: "90%" }}
                                                        fotografii={listing.fotografii}
                                                        titlu={listing.titlu}
                                                        descriere={listing.descriere}
                                                        data_publicarii={listing.data_publicarii}
                                                        id_stiri={listing.id_stiri}
                                                        previewDescription={previewDescription}
                                                        onClick={() => {
                                                            navigate("/stiri/" + listing.id_stiri);
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