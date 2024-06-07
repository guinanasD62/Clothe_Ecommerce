import express from "express";
import { addUser, getAllUsers, getUser, updateUser, deleteUser, login } from "../controller/user.controller"; 

const router = express.Router();

router.post('/users', addUser);
router.post('/login', login)

router.get('/users/', getAllUsers);
router.get('/users/:id',  getUser);

router.put( '/users/:id' ,updateUser)

router.delete('/users/:id' , deleteUser)

export default router;
