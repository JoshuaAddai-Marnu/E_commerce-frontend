import React from 'react'
import './Hero.css'
/*import hand_icon from '../Assets/hand_icon.png'*/
import arrow_icon from '../Assets/arrow.png'
import hero_image5 from '../Assets/hero_image5.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'

export const Hero = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoPlay: true
    };
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>Latest</p>
                        {/* <img src={hand_icon} alt='' /> */}
                    </div>
                    <p>collections</p>
                    <p>for everyone</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>


            <div className="hero-right">
                <img src={hero_image5} alt="" />
            </div>

        </div>
    )
}
