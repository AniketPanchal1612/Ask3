const UserModel = require('../Models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto =  require('crypto');
const cloudinary = require('cloudinary')

//Register a user   =>api/v1/register

exports.registerUser = async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatars',
        width:150,
        crop:"scale" //set auth expext ratio
    })

    //get data from the body
    try {
        const { name, email, password } = req.body;

        const user = await UserModel.create({
            name,
            email,
            password,
    
            avatar: {
                public_id: result.public_id,
                url: result.secure_url
            }
        })

        //Assign JWT
        // const token = user.getJwtToken();

        // res.status(201).json({
        //     success: true,
        //     token
        // })

        //make different file for jwt
        sendToken(user,200,res)

    }
    catch (error) {
        res.status(501).json(error)
    }
}

//Login User  => api/v1/login



exports.loginUser = async(req,res,next)=>{

    //pull email and password from body
    const{email,password} = req.body;

    //Check if email and password is enter by user
    if(!email || !password){
        return res.status(500).json({message:"Please enter values"})
    }


    //Finding user in database                   use select bcs of userModel
    const user = await UserModel.findOne({email}).select('+password')

    if(!user){
        return res.status(401).json({message:"Invalid Email or Password"})
    }


    //Check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return res.status(401).json({message:"Invalid Password"})

    }

    sendToken(user,200,res)

    // const token = user.getJwtToken()

    // res.status(200).json({
    //     success:true,
    //     token 
    // })
     
}


//Forgot Password   =>/api/v1/passeor/forgot
exports.forgotPassword = async (req,res,next)=>{

    //check email provides user or not
    const user = await UserModel.findOne({email:req.body.email})

    if(!user){
        return res.status(404).json({message:"User not found with this email"})

    }

    //Get reset token 
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false})

    //Create reset password url   protocol = http or https
    // const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;


    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {
        await sendEmail({
            email:user.email,
            subject: 'ASK Password Recovery',
            message
        })

        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;   
    await user.save({validateBeforeSave:false})
        res.status(500).json(error);
    }


}


//Reset Password    =>api/v1/password/reset/:token
exports.resetPassword = async(req,res,next)=>{
    //get req.param to token from email

    //Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')


    const user = await UserModel.findOne({
        resetPasswordToken,
        resetPasswordExpire:{
            $gt : Date.now()
        }
    })
    if(!user){
        res.status(400).json({message:"Reset token is invalid or has been expired"})
    }

    if(req.body.password !== req.body.confirmPassword){
        res.status(400).json({message:"Password does not match"})
    }

    //setup new password
    
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;  

    await user.save();

    sendToken(user,200,res);

    
}


//sec 8 Get currently logged in user detail    => /api/v1/me 
exports.getUserProfile = async(req,res,next)=>{
    const user = await UserModel.findById(req.user.id);   //req.user.id - from auth middleware

    res.status(200).json({success:true,user})
}



//Update / change password  => /api/v1/password/update
exports.updatePassword = async(req,res,next)=>{
    //get userid and password
    const user = await UserModel.findById(req.user.id).select('+password');

    //Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)

    if(!isMatched){
        res.status(400).json({message:"Your Old password is incorrect"})
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user,200,res); 



}


//Update user profile     =>api/v1/me/update
exports.updateProfile = async(req,res,next)=>{
    const newUserData={
        name : req.body.name,
        email: req.body.email
    }

    // if(!newUserData.name || !newUserData.email){
    //     return
    //       res.status(500).json({message:"Enter name or email"});
    // }

    // Update avatar : TOD
    // if (req.body.avatar !== '') {
    //     const user = await UserModel.findById(req.user.id)

    //     const image_id = user.avatar.public_id;
    //     const res = await cloudinary.v2.uploader.destroy(image_id);

    //     const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //         folder: 'avatars',
    //         width: 150,
    //         crop: "scale"
    //     })

    //     newUserData.avatar = {
    //         public_id: result.public_id,
    //         url: result.secure_url
    //     }
    // }
     
    const user = await UserModel.findByIdAndUpdate(req.user.id, newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
    })
}





//Logout user    => /api/v1/logout
exports.logOut = async(req,res,next)=>{
    //when user logout clear the cookie
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
}



//Admin Routes

//Get all users   =>api/v1/admin/users
exports.allUsers = async(req,res,next)=>{
    const users  = await UserModel.find()

    res.status(200).json({
        succes:true,
        users 
    })
}


//Get user details   =>api/v1/admin/user/:id
exports.getUserDetail = async(req,res,next)=>{
    const id = req.params.id;
    const user = await UserModel.findById(id)

    if(!user) {
        return res.status(500).json({message:"User doesn't exist"})
    }

    res.status(200).json({
        success:true,
        user
    })
}

//Update user profile   => /api/v1/admin/user/:id
exports.updateUserProfile = async(req,res,next)=>{
    const newUserData = {
        name:req.body.name,
        email: req.body.email,
        role : req.body.role
    }

    const user = await UserModel.findByIdAndUpdate(req.params.id, newUserData,{
        new:true,
        runValidators:true,
        userFindAndModify: false
    })

    res.status(200).json({
        succes:true
    })
}

// Delete users     => api/v1/admin/user/:id
exports.deleteUserProfile = async(req,res,next)=>
{
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id)
        
        //remove avatar
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id); 
        await user.remove();
    res.status(200).json({
        success: true,
        // isDeleted:true
    })
    } catch (error) {
        return res.status(500).json({success:false, message: "User not found with this id" })
    }
   
}


