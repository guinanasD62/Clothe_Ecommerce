import { title } from 'process'
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from './sidebar.module.css'
import{ 
    MdShoppingBag,
    MdSupervisedUserCircle,
    MdDashboard
} from "react-icons/md"

const menuItems = [
    {
      title: "Pages",
      list: [
        {
          title: "dashboard",
          path: "/dashboard",
          icon: <MdDashboard />,
        },
        {
          title: "Users",
          path: "/dashboard/users",
          icon: <MdSupervisedUserCircle />,
        },
        {
          title: "Products",
          path: "/dashboard/products",
          icon: <MdShoppingBag />,
        },
        {
          title: "Logged in as Customer",
          path: "/customer",
          icon: <MdSupervisedUserCircle />,
        }
    ]
}
]

const Sidebar = () => {
  return (
    <div className={styles.container}>
         <div className={styles.user}>
        <Image
          className={styles.userImage}
        //   src={user.img || "/noavatar.png"}
          src="/noavatar.png"
          alt=""
          width="50"
          height="50"
        /> 
         <div className={styles.userDetail}>
          <span className={styles.username}>Diana Rose</span>
          {/* {user.username} */}
          <span className={styles.userTitle}>Administrator</span>
        </div>
        </div>
        <ul>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
                ))}
            </li>
        ))}
        </ul>
    </div>
  )
}

export default Sidebar;
