import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config.js";

function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 min-h-screen flex items-center justify-center">
            <div className="bg-white px-5 py-5 rounded-lg">
                <div className="flex flex-col items-center justify-center">
                    <Heading label="Sign up" />
                    <SubHeading label="Enter your information to create an account" />
                    <InputBox
                        label="First Name"
                        type="text"
                        placeholder="Bill"
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                    <InputBox
                        label="Last Name"
                        type="text"
                        placeholder="Gates"
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
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
                    <Button
                        label="Sign up"
                        onClick={async () => {
                            await axios.post(BACKEND_URL + "/user/signup", {
                                firstName,
                                lastName,
                                email,
                                password,
                            }).then(() => {
                                navigate("/signin");
                            });
                        }}
                    />
                    <BottomWarning
                        label="Already have an account?"
                        text="Sign in"
                        to="/signin"
                    />
                </div>
            </div>
        </div>
    );
}

export default Signup;
