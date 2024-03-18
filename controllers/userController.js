import {patientModel,doctorModel} from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailConfig.js'

class UserController {

  static loadIndex=async(req,res)=>{

    // console.log(2);
    try {
      // console.log(1);
        res.render('index');
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
}

  static patientSignup = async(req,res) =>{
    try {
        res.render('patientSignup');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
static doctorSignup = async(req,res) =>{
    try {
        res.render('doctorSignup');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
static patientLogin = async(req,res) =>{
    try {
        res.render('patientLogin');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
static doctorLogin = async(req,res) =>{
    try {
        res.render('doctorLogin');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
static article = async(req,res) =>{
    try {
        res.render('article');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
static nearbyfinder = async(req,res) =>{
    try {
        res.render('nearbyfinder');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

static patientPortal = async(req,res) =>{
    try {
        res.render('patientPortal');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
static doctorPortal = async(req,res) =>{
    try {
        res.render('doctorPortal');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
static patientIndex = async(req,res) =>{
    try {
        res.render('patientIndex');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
static doctorIndex = async(req,res) =>{
    try {
        res.render('doctorIndex');
    } catch (error) {
        res.status(400).send(error.message);
    }
};


static video_call=async(req,res)=>{
  try {
    res.render('video');
  } catch (error) {
    res.status(400).send(error.message);
  }
}


  static patientSignupPost = async (req, res) => {
    const { name, email, password, age, gender } = req.body
    const user = await patientModel.findOne({ email: email })
    if (user) {
      res.send({ "status": "failed", "message": "Email already exists" })
    } else {
      if (name && email && password && age && gender) {
        try {
          const salt = await bcrypt.genSalt(10)
          const hashPassword = await bcrypt.hash(password, salt)
          const doc = new patientModel({
            name: name,
            email: email,
            password: hashPassword,
            age: age,
            gender: gender
          })
          await doc.save()
          const saved_user = await patientModel.findOne({ email: email })
          // Generate JWT Token
          const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
          console.log(doc);
          res.render('patientLogin');
          // res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
        } catch (error) {
          console.log(error)
          res.send({ "status": "failed", "message": "Unable to Register" })
        }
      } else {
        res.send({ "status": "failed", "message": "All fields are required" })
      }
    }
  }

  static doctorSignupPost = async (req, res) => {
    const {name, email, password, address, specialization } = req.body
    const user = await doctorModel.findOne({ email: email })
    if (user) {
      res.send({ "status": "failed", "message": "Email already exists" })
    } else {
      if (name && email && password && address && specialization) {
        try {
          const salt = await bcrypt.genSalt(10)
          const hashPassword = await bcrypt.hash(password, salt)
          const doc = new doctorModel({
            name: name,
            email: email,
            password: hashPassword,
            address: address,
            specialization: specialization  
          })
          await doc.save()
          const saved_user = await doctorModel.findOne({ email: email })
          // Generate JWT Token
          const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
          res.render('doctorLogin');
          // res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
        } catch (error) {
          console.log(error)
          res.send({ "status": "failed", "message": "Unable to Register" })
        }
      } else {
        res.send({ "status": "failed", "message": "All fields are required" })
      }
    }
  }

  static patientLoginPost = async (req, res) => {
    try {
      const { email, password } = req.body
      if (email && password) {
        const user = await patientModel.findOne({ email: email })
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password)
          if ((user.email === email) && isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            //res.render('patientPortal');
             res.send({ "status": "success", "message": "Login Success", "token": token })
          } else {
            res.send({ "status": "failed", "message": "Email or Password is not Valid" })
          }
        } else {
          res.send({ "status": "failed", "message": "You are not a Registered User" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Unable to Login" })
    }
  }

  static doctorLoginPost = async (req, res) => {
    try {
      const { email, password } = req.body
      if (email && password) {
        const user = await doctorModel.findOne({ email: email })
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password)
          if ((user.email === email) && isMatch) {
            // Generate JWT Token
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            //res.render('doctorPortal');
             res.send({ "status": "success", "message": "Login Success", "token": token })
          } else {
            res.send({ "status": "failed", "message": "Email or Password is not Valid" })
          }
        } else {
          res.send({ "status": "failed", "message": "You are not a Registered User" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Unable to Login" })
    }
  }

  // static changeUserPassword = async (req, res) => {
  //   const { password, password_confirmation } = req.body
  //   if (password && password_confirmation) {
  //     if (password !== password_confirmation) {
  //       res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
  //     } else {
  //       const salt = await bcrypt.genSalt(10)
  //       const newHashPassword = await bcrypt.hash(password, salt)
  //       await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
  //       res.send({ "status": "success", "message": "Password changed succesfully" })
  //     }
  //   } else {
  //     res.send({ "status": "failed", "message": "All Fields are Required" })
  //   }
  // }

  static loggedpatient = async (req, res) => {
    console.log(req.user);
    res.send({ "user": req.user })
  }
  static loggeddoctor = async (req, res) => {
    res.send({ "user": req.user })
  }

  // static sendUserPasswordResetEmail = async (req, res) => {
  //   const { email } = req.body
  //   if (email) {
  //     const user = await UserModel.findOne({ email: email })
  //     if (user) {
  //       const secret = user._id + process.env.JWT_SECRET_KEY
  //       const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' })
  //       const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`
  //       console.log(link)
  //       // // Send Email
  //       // let info = await transporter.sendMail({
  //       //   from: process.env.EMAIL_FROM,
  //       //   to: user.email,
  //       //   subject: "GeekShop - Password Reset Link",
  //       //   html: `<a href=${link}>Click Here</a> to Reset Your Password`
  //       // })
  //       res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" })
  //     } else {
  //       res.send({ "status": "failed", "message": "Email doesn't exists" })
  //     }
  //   } else {
  //     res.send({ "status": "failed", "message": "Email Field is Required" })
  //   }
  // }

  // static userPasswordReset = async (req, res) => {
  //   const { password, password_confirmation } = req.body
  //   const { id, token } = req.params
  //   const user = await UserModel.findById(id)
  //   const new_secret = user._id + process.env.JWT_SECRET_KEY
  //   try {
  //     jwt.verify(token, new_secret)
  //     if (password && password_confirmation) {
  //       if (password !== password_confirmation) {
  //         res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
  //       } else {
  //         const salt = await bcrypt.genSalt(10)
  //         const newHashPassword = await bcrypt.hash(password, salt)
  //         await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
  //         res.send({ "status": "success", "message": "Password Reset Successfully" })
  //       }
  //     } else {
  //       res.send({ "status": "failed", "message": "All Fields are Required" })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     res.send({ "status": "failed", "message": "Invalid Token" })
  //   }
  // }
}

export default UserController