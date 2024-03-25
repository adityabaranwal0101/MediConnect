import mongoose from "mongoose";
mongoose.set('strictQuery', true);
// Defining Schema
const appointmentSchema=new mongoose.Schema({
  name:{type:String},
  time:{type:String},
  date:{type:String},
  RoomName:{type:String}
})

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  
  age: {type: Number, required: true, trim: true},
  gender: {type: String, required: true, trim: true},
  appointment:[appointmentSchema],
  pastAppointment:[appointmentSchema]  
})
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
 
  address: {type: String, required: true, trim: true},
  specialization: {type: String, required: true, trim: true},
  appointment:[appointmentSchema],
  pastAppointment:[appointmentSchema]  
})

// Model
const patientModel = mongoose.model("patient", patientSchema)
const doctorModel = mongoose.model("doctor", doctorSchema)

export  {patientModel,doctorModel};
