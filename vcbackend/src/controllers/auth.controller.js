import User from "../models/User.js";
import jwt from "jsonwebtoken"

export async function signup(req, res) {
    const {email, password, fullName} = req.body;

    try {
        if(!email || !password || !fullName) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if(password.lenth < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // note: create new user
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: "Invalid email format"
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                message: "Email already exists, please use a diffeent one."
            })
        }

        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

        const newUser = newUser.create({
            email,
            fullName,
            password,
            profilePic: randomAvatar,
        })

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
          );

          res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 1000,
            httpOnly: true, // note: prevent XSS attacks
            sameSite: "strict", // note: prevent CSRF requests
            secure:process.env.NODE_ENV==="production"
          });
          res.status(201).json({
            success: true,
            user: newUser
          })
          
    } catch (error) {
        
    }
}

export async function login(req, res) {
    res.send("Login Route")
}

export async function logout(req, res) {
    res.send("Logout Route")
} 