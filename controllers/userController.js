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

static findDoc=async(req,res)=>{
  try {
    res.render('findDoc');
  } catch (error) {
    res.status(400).send(error.message);
  }
}
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
          //const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
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
         // const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
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
    try {
        console.log(req.user);

        const currentUser = req.user;

        // Find the logged-in patient by ID
        const patient = await patientModel.findById(currentUser._id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Move expired appointments to pastAppointment array
        const currentDate = new Date();
        for (const appointment of patient.appointment) {
            const appointmentDateTime = new Date(appointment.date + 'T' + appointment.time);
            if (appointmentDateTime < currentDate) {
                if (patient.pastAppointment.length >= 3) {
                    patient.pastAppointment.shift(); // Remove oldest past appointment if more than 3 past appointments exist
                }
                patient.pastAppointment.push(appointment); // Move appointment to pastAppointment array
                patient.appointment = patient.appointment.filter(appt => appt !== appointment); // Remove appointment from current appointment array
            }
        }

        // Save changes to the patient's record
        await patient.save();

        res.send({ "user": patient }); // Send updated user data
    } catch (error) {
        console.error('Error retrieving logged-in patient:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

static loggeddoctor = async (req, res) => {
  try {
      console.log(req.user);

      const currentUser = req.user;

      // Find the logged-in patient by ID
      const doctor = await doctorModel.findById(currentUser._id);
      if (!doctor) {
          return res.status(404).json({ error: 'doctor not found' });
      }

      // Move expired appointments to pastAppointment array
      const currentDate = new Date();
      for (const appointment of doctor.appointment) {
          const appointmentDateTime = new Date(appointment.date + 'T' + appointment.time);
          if (appointmentDateTime < currentDate) {
              if (doctor.pastAppointment.length >= 3) {
                  doctor.pastAppointment.shift(); // Remove oldest past appointment if more than 3 past appointments exist
              }
              doctor.pastAppointment.push(appointment); // Move appointment to pastAppointment array
              doctor.appointment = doctor.appointment.filter(appt => appt !== appointment); // Remove appointment from current appointment array
          }
      }

      // Save changes to the patient's record
      await doctor.save();

      res.send({ "user": doctor }); // Send updated user data
  } catch (error) {
      console.error('Error retrieving logged-in patient:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}
   
  static findDoctor = async (req, res) => {
    const { spec } = req.body; // Get specialization from request body

    try {
        const doctors = await doctorModel.find({ specialization: spec }).select('name _id specialization'); // Pass only the value of spec
        console.log(doctors);
        res.json(doctors); // Send the query result to the client as JSON
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


static bookAppointment = async (req, res) => {
  const { doctorId } = req.body; // Get doctor ID from request body
  const user = req.user;

  try {
      // Find the doctor by ID to get their appointments
      const doctor = await doctorModel.findById(doctorId);
      if (!doctor) {
          return res.status(404).json({ error: 'Doctor not found' });
      }
      
      const today = new Date();
      const year = today.getFullYear(); // Get the year (e.g., 2024)
      const month = today.getMonth() + 1; // Get the month (0-indexed, so add 1 for human-readable format)
      const day = today.getDate(); // Get the day of the month

      // Format the date as YYYY-MM-DD
      const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

      // Calculate the meeting time for the new appointment
      let meetingTime;
      if (doctor.appointment.length === 0) {
          // If no previous appointments, start from 10am
          meetingTime = new Date().setHours(10, 0, 0, 0);
      } else {
          // Otherwise, calculate the next available time slot (30 mins gap)
          const lastAppointment = doctor.appointment[doctor.appointment.length - 1];
          const lastAppointmentTime = new Date(lastAppointment.time);
          meetingTime = new Date(lastAppointmentTime.getTime() + 30 * 60000); // Add 30 mins to last appointment time
      }

      // Check if the meeting time is after 6 PM
      if (new Date(meetingTime).getHours() >= 18) {
          // If meeting time is after 6 PM, schedule appointment for the next day starting from 10 AM
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(10, 0, 0, 0);
          meetingTime = tomorrow;

          // Update formatted date for the next day
          tomorrow.setMonth(tomorrow.getMonth() + 1); // Increment month by 1 to get next month if necessary
          const nextYear = tomorrow.getFullYear();
          const nextMonth = tomorrow.getMonth() + 1;
          const nextDay = tomorrow.getDate();
          formattedDate = `${nextYear}-${nextMonth < 10 ? '0' : ''}${nextMonth}-${nextDay < 10 ? '0' : ''}${nextDay}`;
      }
      const localMeetingTime = new Date(meetingTime).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

      // Generate random room name
      const roomName = Math.random().toString(36).substring(2, 7); // Random string of length 5

      // Create a new appointment object
      const appointmentd = {
          name: user.name, // Assuming patient's name is retrieved from the user object
          time: localMeetingTime, // Convert meeting time to ISO string
          date: formattedDate,
          RoomName: roomName
      };
      const appointmentp = {
        name: doctor.name, // Assuming patient's name is retrieved from the user object
        time: localMeetingTime, // Convert meeting time to ISO string
        date: formattedDate,
        RoomName: roomName
    };

      // Update the doctor's appointment array
      await doctorModel.findByIdAndUpdate(
          doctorId,
          { $push: { appointment: appointmentd } },
          { new: true }
      );

      await patientModel.findByIdAndUpdate(
          user._id,
          { $push: { appointment: appointmentp } },
          { new: true }    
      )

      res.status(200).json({ message: 'Appointment created successfully' });
  } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
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
