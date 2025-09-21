import userModel from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async(req,res)=>{
    try {
        
        const {Email, Password , Username} = req.body;

        const user = await userModel.findOne({Email});

        if(user)
        {
            return res.status(400).json({msg: 'Email already exist'});
        }

        const hashedPassword = await bcrypt.hash(Password,10);
        const userdata = await userModel.create({
            Email,
            Password: hashedPassword,
            Username
        });

        res.status(201).json({msg: 'Details Registered Successfully'});

    } catch (error) {
        res.status(500).json({msg:'Error proccessing the request',error});
    }
}

export const signin = async(req,res)=>{
    try {
        
        const {Username , Password} = req.body;
        const user = await userModel.findOne({Username});
        if(!user)
        {
           return res.status(400).json({msg:'Invalid Credentials (email)'});
        }

        const ismatch = await bcrypt.compare(Password,user.Password);

        if(!ismatch)
        {
           return res.status(400).json({msg:'Invalid Credentials (Password)'});
        }

        const token = jwt.sign(
            {id:user._id, isAdmin: user.isAdmin},
            process.env.JWT_SIGN,
            {expiresIn:'3d'}
        );

        res.status(200).json({
        token,
        msg:'Your Token is being generated ',
        user: {
        id: user._id,
        Username: user.Username,
        Email: user.Email,
        isAdmin: user.isAdmin,
        }
        });

    } catch (error) {
        res.status(500).json({msg:'Error proccessing the request',error});
    }
}

export const forgetPassword = async(req,res)=>{
    try {
        
        const {Email,NewPassword,Confirmpassword} = req.body;
        const user = await userModel.findOne({Email});

        if(!user)
        {
            return res.status(400).json({msg:'Invalid Credentials (email)'});
        }

        if(Confirmpassword != NewPassword)
        {
            return res.status(400).json({msg:'Password Does not Match'});
        }

        const hashedPassword = await bcrypt.hash(NewPassword,10);

        const updatePassword = await userModel.findOneAndUpdate(
            {Email},
            {$set : {Password: hashedPassword}},
            {new:true}
        );

        res.status(201).json({msg: 'Password Changed Successfully'});

    } catch (error) {
        res.status(500).json({msg:'Error proccessing the request',error});
    }
}