"use client";
import styles from "@/module/Crad.module.css";

import { HiOutlineLocationMarker } from "react-icons/hi";
import { sp } from "@/utils/replaceNumber";
import { icons } from "src/constants/icons";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { CiImageOff } from "react-icons/ci";

const Card = ({
  data: {
    _id,
    category,
    location,
    title,
    price,
    rentorsale,
    earnest,
    rentMoney,
    images,
  },
}) => {
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
    <div>
      <Link href={`/buy-residential/${_id}`}>
        <div className={styles.container}>
          <div className={styles.card}>
            {images.length ? (
              <img src={images[0]} alt="image" />
            ) : (
              <div className={styles.no_image}>
                <CiImageOff />
              </div>
            )}
          </div>

          <div className={styles.card_footer}>
            <div className={styles.icon}>{icons[category]}</div>
            <p className={styles.title}>{title}</p>
            <div className={styles.location_div}>
              <HiOutlineLocationMarker />

              <p className={styles.location}>{location}</p>
            </div>
            {rentorsale === "sale" ? <span>{sp(price)} تومان</span> : null}
            {rentorsale === "rent" ? (
              <span>
                رهن: {sp(earnest)}، اجاره: {sp(rentMoney)}
              </span>
            ) : null}
            {/* <span>{sp (price)} تومان</span> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
