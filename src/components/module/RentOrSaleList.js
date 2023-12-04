import styles from "@/module/RentOrSale.module.css";

const RentOrSale = ({ profileData, setProfileData }) => {
  const { rentorsale } = profileData;
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  return (
    <div className={styles.container}>
      <div className={styles.main}> 
        <div>
          <label htmlFor="sale">فروش</label>
          <input
            type="radio"
            name="rentorsale"
            value="sale"
            id="sale"
            checked={rentorsale === "sale"}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="rent">اجاره</label>
          <input
            type="radio"
            name="rentorsale"
            value="rent"
            id="rent"
            checked={rentorsale === "rent"}
            onChange={changeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default RentOrSale;
