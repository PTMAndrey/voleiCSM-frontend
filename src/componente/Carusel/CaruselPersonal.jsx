import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "./swipper.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./Carusel.module.scss";
import Buton from "../Buton/Buton";
import useWindowDimensions from "../../hooks/useWindowDimensions"
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
import CardPersonal from '../Card/CardPersonal';
const Carusel = ({
    data,
    titluCarousel,
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
                    <h5 className='text-black mr-5'>{titluCarousel}</h5>
                    <span onClick={() => navigate("/personal")}>
                        <Buton
                            icon={<ArrowRight />}
                            position="right"
                            variant="tertiary"
                            label="Personal"
                        />
                    </span>
                </div>

                {width < 651 ?
                    <Swiper
                        slidesPerView={1}
                        // spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination,Navigation]}
                        className={`mySwiper ${styles.centrareStire}`}>

                        {data?.slice(0, data.length).map((_data) =>
                            <SwiperSlide key={_data.id}>
                                <CardPersonal
                                    style={{ width: "90%", marginLeft:'150px'}}
                                    data={_data}
                                    onClick={() => {
                                        navigate("/personal/" + _data?.id);
                                    }}
                                />
                            </SwiperSlide>
                        )
                        }
                    </Swiper>
                    :

                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination, Navigation]}
                        className={`mySwiper ${styles.centrareStire}`}>

                        {data?.slice(0, data.length).map(_data =>
                            <SwiperSlide key={_data.id}>
                                <CardPersonal
                                    style={{ width: "90%", backgroundColor: "#1B1D49" }}
                                    data={_data}
                                    onClick={() => {
                                        navigate("/personal/" + _data?.id);
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