import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true,
    },
    password: String
});

export const UserModel = mongoose.model('Users', userSchema)//collection name , schema
