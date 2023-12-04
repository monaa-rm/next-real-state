"use client";

import styles from "@/module/DashboardCard.module.css";

import Card from "@/module/Card";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const DashboardCard = ({ data }) => {
  const router = useRouter();

  const editHandler = () => {
    router.push(`/dashboard/my-profiles/${data._id}`);
  };
  const deleteHandler = async () => {
    try {
      const res = await fetch(`/api/profile/delete/${data._id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.error) {
        console.log(result.error);
        toast.error(result.error);
      } else {
        toast.success(result.message);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error("عملیات با مشکل مواجه شد");
    }
  };

  return (
    <div className={styles.container}>
      {data.published ? (
        <span className={styles.publisStyle}>منتشر شده</span>
      ) : (
        <span className={styles.publisStyle}>در انتظار تایید</span>
      )}
      <Card data={data} />
      <div className={styles.main}>
        <button onClick={editHandler}>
          ویرایش <BiEdit />
        </button>
        <button onClick={deleteHandler}>
          حذف <AiOutlineDelete />
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default DashboardCard;
