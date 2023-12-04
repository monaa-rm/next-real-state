"use client"

import { FiLogOut } from "react-icons/fi";
import styles from "@/module/LogoutButton.module.css"
import { signOut } from "next-auth/react";
const LogoutButton = () => {
  return (
      <button className={styles.button} onClick={signOut}>
        <FiLogOut />
        خروج
      </button>
  );
};

export default LogoutButton;
