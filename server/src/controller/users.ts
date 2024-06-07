import express, { Request, Response } from 'express';
import { User } from '../model/user';
//import { createLoan, getLoans, getLoansByUserId, updateLoanById } from '';
import mongoose from 'mongoose';

class UserController {

    getAllUser = async (req: express.Request ,res: express.Response) =>{

        try{
            const users = await User.find();
            return res.status(200).json({data: users});

        }catch(error){
            console.log(error);
            return res.sendStatus(400);
        }
    }
}

export default UserController;