import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username or email already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username },
                    { email }
                ]
            }
        });

        if (existingUser) {
            const errors = {};
            if (existingUser.username === username) {
                errors.username = "Username already exists!";
            }
            if (existingUser.email === email) {
                errors.email = "Email already exists!";
            }
            return res.status(400).json({ errors });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword,
            }
        });

        res.status(201).json({ message: 'Registration successful!', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to register!' });
    }
};



export const login = async (req, res) => {
    const maxAge = 1000 * 60 * 60 * 24;
    const { email, password } = req.body;
    try { 
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where: {email}
        });

        if (user) {
            // Compare the provided password with the hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            
            //create  token with payload and secret key
            const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET);
            // console.log('token ->', token);
            
            const {password:userPass, ...userInfo} = user; 
            if (isMatch) {
                // Log in the user and set cookies
                res.cookie('token',token,{maxAge:maxAge, httpOnly: true}).status(200).send({userInfo});
            } else {
                res.status(401).json({ error: 'Invalid password!' });
            }
        } else {
            res.status(404).json({ error: 'Invalid email' });
        }
    }
     catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to log in!' });
    }
}

export const logout = (req, res) => {

    res.clearCookie('userId').status(200).json({ message: 'Logout successful!' });
}
