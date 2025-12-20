import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;

      // Cookie options for cross-site requests
      const cookieOptions = {
        httpOnly: true,
      };

      // In production, set sameSite and secure for cross-site cookies
      if (process.env.NODE_ENV === 'production') {
        cookieOptions.sameSite = 'none';
        cookieOptions.secure = true;
      }

      res.status(200).cookie('access_token', token, cookieOptions).json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;

      // Cookie options for cross-site requests
      const cookieOptions = {
        httpOnly: true,
      };

      // In production, set sameSite and secure for cross-site cookies
      if (process.env.NODE_ENV === 'production') {
        cookieOptions.sameSite = 'none';
        cookieOptions.secure = true;
      }

      res.status(200).cookie('access_token', token, cookieOptions).json(rest);
    }
  } catch (error) {
    next(error);
  }
};
