import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    // 1️⃣ Validate data
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // 2️⃣ Check existing user
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or Email already exists' });
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
        res.status(500).json({ error: 'Server error', details: error });
    }
};



export const getUserByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        // 1️⃣ Find user by username
        const user = await User.findOne({ username });

        // 2️⃣ If no user found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 3️⃣ Remove password from returned data
        const { password, ...safeData } = user._doc;

        // 4️⃣ Send clean user data
        res.status(200).json(safeData);

    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error });
    }
};
