import mongoose from "mongoose";

export default (db: string) => {
    const connect = () => {
        mongoose
            .connect(db, { useNewUrlParser: true })
            .then(() => {
                return true;
                // return console.log(`Successfully connected to ${db}`);
            })
            .catch(error => {
                return false;
                // console.log("Error connecting to database: ", error);
                // return process.exit(1);
            });
    };
    connect();

    mongoose.connection.on("disconnected", connect);
};