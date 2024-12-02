import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//login callback
const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username});
        if(!user) {
            return res.status(404).send("Wrong Credentials!!");
        }

        const passwordCompare = bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(404).send("Wrong Credentials!!");
        }

        const token = jwt.sign(
            {
                id: user._id, 
                username: user.username
            },
             process.env.JWT_SEC,
            { expiresIn:"3d"}
        );
        res.status(200).json({
            success: true,
            token,
            user,
    });
    } catch(error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
};

//Register Callback
const registerController = async (req, res) => {
    try {
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const newuser = new User({
            name: req.body.name,
            username: req.body.username,
            email:req.body.email,
            password: hashedPassword,
        });
        await newuser.save();
        res.status(201).json({
            success: true,
            newuser,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
};

export  { loginController , registerController };