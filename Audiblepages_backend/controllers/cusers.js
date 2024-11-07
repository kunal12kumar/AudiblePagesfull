
import {saveuserdata} from '../models/muser.js';

import nodemailer from 'nodemailer';
import crypto from 'crypto'


// Function to generate a 6-digit OTP
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

// Nodemailer setup for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'techcare.services1@gmail.com', // Replace with your email
        pass: 'nfac hmlr wpld mziv',        // Replace with your email password
    },
});


// Function to send OTP email
const sendOtpEmail = async (email, uotp) => {
    const mailOptions = {
        from: 'techcare.services1@gmail.com', // Replace with your email
        to: email,
        subject: 'Congratulations ',
        text: `Your OTP for signup is: ${uotp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully');
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP');
    }
};


export const usersignup=async (req,res)=>{
    try{
        const {email,firstname,lastname,phoneno,password,otp}=req.body;

        console.log({email,firstname,lastname,phoneno,password,otp});

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

         // First, check the uniqueness of the email to ensure every patient is unique
         const user = await saveuserdata.findOne({ email });
         console.log(user);
         if (user) {
             return res.status(400).json({ message: "User already exists" });
         }

         const uotp = generateOTP();

         // send otp email
         await sendOtpEmail(email, uotp)
 
 
         // Create a new patient entry if the email is unique
         const newuserdata = new saveuserdata({
             email,
             firstname,
             lastname,
             phoneno,
             password,
             otp: uotp
         });

         // Save the new patient to the database
        const entry = await newuserdata.save();
        res.status(200).json({ success: true, message: "OTP Sent Successfully", entry });



    }catch(err){

         // If any error occurs, respond with the error
         console.error('Error saving patient data:', err);
         res.status(500).json({ success: false, message: "Failed to send otp", error: err.message });

    }

    

}


// Verify OTP and complete hospital registration
export const verifyotp = async (req, res) => {
    const {email,firstname,lastname,phoneno,password,otp } = req.body;

    try {
        // Find the user by email and OTP
        const user = await saveuserdata.findOne({ email, otp });

        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP or email' });
        }

        // Update user details if OTP is correct
        user.firstname = firstname;
        user.lastname= lastname;
        user.phoneno=phoneno;
        
        user.password = password;
        user.otp = ''; // Clear OTP after successful verification

        await user.save();
        res.status(200).json({ message: 'Signup successful!' });

    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ message: 'Failed to verify OTP', error: err.message });
    }
};





export const userloginpage = async (req, res) => {
    // first getting data from the body
    try {
        const { email, password } = req.body;
        // this is for email pattern
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        } //

         // Password pattern validation
         const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
         if (!passwordPattern.test(password)) {
             return res.status(400).json({ message: 'Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.' });
         }

        // taking the data of the patient on the basis of email

        const user = await saveuserdata.findOne({ email });
        console.log(user)
        if (email===user.email && password===user.password){
            res.status(200).json({message:'Sign IN Successful'})
        }
        else{
            res.status(401).json({message:'Invalid email or password'});
        }
    } catch {
        res.status(500).json({message:'Wrong attempts'})

    }
    





}