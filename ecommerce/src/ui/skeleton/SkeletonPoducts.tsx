
import styles from  '../skeleton/Skeleton.module.css';
import Skeleton from 'react-loading-skeleton';
//import styles from "@/ui/dashboard/users/users.module.css";

const SkeletonProducts = ({ count = 5 }) => {
  return (
    <>
    <td> <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div> </td>
    <table className={styles.table}>
        <thead>
          <tr>
          <td>Title</td>
            <td>Description</td>
            <td>Price_$</td>
            <td>Created at</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>

          {Array.from({ length: count }).map((_, index) => (
            <tr key={index}>
              <td><div className={`${styles.skeleton} ${styles.skeletonImg}  ${styles.skeletonText}`}></div></td>
              <td><div className={`${styles.skeleton} ${styles.skeletonText}`}></div></td>
              <td><div className={`${styles.skeleton} ${styles.skeletonText}`}></div></td>
              <td><div className={`${styles.skeleton} ${styles.skeletonText}`}></div></td>
              <td><div className={`${styles.skeleton} ${styles.skeletonText}`}></div></td>
              <td>
                <div className={`${styles.skeleton} ${styles.skeletonBtn}`} ></div>
                <div className={`${styles.skeleton} ${styles.skeletonBtn}`} ></div>
  
              </td>
            </tr>
          ))}
        </tbody> 
      </table>
    
    </>
  );
};

export default SkeletonProducts;
