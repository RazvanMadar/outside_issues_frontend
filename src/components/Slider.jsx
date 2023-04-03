import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import classes from "./Slider.css";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';

import slide_image_1 from '../pages/images/canakl.jpg';
import slide_image_2 from '../pages/images/canal3.jpg';
import slide_image_3 from '../pages/images/verde.jpg';
import slide_image_4 from '../pages/images/canakl.jpg';
import slide_image_5 from '../pages/images/canakl.jpg';
import slide_image_6 from '../pages/images/canakl.jpg';
import slide_image_7 from '../pages/images/canakl.jpg';

const Slider = () => {
    return (
        <div className={classes.fragment}>
            <h1 className={classes.heading}>Flower Gallery</h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className={classes['swiper_container']}
            >
                <SwiperSlide>
                    <img src={slide_image_1} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide_image_2} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide_image_3} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide_image_4} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide_image_5} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide_image_6} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={slide_image_7} alt="slide_image" />
                </SwiperSlide>

                <div className={classes['slider-controler']}>
                    <div className={`${classes['swiper-button-prev']} ${classes['slider-arrow']}`}>
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <div className={`${classes['swiper-button-next']} ${classes['slider-arrow']}`}>
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                    <div className={classes['swiper-pagination']}></div>
                </div>
            </Swiper>
        </div>
    );
}

export default Slider;