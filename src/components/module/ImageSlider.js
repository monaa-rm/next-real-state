"use client"

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "@/module/ImageSlider.module.css";
import Image from "next/image";

const ImageSlider = ({images}) => {
    
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
    rtl: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };


  return (
    <div className={styles.img_container} >
     {images.length ? (
            <Slider {...settings}>
              {images.map((src, index) => (
                <div key={index}>
                  <Image src={src} alt="alt" width="500" layout="responsive"  height="300" className={styles.image} />
                </div>
              ))}
            </Slider>
          ) : null}
    </div>
  )
}

export default ImageSlider
