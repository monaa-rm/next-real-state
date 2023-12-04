import styles from "@/module/TextList.module.css";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const TextList = ({ type, title, profileData, setProfileData }) => {
  const addHandler = () => {
    setProfileData({ ...profileData, [type]: [...profileData[type], ""] });
  };
  const changeHandler = (e, index) => {
    const { value } = e.target;
    const list = [...profileData[type]];
    list[index] = value;
    setProfileData({ ...profileData, [type]: list });
  };
  const deleteHandler = (index) => {
    const list = [...profileData[type]];
   list.splice(index , 1);
   setProfileData({...profileData , [type] : list})
  }

  return (
    <div className={styles.container}>
      <p>{title}</p>
      {profileData[type].map((i, index) => (
        <div key={index} className={styles.card}>
          <input type="text" value={i}  onChange={(e) => changeHandler(e, index)} />
          <button onClick={() => deleteHandler(index)}>حذف <AiOutlineDelete /></button>
        </div>
      ))}
      <button onClick={addHandler}>
        افزودن <MdOutlineLibraryAdd />{" "}
      </button>
    </div>
  );
};

export default TextList;
