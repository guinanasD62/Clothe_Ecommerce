
import styles from  '../skeleton/Skeleton.module.css';
import Skeleton from 'react-loading-skeleton';
//import styles from "@/ui/dashboard/users/users.module.css";

const SkeletonUsers = ({ count = 5 }) => {
  return (
    <>
    <td> <div className={`${styles.skeleton} ${styles.skeletonTitle}`}></div> </td>
    <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Mobile</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>

          {Array.from({ length: count }).map((_, index) => (
            <tr key={index}>
              <td><div className={`${styles.skeleton} ${styles.skeletonImg} ${styles.skeletonText}`}></div></td>
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

export default SkeletonUsers;
