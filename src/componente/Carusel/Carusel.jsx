import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "./swipper.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./Carusel.module.scss";
import Buton from "../Buton/Buton";
import Card from "../Card/Card";
import useWindowDimensions from "../../hooks/useWindowDimensions"

import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
const Carusel = ({
    data,
    titluCarousel,
    caruselPopup,
}) => {
    const { width } = useWindowDimensions();
    const navigate = useNavigate();
    let { id } = useParams();
    if (id === undefined)
        id = 'someID';

    return (
        <div>
            <div>
                <div className={styles.headerSwiper}>
                    <h5 className='text-black'>{titluCarousel}</h5>
                    <span onClick={() => navigate("/noutati")}>
                        <Buton
                            icon={<ArrowRight />}
                            position="right"
                            variant="tertiary"
                            label="Vezi toate"
                        />
                    </span>
                </div>

                {width < 550 ?
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={1}
                        slidesPerGroup={1}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className={`mySwiper ${styles.centrareStire}`}>

                        {data?.slice(0, 3).map((_data) =>
                            <SwiperSlide key={_data.id}>
                                <Card
                                    style={{ width: "90%" }}
                                    data={_data}
                                    isHomePage
                                    caruselPopup={caruselPopup}
                                    onClick={() => {
                                        navigate("/noutati/" + _data?.id);
                                    }}
                                />
                            </SwiperSlide>
                        )
                        }
                    </Swiper>
                    :
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={1}
                        slidesPerGroup={1}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className='mySwiper'>

                        {data?.slice(0, 3).map(_data =>
                            <SwiperSlide key={_data.id}>
                                <Card
                                    style={{ width: "90%", backgroundColor: "#1B1D49" }}
                                    data={_data}
                                    isHomePage
                                    caruselPopup={caruselPopup}
                                    onClick={() => {
                                        navigate("/noutati/" + _data?.id);
                                    }}
                                />
                            </SwiperSlide>
                        )
                        }
                    </Swiper>

                }
            </div>
        </div>
    )
};

export default Carusel;