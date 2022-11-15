//Functions for controlling the backend api services are provided here
import User from '../model/User';
import bcrypt from 'bcryptjs';
//following fnction is related to User registration
export const getAllUser = async(req,res,next)=>{
    let users;
    try{
        users = await User.find();
    }catch(err){
        console.log(err);
    }
    if (!users) {
        return res.status(404).json({meessage: "No Users Found"})
    }
    return res.status(200).json({users})
}
//following function is for signing up of user
export const signup = async(req,res,next) => {
    const {name,email,password} = req.body;

    let existingUser
    try{
        existingUser = await User.findOne({email})
    }catch(err){
       return console.log(err)
    }
    if (existingUser) {
        return res
            .status(400)
            .json({message: "User Already Exists! Login Instead"})
    }
    const hashedPassword = bcrypt.hashSync(password)
    
    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: [],
    })

    try {
        await user.save()
    } catch(err){
        return console.log(err)
    }
    return res.status(201).json({user})
}
//following function is for logging the user
export const login = async(req,res,next) => {
    const {email,password} = req.body;
    let existingUser
    try{
        existingUser = await User.findOne({email})
    } catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res
            .status(404)
            .json({message: "Couldn't find user By this email"})
    }
    
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "Password Incorrect"})
    }
    return res.status(200).json({message:"Login Succesfull"})

}    