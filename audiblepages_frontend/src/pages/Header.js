import React from "react";
import { Link } from "react-router-dom";


export default function Header() {

    return (

        <div className=" bg-[#E4F2E7] bg-transparent w-full h-[60px] mx-auto
         my-auto">
            <div className="flex justify-between text-2xl mx-3 p-3 text-[#032CA6]">
                <Link to={"/"}><h1>Aubook</h1></Link>

                <Link to={"/"}><h1>Home</h1></Link>
                <Link to={"/UploadSection"}><h1>About Us</h1></Link>

                <Link to={"/Notification"}><h1>Notification icon</h1></Link>
                <Link to={"/Login"}><h1 >Login</h1></Link>

            </div>
        </div>
    )

}