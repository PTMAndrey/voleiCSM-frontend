import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "./swipper.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";

import Button from "../Button/Button";
import Card from "../Card/Card";
import useStateProvider from "../../hooks/useStateProvider";
import useWindowDimensions from "../../hooks/useWindowDimensions"

import styles from "./Carusel.module.scss";
import { useMemo } from 'react';
const Carusel = ({
    data,
    titluCarousel,
    showcontrols,
}) => {

    const navigate = useNavigate();
    let { id } = useParams();
    if (id === undefined)
        id = 'someID';


    const { setListView } = useStateProvider();
    useEffect(() => {
        setListView(false);
    }, [setListView]);
   
    const { width } = useWindowDimensions();

    const getSlidesPerView = () => {
        if (data?.length === 1)
            return 1;
        if (data?.length === 2)
            return 2;
        if (data?.length >= 3)
            return 3;
    }

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
                            label="Vezi toate"
                        />
                    </span>
                </div>


                {/* ############## IN HOME PAGE ############## */}

                {width < 550 ?// pagina de home si dimensiune ecran mai mica de 550px
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={1}
                        slidesPerGroup={1}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className={`mySwiper ${styles.centrareStire}`}>

                        {data?.slice(0, 3).map((_data) => // .slice(0,4) afiseaza ultimele 3 stiri publicate
                            <SwiperSlide key={_data.id}>
                                <Card
                                    showcontrols={showcontrols}
                                    style={{ width: "90%" }}
                                    data={_data}
                                    isHomePage
                                    onClick={() => {
                                        navigate("/stiri/" + _data?.id);
                                    }}
                                />
                            </SwiperSlide>
                        )
                        }
                    </Swiper>
                    :
                    // pagina de home si dimensiune ecran mai mare decat 550px
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
                                    showcontrols={showcontrols}
                                    style={{ width: "90%", backgroundColor: "#1B1D49" }}
                                    data={_data}
                                    isHomePage
                                    onClick={() => {
                                        navigate("/stiri/" + _data?.id);
                                    }}
                                />
                            </SwiperSlide>
                        )
                        }
                    </Swiper>

                }




                {/* ############## IS NOT HOME PAGE ############## */}

                {/* {!isHomePage &&
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={1}
                        slidesPerGroup={1}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="mySwipper"
                    >
                        {
                            stiri?.map((stire, index) =>
                                all
                                    ? (
                                        // to be determined when to use this
                                        <SwiperSlide key={stireid}>
                                            <Card
                                                showcontrols={showcontrols}
                                                style={{ width: "90%" }}
                                                imaginiURL={stire?.imaginiURL}
                                                titlu={stire?.titlu}
                                                descriere={stire?.descriere}
                                                dataPublicarii={stire?.dataPublicarii}
                                                id={stire?.id}
                                                onClick={() => {
                                                    navigate("/stiri/" + stire?.id);
                                                }}
                                            />
                                        </SwiperSlide>
                                    ) :
                                    // : stire.status !== pending &&
                                    // stire.status !== pending2 &&
                                    stire.status === 'Publicat' && ( // afisez
                                        <SwiperSlide key={stireid}>
                                            <Card
                                                showcontrols={showcontrols}
                                                style={{ width: "90%" }}
                                                imaginiURL={stire?.imaginiURL}
                                                titlu={stire?.titlu}
                                                descriere={stire?.descriere}
                                                dataPublicarii={stire?.dataPublicarii}
                                                id={stire?.id}
                                                previewDescription={previewDescription}
                                                onClick={() => {
                                                    navigate("/stiri/" + stire?.id);
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
                } */}
            </div>
        </div>
    )
};

export default Carusel;