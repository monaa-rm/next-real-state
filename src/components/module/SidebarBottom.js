"use client"

import styles from "@/module/SidebarBottom.module.css"
import LogoutButton from "@/module/LogoutButton";
import { useState } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";


const SidebarBottom = ({role}) => {
    const [show , setShow] = useState(false)

    const showHandler = () => {
        if(show){
            setShow(false)
        }else{
            setShow(true)
        }
    }

  return (
<>
<FaChevronDown className={show ? styles.arrows_rotate  : styles.arrows} onClick={showHandler} />

    <div className={show ? styles.sidebar_div_show : styles.sidebar_div}>

    <span></span>
    <Link href="/dashboard">حساب کاربری</Link>
    <Link href="/dashboard/my-profiles">آگهی های من</Link>
    <Link href="/dashboard/add">ثبت آگهی</Link>
    {role === "ADMIN" ? <Link href="/admin">در انتظار تایید</Link>: null}

    <LogoutButton />

    </div>
    </>
  )
}

export default SidebarBottom
