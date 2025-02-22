import Sidebar from '@/ui/dashboard/sidebar/sidebar';
import styles from '@/ui/dashboard/dashboard.module.css';
import Navbar from '@/ui/dashboard/navbar/navbar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        {/* <Navbar/> */}
        {children}
      </div>
    </div>
  );
}

export default Layout;
