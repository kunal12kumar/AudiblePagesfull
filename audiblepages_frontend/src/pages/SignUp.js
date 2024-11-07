import React, { useState } from "react";
// import galaxy from "../videos/8994820-hd_1080_1920_30fps.mp4"
import Header from "./Header";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';


export default function SignUp() {

    // to udate the all data 
    const [userdata, setuserdata] = useState([
        {
            email: '',
            firstname: '',
            lastname: '',
            phoneno: '',
            password: '',
            otp: ''
        }
    ]);

    const updatedata = (event) => {
        let olddata = { ...userdata };
        let inputname = event.target.name;
        let inputvalue = event.target.value;
        olddata[inputname] = inputvalue;
        setuserdata(olddata);

    }

    const [isotpsent, setisotpsent] = useState(false)


    // defining a function to get refresh on submit

    const handelsubmit = async (event) => {
        event.preventDefault();

        // now to check the pattern of password



        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/;

        if (!passwordPattern.test(userdata.password)) {
            toast.error('Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }


        // calling the api
        if (!isotpsent) {
            // Send OTP
            try {
                const response = await axios.post('http://localhost:8091/api/ruserdata/usersignup', {
                    email: userdata.email
                });
                console.log(response);

                if (response.status === 200) {
                    toast.success(response.data.message);
                    setisotpsent(true);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to send OTP');
                console.log(error);
            }
        } else {
            // Verify OTP and complete signup
            try {
                const response = await axios.post('http://localhost:8091/api/ruserdata/verifyotp', {
                    email: userdata.email,
                    firstname: userdata.firstname,
                    lastname: userdata.lastname,
                    phoneno: userdata.phoneno,
                    password: userdata.password,
                    otp: userdata.otp
                });

                if (response.status === 200) {
                    toast.success(response.data.message);
                    // Clear the form or redirect as needed
                }

                setuserdata({
                    email: '',
                    firstname: '',
                    lastname: '',
                    phoneno: '',
                    password: '',
                    otp: ''

                })
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to verify OTP');
            }
        }
    }


    // to store eachuserdata


    // const eachsignupdata = {
    //     email: userdata.email,
    //     firstname: userdata.firstname,
    //     lastname: userdata.lastname,
    //     phoneno: userdata.phoneno,
    //     password: userdata.password,
    //     otp: userdata.otp
    // };

    // const newsudata = [...newsignupdata, eachsignupdata];

    // setnewsignupdata(newsudata);










return (

    <div className="w-full h-[600px] bg-[#F2B6D2]">
        <ToastContainer></ToastContainer>
        <Header></Header>


        <form className=" w-full h-[600px]" onSubmit={handelsubmit}>

            <div className="w-[70%] h-[90%] flex  justify-center items-center justify-self-center   ">
                <div className="w-[70%] h-[70%]  flex gap-4 pt-9 flex-col justify-center items-center bg-[#BF3F92] rounded-md shadow-[7px_5px_6px_#BC04BF] ">
                    {/* for email */}
                    <input onChange={updatedata} name="email" value={userdata.email} required className="w-[70%] h-[40px] rounded-lg border-[1px] placeholder:text-center hover:border-[3px] hover:border-[#0F2F8C] text-center border-[#59023B] " type="text" placeholder="Email"></input>
                    {/* for name  */}

                    <div className="flex flex-row gap-4 justify-between">
                        <input onChange={updatedata} name="firstname" value={userdata.firstname} required className="w-[70%] h-[40px] rounded-lg border-[1px] placeholder:text-center hover:border-[2px] hover:border-[#0F2F8C] text-center border-[#59023B] " type="text" placeholder="First Name"></input>
                        <input onChange={updatedata} name="lastname" value={userdata.lastname} required className="w-[70%] h-[40px] rounded-lg border-[1px] placeholder:text-center hover:border-[2px] hover:border-[#0F2F8C] text-center border-[#59023B] " type="text" placeholder="Last Name"></input>
                    </div>

                    {/* for number */}
                    <input onChange={updatedata} name="phoneno" value={userdata.phoneno} required className="w-[70%] h-[40px] rounded-lg border-[1px] placeholder:text-center hover:border-[2px] hover:border-[#0F2F8C] text-center border-[#59023B] " type="telephone" pattern="[0-9]{10}" placeholder="Mobile No."></input>

                    {/* password */}
                    <input onChange={updatedata} name="password" value={userdata.password} required className="w-[70%] h-[40px] rounded-lg border-[1px] placeholder:text-center hover:border-[2px] hover:border-[#0F2F8C] text-center border-[#59023B] " type="text" placeholder="Password"></input>

                    {/* for otp */}
                    <div className="flex w-[70%] justify-center flex-row gap-2">
                        {isotpsent && (<input onChange={updatedata} name="otp" value={userdata.otp} required className="w-[70%] h-[40px] rounded-lg border-[1px] placeholder:text-center hover:border-[2px] hover:border-[#0F2F8C] text-center border-[#59023B] " type="text" placeholder="Otp"></input>)}

                        <button className="w-[40%] h-[40px]  rounded-lg border-[1px] placeholder:text-center hover:border-[2px] hover:border-[#0F2F8C] text-center text-red border-[#59023B] ">{isotpsent ? 'verify' : 'Send'}</button>
                    </div>

                </div>
            </div>
        </form>


    </div>
)
}