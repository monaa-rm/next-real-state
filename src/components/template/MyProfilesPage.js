import DashboardCard from "@/module/DashboardCard";
import styles from "@/template/MyProfilesPage.module.css";

const MyProfilesPage = ({ profiles }) => {

  return (
    <div>
      {profiles.length ? null : (
        <p className={styles.text}>هیچ آکهی ثبت نشده است</p>
      )}
      <div className={styles.card_container}>
      {profiles.map((data) => (
        <DashboardCard key={data._id} data={JSON.parse(JSON.stringify(data))} />
      ))}        
      </div>

    </div>
  );
};

export default MyProfilesPage;
