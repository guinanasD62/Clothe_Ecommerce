
//import Sidebar from '@/ui/dashboard/sidebar/sidebar'
import styles from '@/ui/dashboard/dashboard.module.css'
import Navbar from '@/ui/dashboard/navbar/navbar'

const Layout = ({children}) => {
  return (
    <div className = {styles.container}>    

        <div className= {styles.content}>
            <Navbar/>
            {children}
        </div>
    </div>
  )
}

export default Layout