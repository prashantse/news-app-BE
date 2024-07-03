// services/authService.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = 'your_jwt_secret'; // Replace with your JWT secret key

async function registerUser(req) {
  // Hash the password
  const { username, password, name, email, phone, city, state } = req.body;
  if (!username || !password || !name || !email) {
    throw new Error('Missing required fields (username,password,name,email)');
  }
  try {

    const userRegex = /^[0-9A-Za-z]{6,16}$/
    if(!userRegex.test(username)){
      return ({
        status: 'fail',
        message: "username should contain only alphanumeric characters and must be of 6 to 16 characters (Not even a space)",
      });
    }
  
  
    const pasRegex= /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;
    if (!pasRegex.test(password)) {
      return ({
        status: 'fail',
        message: "password should contain at least one number, one special character, one uppercase letter and one letter. The length must be in between 8 to 32",
      });
    }
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(email)) {
      return ({
        status: 'fail',
        message: "invalid email",
      });
    }

    const usernameAlreadyExist = await User.findOne({ username });
    if (usernameAlreadyExist) {
      throw new Error('Username already exist');
    }
    const emailAlreadyExist = await User.findOne({ email });
    if (emailAlreadyExist) {
      throw new Error('Email already exist');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      name,
      email,
      phone,
      city: city || '',
      state: state || "",
      password: hashedPassword,
    });

    // Save the user in MongoDB
    await user.save();

    return {
      message: "user registered successfully",
      data: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        state: user.state,
      }
    };
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error(
      message= error.message,
    );
  }
}

async function loginUser(username, password) {
  // Find user by username
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('User not found');
  }

  // Validate password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // Create and return JWT token
  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  return token;
}

module.exports = {
  registerUser,
  loginUser,
};
