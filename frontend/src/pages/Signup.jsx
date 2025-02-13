import React from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

function Signup() {
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
                    />
                    <InputBox
                        label="Last Name"
                        type="text"
                        placeholder="Gates"
                    />
                    <InputBox
                        label="Email"
                        type="text"
                        placeholder="billgates@gmail.com"
                    />
                    <InputBox
                        label="Password"
                        type="password"
                        placeholder="@root69"
                    />
                    <Button label="Sign up" />
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
