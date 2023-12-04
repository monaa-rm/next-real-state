import { categories } from "@/constants/strings";
import styles from "@/module/Sidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiFilter } from "react-icons/hi";

const Sidebar = () => {
  const queries = [
    { villa: " ویلا " },
    { apartment: " آپارتمان " },
    { office: " دفتر " },
    { store: " مغازه " },
  ];
  return (
    <div className={styles.container}>
      <p>
        <HiFilter />
       <span>دسته بندی</span> 
      </p>
      <div>
      <Link href="/buy-residential"> همه </Link>

      </div>
      {Object.keys(categories).map((query) => (
        <div>
        <Link
          href={{ pathname: "/buy-residential", query: { category: query } }}
        >
          {categories[query]}
        </Link>          
        </div>

      ))}

    </div>
  );
};

export default Sidebar;
