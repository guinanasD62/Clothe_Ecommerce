import Skeleton from 'react-loading-skeleton';
import styles from '../skeleton/Skeleton.module.css';

const ProductCusSkeleton = ({ count = 5 }) => {
  return (
    <div className={styles.skeletoncontainer}>
      {Array.from({ length: count }).map((_, index) => (
        <div className={styles.skeletoncard} key={index}>
          {/* <Skeleton className={`${styles.skeleton} ${styles.skeletonimage}`} height={100} />
          <Skeleton className={`${styles.skeleton} ${styles.skeletontitle}`} height={24} />
          <Skeleton className={`${styles.skeleton} ${styles.skeletontext}`} height={16} count={2} />
          <Skeleton className={`${styles.skeleton} ${styles.skeletonbtn}`} height={34} width={76} /> */}
        
        
        </div>
      ))}
    </div>
  );
};

export default ProductCusSkeleton;
