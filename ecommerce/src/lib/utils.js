// like a server/src/index.ts

import mongoose from "mongoose";

export const connectToDb = async () => {

    const connection ={};

    try {
        if(connection.isConnected) return; //don't connect again
        const db = await mongoose.connect(
            process.env.MONGO);
        //c new connection if not connected 
        connection.isConnected = db.connections[0].readyState
    } catch (error) {
        console.log(error);
        throw new Error(error);
      }
};

//to prevent all the time, check if connected, yes use : no c new one