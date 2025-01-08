import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


const loginUser = async (req,res)=>{
const{email,password}=req.body;
try {
    const user =await userModel.findOne({email});
    if(!user){
        return res.json({success:false,message:"User does not Exists !!"})
    }
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.json({success:false,message:"Invalid Credential"})
    }

    const token = createToken(user._id);
    res.json({success:true,token})


} catch (error) {
    console.log(error);
    res.json({success:false,message:"Error" })
    
}
}

const createToken =(id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" });
        }

     
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid Email ID" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

       
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Account Already Exists!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        const user = await newUser.save();

     
        const token = createToken(user._id);

        return res.json({ success: true, token });
    } catch (error) {
        console.error("Error occurred:", error);
        return res.json({ success: false, message: "ERROR" });
    }
};

export{loginUser,registerUser};