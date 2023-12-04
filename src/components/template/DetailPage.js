import { SiHomebridge } from "react-icons/si";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiCalendarCheck } from "react-icons/bi";

import ItemList from "@/module/ItemList";
import Title from "@/module/Title";
import styles from "@/template/DetailPage.module.css";
import { e2p, sp } from "@/utils/replaceNumber";
import { categories } from "src/constants/strings";
import { icons } from "src/constants/icons";
import ShareButton from "@/module/ShareButton";
import ImageSlider from "@/module/ImageSlider";

const DetailPage = ({
  data: {
    title,
    location,
    description,
    amenities,
    rules,
    realState,
    phone,
    price,
    rentorsale,
    earnest,
    rentMoney,
    category,
    constructionDate,
    images,
  },
}) => {
  return (
    <div>
      {images.length ? <ImageSlider images={images} /> : null}
      
      <div className={styles.container}>
        <div className={styles.main}>
          <h1>{title}</h1>
          <span>
            <HiOutlineLocationMarker />
            {location}
          </span>
          <Title>توضیحات</Title>
          <p>{description}</p>
          <Title>امکانات رفاهی</Title>
          <ItemList data={amenities} />
          <Title>قوانین</Title>
          <ItemList data={rules} />
        </div>
        <div className={styles.sidebar}>
          <div className={styles.realState}>
            <SiHomebridge />
            <p>املاک {realState}</p>
            <span>
              <AiOutlinePhone />
              {e2p(phone)}
            </span>
          </div>
          <ShareButton />
          <div className={styles.price}>
            <p>
              {icons[category]}
              {categories[category]}
            </p>
            {rentorsale === "sale" ? <span>{sp(price)} تومان</span> : null}
            {rentorsale === "rent" ? (
              <>
                <span>
                  رهن: {sp(earnest)}
                </span>
                <span>
                  اجاره: {sp(rentMoney)}
                </span>
              </>
            ) : null}
            {/* <p>{sp(price)} تومان</p> */}
            <p>
              <BiCalendarCheck />
              {new Date(constructionDate).toLocaleDateString("fa-IR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
