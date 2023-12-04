"use client"
import AdminCard from "@/module/AdminCard";
import Card from "@/module/Card";
import styles from "@/template/AdminPage.module.css";
import { Toaster } from "react-hot-toast";

const AdminPage = ({ profiles }) => {
  return (
    <div>
      {profiles.length ? null : (
        <p className={styles.text}>هیچ آگهی در انتظار تاییدی وجود ندارد</p>
      )}
      <div >
        {profiles.map((i) => (
          <div key={i._id}>
            <AdminCard data={i} />
          
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default AdminPage;
