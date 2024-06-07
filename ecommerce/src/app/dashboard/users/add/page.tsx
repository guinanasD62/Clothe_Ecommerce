"use client"
// no error, very goood diana amazinggg <3
import styles from "@/ui/dashboard/users/addUser/addUser.module.css"
import { useRouter } from "next/navigation";
import axios from "axios";
import { FormEvent, useState } from "react";


interface User {

  username: string;
  email: string;
  password: string;
  plainpassword: string;
  phone: string;
  address: string;
  img?: string;
  isAdmin?: boolean;
  isActive?: boolean;
}
const AddUserPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<User>({
    username: '',
    email: '',
    password: '',
    plainpassword: '',
    phone: '',
    address: ''
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'password') {
      const [password, plainpassword] = value.split(' ');
      setFormData(prevState => ({
        ...prevState,
        password: password || '',
        plainpassword: plainpassword || ''
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const modifiedFormData = {
        ...formData,
        password: formData.password,
        plainpassword: formData.plainpassword
      };
      const response = await axios.post('http://localhost:4000/users', modifiedFormData);
      console.log('Adding successful:', response.data);
      router.push('/dashboard/users');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };


  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="name" name="username" value={formData.username}
          onChange={handleChange}
          required />
        <input type="email" placeholder="email" name="email" value={formData.email}
          onChange={handleChange}
          required />
        <input
          type="text"
          placeholder="password"
          name="password"
          value={`${formData.password} ${formData.plainpassword}`}
          onChange={handleChange}
          required
        />
        <input type="phone" placeholder="phone" name="phone" value={formData.phone}
          onChange={handleChange} />
        <select name="isAdmin" id="isAdmin" >
          <option value="false">Is Admin?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select name="isActive" id="isActive">
          <option value="true">Is Active?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <textarea
          name="address"
          id="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        ></textarea>
        <textarea name="img" id="img" placeholder="Image link address" value={formData.img} ></textarea>
        <button type="submit">Submit</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

export default AddUserPage;