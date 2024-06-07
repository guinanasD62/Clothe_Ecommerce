"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "@/ui/dashboard/users/users.module.css";
import Search from "@/ui/dashboard/search/search";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import SkeletonUsers from '@/ui/skeleton/SkeletonUsers';

// Define User interface
interface User {
  _id: string;
  img: string;
  username: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  isActive: boolean;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await axios.get<{ data: Product[] }>('http://localhost:4000/product/getproduct');
        const response = await axios.get('http://localhost:4000/users'); // Adjust to your API URL
        setUsers(response.data.data); // Assuming the data is in response.data.data
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdate = (id: string) => {
    router.push(`/dashboard/users/${id}`);
  };

  if (loading) {
    return <div>
      <SkeletonUsers />
    </div>; //    Loading...  You can use a loader here if you prefer
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user ..." />

        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>

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
          {/* {products.map((product: Product) => ( */}
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={30}
                    style={{ borderRadius: '50%' }}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.isAdmin ? "Admin" : "Customer"}</td>
              <td>{user.isActive ? "Active" : "Passive"}</td>

              <td>
                <div className={styles.buttons}>
                  <button
                    className={`${styles.button} ${styles.view}`}
                    onClick={() => handleUpdate(user._id)}
                  >
                    Update
                  </button>

                  <button
                    className={`${styles.button} ${styles.delete}`}
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Pagination count={count} /> */}
    </div>
  );
};

export default UsersPage;
