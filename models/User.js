import mongoose from "mongoose";
mongoose.set('strictQuery', true);
// Defining Schema
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  // tc: { type: Boolean, required: true }
  age: {type: Number, required: true, trim: true},
  gender: {type: String, required: true, trim: true},
})
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  // tc: { type: Boolean, required: true }
  address: {type: String, required: true, trim: true},
  specialization: {type: String, required: true, trim: true},
})

// Model
const patientModel = mongoose.model("patient", patientSchema)
const doctorModel = mongoose.model("doctor", doctorSchema)

export  {patientModel,doctorModel};
