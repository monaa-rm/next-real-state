import styles from "@/module/ItemList.module.css";

function ItemList({ data }) {
 const editData = data.filter((i) => i !== "");
  return (
    <div className={styles.container}>
      {editData.length ? (
        <ul>
          {editData.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      ) : (
        <p>هیچ موردی ذکر نشده است</p>
      )}
    </div>
  );
}

export default ItemList;
