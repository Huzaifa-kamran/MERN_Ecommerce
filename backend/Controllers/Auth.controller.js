const userModel = require('../Models/Users.model');
const bcrypt = require('bcryptjs');

// @Method   POST 
// @API      http://localhost:5000/register
const register = async(req,res)=>{
    try {
        const {userName,userEmail,userPassword} = req.body;

        // Username: allows alphabets only
        const userNameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;

       // Email: standard email format
       const userEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        //  Validations 
        if(!userNameRegex.test(userName)){
            return res.status(400).json({error:"User name can contain only letters"});
        }

        if(!userEmailRegex.test(userEmail)){
            return res.status(400).json({error:"Invalid email address"});
        }
  
        if(!userPassword.length < 8){
            return res.status(400).json({error: 'Password must be at least 8 characters long'});
        }

        // Check If user Already exist 
        const existingUser = await userModel.findOne({userEmail});
        if(existingUser){
            return res.status(400).json({error: 'User already exists with that email'});
        }

        // Hashing Password 
        const hashedPassword = await bcrypt.hash(userPassword, 10);
        const user = await userModel.create({
            userName,
            userEmail,
            userPassword: hashedPassword
        });

        user? res.json({message:"User registered successfully"}): res.json({error:"Failed to register user"});

    } catch (error) {
        res.json({error: error.message});
    }
}

module.exports = {register};