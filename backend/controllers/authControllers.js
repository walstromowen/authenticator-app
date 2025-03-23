import { UserModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function test(req, res){
     res.send('Successful connection to server.').status(200);
}

export async function registerUser(req, res){
     try{
          const {username, email, password} = req.body;
          //username check
          if(!username){
               return res.json({
                    error: 'Username field is required.'
               })
          }
          //password checks
          if(!password){
               return res.json({
                    error: 'Password field is required.'
               })
          }
          if(password.length < 6){
               return res.json({
                    error: 'Password must be greater than 6 characters.'
               })
          }
          //email checks
          if(!email){
               return res.json({
                    error: 'Email field is required.'
               })
          }
          const exist = await UserModel.findOne({email});
          if(exist){
               return res.json({
                    error: 'Email is already taken.'
               })
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await UserModel.create({
               username: username, 
               email: email, 
               password: hashedPassword,
          })
          return res.json(user)
     }catch(err){
          console.log(err)
     }
}

export async function loginUser(req, res){
     try{
          const {username, password} = req.body;
          //
          const user = await UserModel.findOne({username: username})
          if(!user){
               return res.json({
                    error: 'No user found'
               })
          }
          //Check if passwords match
          const match = await bcrypt.compare(password, user.password)
          if(match){
               jwt.sign({username: user.username, email: user.email, id: user._id}, process.env.JWT_SECRET, {}, (err, token)=>{
                    if(err) throw err;
                    res.cookie('token', token).json(user)
               })
          }
          if(!match){
               return res.json({
                    error: 'The password for the given user does not match.'
               })
          }
     }catch(err){
          console.log(err)
     }
}

export async function getProfile(req, res){
     const {token} = req.cookies;
     console.log(req.cookies)
     if(token){
          jwt.verify(token, process.env.JWT_SECRET, {}, (err, user)=>{
               if(err) throw err;
               console.log(user)
               res.json(user)
          })
     }else{
          res.json(null)
     }
}