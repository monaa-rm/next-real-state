"use client";

import AddImage from "@/module/AddImage";
import CustomDatePicker from "@/module/CustomDatePicker";
import Loader from "@/module/Loader";
import TextInput from "@/module/TextInput";
import TextList from "@/module/TextList";
import styles from "@/template/AddProfilePage.module.css";
import RadioList from "@/module/RadioList";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import RentOrSale from "@/module/RentOrSaleList";

const AddProfilePage = ({ data }) => {
  
  const [profileData, setProfileData] = useState({
    title: "",
    description: "",
    location: "",
    phone: "",
    price: "",
    rentorsale: "",
    rentMoney: "",
    earnest: "",
    realState: "",
    constructionDate: new Date(),
    category: "",
    rentorsale: "",
    rules: [],
    amenities: [],
    images: [],
  });
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, [data]);

  const submitHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", profileData.title);
    formData.append("description", profileData.description);
    formData.append("location", profileData.location);
    formData.append("phone", profileData.phone);
    formData.append("price", profileData.price);
    formData.append("rentorsale", profileData.rentorsale);
    formData.append("rentMoney", profileData.rentMoney);
    formData.append("earnest", profileData.earnest);
    formData.append("realState", profileData.realState);
    formData.append("constructionDate", profileData.constructionDate);
    formData.append("category", profileData.category);


    profileData.rules.forEach((rule, index) => {
     
      formData.append(`rules-[${index}]`, rule);
    });

    profileData.amenities.forEach((amenity, index) => {
      formData.append(`amenities-[${index}]`, amenity);
    });

    if (profileData.images) {
      profileData.images.map((image, index) =>
        formData.append(`images-${index}`, profileData.images[index])
      );
    }
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        setProfileData({
          title: "",
          description: "",
          location: "",
          phone: "",
          price: "",
          rentorsale: "",
          rentMoney: "",
          earnest: "",
          realState: "",
          constructionDate: new Date(),
          category: "",
          rentorsale: "",
          rules: [],
          amenities: [],
          images: [],
        });
      }
      setIsEmpty(true);
      setLoading(false);
    } catch (error) {
      toast.error("خطا در ارسال درخواست");
      setLoading(false);
      console.log("error", error);
    }
  };

  const editHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("_id", data._id);
    formData.append("title", profileData.title);
    formData.append("description", profileData.description);
    formData.append("location", profileData.location);
    formData.append("phone", profileData.phone);
    formData.append("price", profileData.price);
    formData.append("rentorsale", profileData.rentorsale);
    formData.append("rentMoney", profileData.rentMoney);
    formData.append("earnest", profileData.earnest);
    formData.append("realState", profileData.realState);
    formData.append("constructionDate", profileData.constructionDate);
    formData.append("category", profileData.category);

    profileData.rules.forEach((rule, index) => {
      formData.append(`rules[${index}]`, rule);
    });

    profileData.amenities.forEach((amenity, index) => {
      formData.append(`amenities[${index}]`, amenity);
    });

    if (profileData.images) {
      profileData.images.map((image, index) => {
        formData.append(`images-${index}`, profileData.images[index]);
      });
    }

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        body: formData,
      });
      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        router.push("/buy-residential");
      }
      setLoading(false);
    } catch (error) {
      toast.error("خطا در ارسال درخواست");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      {data ? <h3>ویرایش آگهی</h3> : <h3>ثبت آگهی</h3>}
      <RentOrSale profileData={profileData} setProfileData={setProfileData} />
      <TextInput
        name="title"
        title="عنوان آگهی"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        name="description"
        title="توضیحات"
        profileData={profileData}
        setProfileData={setProfileData}
        textarea={true}
      />
      <TextInput
        title="آدرس"
        name="location"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="شماره تماس"
        name="phone"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      {profileData.rentorsale === "sale" ? (
        <TextInput
          title="قیمت(تومان)"
          name="price"
          profileData={profileData}
          setProfileData={setProfileData}
        />
      ) : null}
      {profileData.rentorsale === "rent" ? (
        <>
          {" "}
          <TextInput
            title="مبلغ رهن(تومان)"
            name="earnest"
            profileData={profileData}
            setProfileData={setProfileData}
          />
          <TextInput
            title="مبلغ اجاره(تومان)"
            name="rentMoney"
            profileData={profileData}
            setProfileData={setProfileData}
          />
        </>
      ) : null}

      <TextInput
        title="بنگاه"
        name="realState"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <RadioList profileData={profileData} setProfileData={setProfileData} />
      <TextList
        profileData={profileData}
        setProfileData={setProfileData}
        type="amenities"
        title="امکانات رفاهی"
      />
      <TextList
        profileData={profileData}
        setProfileData={setProfileData}
        type="rules"
        title="قوانین"
      />
      <CustomDatePicker
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <AddImage
        profileData={profileData}
        setProfileData={setProfileData}
        isMpty={isEmpty}
        title="انتخاب عکس"
      />
      <Toaster />
      {loading ? (
        <Loader />
      ) : data ? (
        <button className={styles.submit} onClick={editHandler}>
          ویرایش آگهی
        </button>
      ) : (
        <button className={styles.submit} onClick={submitHandler}>
          ثبت آگهی
        </button>
      )}
    </div>
  );
};

export default AddProfilePage;
