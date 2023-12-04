
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import styles from "@/layout/DashboardSideBar.module.css";
import LogoutButton from "@/module/LogoutButton";
import SidebarBottom from "@/module/SidebarBottom";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

const DashboardSideBar = async ({ children , email, role}) => {
  return (
    <div>
      
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <CgProfile />
          {role === "ADMIN" ? "ادمین" : null}
          <p>{email}</p>
         <SidebarBottom role={role} />
        </div>
        <div className={styles.main}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardSideBar;
