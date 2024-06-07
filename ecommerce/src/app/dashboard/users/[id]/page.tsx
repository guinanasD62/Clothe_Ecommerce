"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from "@/ui/dashboard/users/singleUser/singleUserPage.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation';

// Define User interface
interface User {
  _id: string;
  img: string;
  username: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  isActive: boolean;
  address: string;
  password: string | number | readonly string[] | undefined;
  plainpassword: string | number | readonly string[] | undefined;
}

interface Params {
  id: string;
}


const SingleUserPage = ({ params }: { params: Params }) => {
  const { id } = params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();


  // easier way ang user [id] page tsx. lisod ang product

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/${id}`);
        setUser(response.data.data); // Assuming the data is in response.data.data
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  //lisod but testable|| const updatedProduct = Object.fromEntries(formData.entries());


  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    const formData = new FormData(event.currentTarget);
    // lisod but testable || const updatedProduct = Object.fromEntries(formData.entries());
    const updatedUser = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      plainpassword: formData.get('password') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      isAdmin: formData.get('isAdmin') === 'true',
      isActive: formData.get('isActive') === 'true',
      img: formData.get('img') as string,
    };

    try {
      await axios.put(`http://localhost:4000/users/${id}`, updatedUser);

      alert('User updated successfully');
      router.push("/dashboard/users");
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (loading || !user) {
    return <div>Loading...</div>; // You can use a loader here if you prefer
  }

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={user.img || "/noavatar.png"}
            alt="" fill />
        </div>
        {user.username}
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleUpdate} className={styles.form}>
          <input type="hidden" name="id" value={user._id} />
          <label>Username</label>
          <input type="text" name="username" defaultValue={user.username} placeholder={user.username} />
          <label>Email</label>
          <input type="email" name="email" defaultValue={user.email} placeholder={user.email} />
          <label>Password</label>
          <input type="text" name="password" defaultValue={user.password} />

          <label>Show Password</label>

          <form className={styles.checkBoxContainer}>
            <input type="checkbox" name="showPassword" className={styles.checkBox} onClick={handleShowPasswordChange}></input>
            {showPassword && <p>  -  Plain Password: {user.plainpassword}</p>}
          </form>

          <label>Phone</label>
          <input type="text" name="phone" defaultValue={user.phone} placeholder={user.phone} />
          <label>Address</label>
          <textarea name="address" defaultValue={user.address} placeholder={user.address} />
          <label>Is Admin?</label>
          <select name="isAdmin" defaultValue={user.isAdmin ? 'true' : 'false'}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" defaultValue={user.isActive ? 'true' : 'false'}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label>Image</label>
          <textarea name="img" defaultValue={user.img || ''} placeholder={user.img || ''} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
