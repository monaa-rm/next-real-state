"use client";
import styles from "@/module/AddImage.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiImages } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { isValidUrl } from "@/utils/isValidUrl";

const AddImage = ({ title, profileData, setProfileData, isMpty }) => {
  const [newImages, setNewImages] = useState([]);

useEffect(()=>{
  if(isMpty) setNewImages([])
},[isMpty])

  const changeHandler = (e) => {
    const files = e.target.files;

    if (files && files[0]) {
      setProfileData((prevData) => ({
        ...prevData,
        images: [...prevData.images, files[0]],
      }));

      setNewImages((prevImages) => [...prevImages, files[0]]);
    }
  };
  const removeImageHandler = (index) => {
    const images = [...newImages];
    images.splice(index, 1);
    setNewImages(images);

    setProfileData((prevData) => {
      const updatedImages = prevData.images.filter((_, i) => i !== index);
      return {
        ...prevData,
        images: updatedImages,
      };
    });
  };

  return (
    <div className={styles.container}>
      <p>{title}</p>
      <div className={styles.images_container}>
        {profileData.images.length
          ? profileData.images.map((img, index) =>
              isValidUrl(img) ? (
                <div key={index} className={styles.image_item}>
                  <AiFillCloseCircle
                    className={styles.remove_image}
                    onClick={() => removeImageHandler(index)}
                  />
                  <Image width={200} height={200} src={img} alt="Picture" />
                </div>
              ) : null
            )
          : null}
        {newImages.length
          ? newImages.map((image, index) => (
              <div key={index} className={styles.image_item}>
                <AiFillCloseCircle
                  className={styles.remove_image}
                  onClick={() => removeImageHandler(index)}
                />
                <Image
                  key={index}
                  width={200}
                  height={200}
                  src={URL.createObjectURL(image)}
                  alt="Picture"
                />
              </div>
            ))
          : null}
      </div>
      <div>
        {" "}
        <label htmlFor="image">
          انتخاب <BiImages />
        </label>
        <input type="file" name="file" id="image" onChange={changeHandler} />
      </div>
    </div>
  );
};

export default AddImage;
