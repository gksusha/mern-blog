import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // 1️⃣ Validate data
    if (!username || !email || !password) {
       next(errorHandler(400, "All fields are required")); 
    }

    try {
        // 2️⃣ Check existing user
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            // return res.status(400).json({ error: 'Username or Email already exists' });
            const error = new Error("Username or Email already exists");
            error.statusCode = 400;
            return next(error);
        }

        // 3️⃣ Hash password
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // 4️⃣ Create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // 5️⃣ Success
        res.status(200).json({ message: 'Signup successful' });

    } catch (error) {
        next(error);
    }
};



export const getUserByUsername = async (req, res, next) => {
    const { username } = req.params;

    try {
        // 1️⃣ Find user by username
        const user = await User.findOne({ username });

        // 2️⃣ If no user found
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            return next(error);
        }

        // 3️⃣ Remove password from returned data
        const { password, ...safeData } = user._doc;

        // 4️⃣ Send clean user data
        res.status(200).json(safeData);

    } catch (error) {
        next(error);
    }
};
