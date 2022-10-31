import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import styles from "./Carousel.module.scss";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
import "./swipper.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useStateProvider from "../../hooks/useStateProvider";

const Carousel = ({
    titluCarousel,
    pending,
    pending2,
    showcontrols,
    category,
    all,
}) => {

    const navigate = useNavigate();
    const { listings } = useStateProvider();
    const { setListView } = useStateProvider();

    useEffect(() => {
        setListView(false);
    }, [setListView]);
    return (
        <div>
            <div>
                <div className={styles.headerSwiper}>
                    <h5>{titluCarousel}</h5>
                    <span onClick={() => navigate("/stiri")}>
                        <Button
                            icon={<ArrowRight />}
                            position="right"
                            variant="tertiary"
                            label="See everything"
                        />
                    </span>
                </div>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={1}
                    slidesPerGroup={1}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwipper"
                >
                    {listings?.slice(0, 6).map((listing,index) =>
                        all
                            ? listing.status !== pending &&
                            listing.status !== pending2 && (
                                // latest
                                <SwiperSlide key={listing.id_stiri}>
                                    <Card
                                        showcontrols={showcontrols}
                                        style={{ width: "90%" }}
                                        fotografii={listing.fotografii}
                                        titlu={listing.titlu}
                                        descriere={listing.descriere}
                                        data_publicarii={listing.data_publicarii}
                                        id_stiri={listing.id_stiri}
                                        onClick={() => {
                                            navigate("/stiri/" + listing.id_stiri);
                                        }}
                                    />
                                </SwiperSlide>
                            ) :
                            // : listing.status !== pending &&
                            // listing.status !== pending2 &&
                            // listing.category === category && (
                            (<SwiperSlide key={listing.id_stiri}>
                                <Card
                                    showcontrols={showcontrols}
                                    style={{ width: "90%" }}
                                    fotografii={listing.fotografii}
                                    titlu={listing.titlu}
                                    descriere={listing.descriere}
                                    data_publicarii={listing.data_publicarii}
                                    id_stiri={listing.id_stiri}
                                    onClick={() => {
                                        navigate("/stiri/" + listing.id_stiri);
                                    }}
                                />
                            </SwiperSlide>
                            )
                    )}
                    <SwiperSlide>
                        <div onClick={() => navigate("/stiri")}>
                            <div className={styles.seeEverything}>
                                <span>
                                    <ArrowRight className={styles.chevron} />
                                </span>
                                <p className={styles.text}>See Everything</p>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default Carousel