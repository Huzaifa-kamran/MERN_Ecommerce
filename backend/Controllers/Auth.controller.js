const userModel = require('../Models/Users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @Method   POST 
// @API      http://localhost:5000/auth/register
const register = async (req, res) => {
    try {
        const { userName, userEmail, userPassword } = req.body;

        // Username: allows alphabets only
        const userNameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;

        // Email: standard email format
        const userEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validations 
        if (!userNameRegex.test(userName)) {
            return res.status(400).json({ error: "User name can contain only letters" });
        }

        if (!userEmailRegex.test(userEmail)) {
            return res.status(400).json({ error: "Invalid email address" });
        }

        if (userPassword.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long', message: userPassword.length });
        }

        // Check If user Already exist 
        const existingUser = await userModel.findOne({ userEmail: userEmail });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with that email' });
        }

        // Hashing Password 
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const user = await userModel.create({
            userName,
            userEmail,
            userPassword: hashedPassword
        });

        user ? res.status(201).json({ message: "User registered successfully" }) : res.status(500).json({ error: "Failed to register user" });

    } catch (error) {
        res.json({ error: error.message });
    }
}

// @Method   POST 
// @API      http://localhost:5000/auth/login
const login = async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;

        if (!userEmail || !userPassword) {
            return res.status(400).json({ error: 'Please provide both email and password' });
        }

        const user = await userModel.findOne({ userEmail: userEmail });

        if (!user) {
            return res.status(404).json({ error: 'Email or password is incorrect' });
        }

        const validPassword = await bcrypt.compare(userPassword, user.userPassword);

        if (!validPassword) {
            return res.status(404).send({ error: "Email or password is incorrect" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1hr' });

        return res.status(200).send({
            message: "Login Successful",
            user:user,
            token: token,
        });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

// @Method   GET 
// @API      http://localhost:5000/auth/user/:id
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        return user ? res.json(user) : res.status(404).json({ error: 'User not found' });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

// @Method   PUT 
// @API      http://localhost:5000/auth/updateProfile/:id
const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName, userEmail } = req.body;
        const userImage = req.file ? req.file.path : null;

        // Username: allows alphabets only
        const userNameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;

        // Email: standard email format
        const userEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Fetch the user to update
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // Validate inputs if provided
        if (userName && !userNameRegex.test(userName)) {
            return res.status(400).send({ error: "User name can contain only letters" });
        }
        if (userEmail && !userEmailRegex.test(userEmail)) {
            return res.status(400).send({ error: "Invalid email address" });
        }

        // Check for duplicate username or email (if updating either)
        if (userName && userName !== user.userName) {
            const existingName = await userModel.findOne({ userName });
            if (existingName) {
                return res.status(400).send({ error: "User name already exists" });
            }
        }
        if (userEmail && userEmail !== user.userEmail) {
            const existingEmail = await userModel.findOne({ userEmail });
            if (existingEmail) {
                return res.status(400).send({ error: "Email already exists" });
            }
        }

        // Update fields if provided
        if (userName) user.userName = userName;
        if (userEmail) user.userEmail = userEmail;
        if (userImage) user.userImage = userImage;

        // Save updated user
        const updatedUser = await user.save();
        return res.status(200).send({
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                userName: updatedUser.userName,
                userEmail: updatedUser.userEmail,
                userImage: updatedUser.userImage,
            },
        });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = { register, login, getUser, updateProfile };