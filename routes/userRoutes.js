import express from 'express';
const router = express();
import userController from '../controllers/userController.js';
import {checkpatientAuth,checkdoctorAuth} from '../middlewares/auth-middleware.js';

// ROute Level Middleware - To Protect Route
// router.use('/changepassword', checkUserAuth)
router.use('/loggedpatient', checkpatientAuth)
router.use('/loggeddoctor', checkdoctorAuth)
router.use('/bookAppointment',checkpatientAuth)
router.use('/findDoctor',checkpatientAuth)
// // Public Routes
// router.post('/register', userController.userRegistration)
// router.post('/login', userController.userLogin)
// router.post('/send-reset-password-email', userController.sendUserPasswordResetEmail)
// router.post('/reset-password/:id/:token', userController.userPasswordReset)

// // Protected Routes
// router.post('/changepassword', userController.changeUserPassword)
router.get('/loggedpatient', userController.loggedpatient)
router.get('/loggeddoctor', userController.loggeddoctor)


router.get('/',userController.loadIndex);
router.get('/patientSignup',userController.patientSignup);
router.get('/doctorSignup',userController.doctorSignup);
router.get('/patientLogin',userController.patientLogin);
router.get('/doctorLogin',userController.doctorLogin);
router.get('/article',userController.article);
router.get('/nearbyfinder',userController.nearbyfinder);
router.get('/doctorPortal',userController.doctorPortal);
router.get('/patientPortal',userController.patientPortal);
router.get('/doctorIndex',userController.doctorIndex);
router.get('/patientIndex',userController.patientIndex);
router.get('/findDoc',userController.findDoc);
router.post('/patientSignup',userController.patientSignupPost);
router.post('/doctorSignup',userController.doctorSignupPost);
router.post('/patientLogin',userController.patientLoginPost);
router.post('/doctorLogin',userController.doctorLoginPost);
router.post('/bookAppointment',userController.bookAppointment);
router.post('/findDoctor',userController.findDoctor);
router.get('/video',userController.video_call);
// router.get('/logout',userController.logout);


export default router