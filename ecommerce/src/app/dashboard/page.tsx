  
import styles from "@/ui/dashboard/dashboard.module.css"
import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
  
  // const [collapse, setCollapse] = useState(false);

  return (
    <>

      <div className={styles.containerFluid}>

          
        

            <div className={styles.navbarInverse}>
              <h4>Admin Dashboard</h4>
           
            </div>
            <div className={styles.flex}>
                <div className={styles.well}>
                  <h4>Users</h4>
                  <p>1 Million</p>
                </div> 
                <div className={styles.well}>       
               
                  <h4>Products</h4>
                  <p>100 Million</p>
                </div> 
                </div>
                
         
           <br />
          <br />
          <br />
                <div>
              {/* <h2 className={styles.title}> Inventory Report</h2> */}
                         
              </div>
              </div>


              {/* <table className={styles.table}>
        <thead>
          <tr>
            <td className={styles.tdd}>Image</td>    
            <td className={styles.tdd}>Product Name</td>            
            <td className={styles.tdd}>Stock</td>
            <td className={styles.tdd}>Sale Quantity</td>
            <td className={styles.tdd}>Current stock</td>
          </tr>
        </thead>

        <tbody>
        {/* {users.map((user) => (
            <tr key={user.id}> */}
          {/* <tr>
            <td className={styles.td}><div className={styles.inventory}>
              <Image src="/noavatar.png" alt="" width={40}
                    height={30} style={{ borderRadius: '50%' }}
                    className={styles.productImage}/> */}
              {/* {user.username} */}
              {/* </div>
            </td>

            <td className={styles.td}> Orange Shirt</td>
            <td className={styles.td}>47</td>
            <td className={styles.td}>8</td>
            <td className={styles.td}>39</td>
            </tr> */}
{/* ///////////// */}
{/* <tr>
            <td className={styles.td}><div className={styles.inventory}>
              <Image src="/noavatar.png" alt="" width={40}
                    height={30} style={{ borderRadius: '50%' }}
                    className={styles.productImage}/> */}
              {/* {user.username} */}
              {/* </div>
            </td>

            <td className={styles.td}> Orange Shirt</td>
            <td className={styles.td}>47</td>
            <td className={styles.td}>8</td>
            <td className={styles.td}>39</td>
            </tr>
            <tr>
            <td className={styles.td}><div className={styles.inventory}>
              <Image src="/noavatar.png" alt="" width={40}
                    height={30} style={{ borderRadius: '50%' }}
                    className={styles.productImage}/> */}
              {/* {user.username} */}
              {/* </div>
            </td>

            <td className={styles.td}> Orange Shirt</td>
            <td className={styles.td}>47</td>
            <td className={styles.td}>8</td>
            <td className={styles.td}>39</td>
            </tr>
            <tr>
            <td className={styles.td}><div className={styles.inventory}>
              <Image src="/noavatar.png" alt="" width={40}
                    height={30} style={{ borderRadius: '50%' }}
                    className={styles.productImage}/> */}
              {/* {user.username} */}
              {/* </div>
            </td>

            <td className={styles.td}> Orange Shirt</td>
            <td className={styles.td}>47</td>
            <td className={styles.td}>8</td>
            <td className={styles.td}>39</td>
            </tr>
        </tbody>
      </table>  */}

     
    </>
  );
};

export default Dashboard;