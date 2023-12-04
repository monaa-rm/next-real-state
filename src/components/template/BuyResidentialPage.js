import Card from "@/module/Card";
import Sidebar from "@/module/Sidebar";
import styles from "@/template/BuyResidentialPage.module.css";

const BuyResidentialPage = ({data}) => {


  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.main}>
        {data.length ? null : (
          <p className={styles.text}>هیچ آگهی ثبت نشده است</p>
        )}
        <div  className={styles.main_container} >
          {data.map((profile) => (
            <div key={profile._id}  className={styles.card_container}>
              <Card data={profile}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyResidentialPage;
