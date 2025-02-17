import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router-dom";

function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 min-h-screen flex items-center justify-center">
            <div className="bg-white px-5 py-5 rounded-lg">
                <div className="flex flex-col items-center justify-center">
                    <Heading label="Sign in" />
                    <SubHeading label="Enter your information to create an account" />
                    <InputBox
                        label="Email"
                        type="text"
                        placeholder="billgates@gmail.com"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <InputBox
                        label="Password"
                        type="password"
                        placeholder="@root69"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Button label="Sign in" onClick={async () => {
                        const response = await axios.post(BACKEND_URL + "/user/signin", {
                            email,
                            password
                        });
                        localStorage.setItem("token", response.data.token);
                        navigate("/dashboard");
                    }} />
                    <BottomWarning
                        label="Don't have an account?"
                        text="Sign up"
                        to="/signup"
                    />
                </div>
            </div>
        </div>
    );
}

export default Signin;
