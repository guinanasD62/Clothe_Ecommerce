import { Request, Response } from "express";
import { User } from "../model/user";
import { generateToken } from "../middleware";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "mysecretkey";

//register user
export const addUser = async (req: Request, res: Response) => {
    try {
        const {
            username,
            email,
            password,
            plainpassword,
            img,
            phone,
            address
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
            plainpassword,
            img,
            phone,
            address
        });

        await user.save();
        return res.status(201).json({ message: "New user created!", data: user });
    } catch (error) {
        console.error(error);
        res.status(500);
    }
};


//get all
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.status(200).json({ data: users });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

};

//getOne
export const getUser = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json({ data: user });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);

        if (!user) {
            return res.status(404).json({ message: "No user found." });
        }

        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({ message: "error updating user" });
    }

};

export const deleteUser = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete({ _id: id });

        if (!user) {
            return res.status(404).json({ message: "No user found." });
        }

        return res.status(200).json({ message: "User  deleted!", data: user });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }

};

// export const login =  async (req: Request, res: Response)=>{
//     const { email, password } = req.body;

//     try {
//       const user = await User.findOne({ email });
//       if (!user || user.password !== password) {
//         return res.status(400).json({ message: 'Invalid email or password' });
//       }

//     // Generate JWT token
//      const token = generateToken(user._id);
//       // Successful login

//       res.status(200).json({ message: 'Login successful', user });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }

//   };


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        //   const isMatch = await bcrypt.compare(password, user.password);
        //   if (!isMatch) {
        //     return res.status(400).json({ message: 'Invalid email or password' });
        //   }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


