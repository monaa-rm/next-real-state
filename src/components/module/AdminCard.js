import { SiHomebridge } from "react-icons/si";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiCalendarCheck } from "react-icons/bi";

import ItemList from "@/module/ItemList";
import Title from "@/module/Title";
import styles from "@/module/AdminCard.module.css";
import { e2p, sp } from "@/utils/replaceNumber";
import { categories } from "src/constants/strings";
import { icons } from "src/constants/icons";
import ShareButton from "@/module/ShareButton";
import ImageSlider from "@/module/ImageSlider";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AdminCard = ({
  data: {
    _id,
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
  const router = useRouter();
  const publishHandler = async () => {
    const res = await fetch(`api/publish/${_id}`, { method: "PATCH" });
    const data = await res.json();
   

    if (data.message) {
      toast.success(data.message);
      router.refresh();
    } else {
      toast.error(data.error);
    }
  };
  const deleteHandler = async () => {
    const res = await fetch(`api/publish/${_id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.message) {
      toast.success(data.message);
      router.refresh();
    } else {
      toast.error(data.error);
    }
  };

  return (
    <div className={styles.bottom_card}>
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
            {rentorsale === "sale" ? <p>{sp(price)} تومان</p> : null}
            {rentorsale === "rent" ? (
              <>
                <span>رهن: {sp(earnest)}</span>
                <span>اجاره: {sp(rentMoney)}</span>
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
      <div className={styles.containerButton}>
        <button onClick={publishHandler}>انتشار آکهی</button>
        <button onClick={deleteHandler}>حذف آکهی</button>
      </div>
    </div>
  );
};

export default AdminCard;
