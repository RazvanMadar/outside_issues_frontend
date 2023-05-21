import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import classes from "./SliderComponent.module.css";

import {sliderImages} from "../staticdata/SliderData";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#D7D73A", borderRadius: "10px" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#D7D73A", borderRadius: "10px" }}
            onClick={onClick}
        />
    );
}

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 8000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};
const variable = true;

const SliderComponent = () => {
    return (
        <div className={classes.sliderContainer}>
            <Slider {...settings}>
                {sliderImages.map((item, idx) => (
                    <div key={idx} className={classes.slider} style={{ border: variable ? '5px solid #A9AAB4' : '5px solid #fff' }} >
                        <div
                            key={idx}
                            className={classes.sliderImage}
                            style={{ backgroundImage: `url(${item.linking})` }}
                        >
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default SliderComponent