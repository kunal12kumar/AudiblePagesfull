import React, { useState } from "react";
// import galaxy from "../videos/8994820-hd_1080_1920_30fps.mp4"
import Header from "./Header";
import { Link } from "react-router-dom";
// import SignUp from "./SignUp";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';



export default function Login() {

    const [logindata, setlogindata] = useState({
        email: '',
        password: ''
    });

    // to save the change if any happens in that field

    const savedata = (event) => {
        const olddata = { ...logindata };
        const inputname = event.target.name;
        const inputvalue = event.target.value;
        olddata[inputname] = inputvalue;
        console.log(olddata)
        setlogindata(olddata);

    }

    // to store eachuserdata in a array;

    const [saveddata, setsaveddata]=useState([]);


    // to handel the change on form submission

    const handelsubmit =async (event) => {


        // to stop the change on the refresh
        event.preventDefault();

        //to save eachuser data in the the existing array

        const eachuserdata={
            email:logindata.email,
            password:logindata.password
        }

        let newsavedata=[...saveddata,eachuserdata]
        console.log(newsavedata)

        setsaveddata(newsavedata);

        // checking the pawword of part
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/;

        if (!passwordPattern.test(logindata.password)) {
            toast.error('Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }

        // calling the api to check that email and password is matiching or not

        try{
            const login= await axios.post('http://localhost:8091/api/ruserdata/userloginpage',{
                email:logindata.email,
                password:logindata.password
            })

            if (login.status===200){
                toast.success(login.data.message);
            }
            // this is to go on the homepage after verification of the data
            

        }
        catch(error){
            toast.error(error.response?.data?.message);
            toast.error("Try again");

        }

        // to do empty afte the submission
        const aftersubmitdata = {
            email: '',
            password: '',
        }

        setlogindata(aftersubmitdata);


    }

    return (

        <div className="w-full h-[600px] bg-[#F2B6D2]">
            <Header></Header>
            <ToastContainer></ToastContainer>
            <form className="w-full h-[600px]" onSubmit={handelsubmit}>

                <div className="w-[70%] h-[90%] flex  justify-center items-center justify-self-center   ">
                    <div className="w-[70%] h-[70%]  flex gap-6 pt-9 flex-col justify-center items-center bg-[#BF3F92] rounded-md shadow-[7px_5px_6px_#BC04BF] ">
                        <input onChange={savedata} name="email" value={logindata.email} className="w-[70%] h-[40px] rounded-lg border-[1px] placeholder:text-center hover:border-[3px] hover:border-[#0F2F8C] text-center border-[#59023B] " type="text" placeholder="Username"></input>
                        <input onChange={savedata} name="password" value={logindata.password} className="w-[70%] h-[40px] rounded-lg border-[1px] placeholder:text-center hover:border-[2px] hover:border-[#0F2F8C] text-center border-[#59023B] " type="text" placeholder="Password"></input>
                        <button className="w-[30%] h-[15%] rounded-lg  bg-[#C63BD9]">Login</button>
                        <div className="flex flex-row gap-4">


                            <h1 className="">Don't have Account? </h1>
                            <Link to={'/SignUp'}><button className="text-[#0F2F8C]">Sign UP</button></Link>
                        </div>
                    </div>

                </div>
            </form>

        </div>
    )
}