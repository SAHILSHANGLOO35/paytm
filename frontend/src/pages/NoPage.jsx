import React from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function NoPage() {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 min-h-screen flex items-center justify-center">
            <div className="bg-white px-8 py-8 rounded-lg">
                <div className="flex flex-col items-center justify-center">
                    <Heading label="404" />
                    <SubHeading label="Page not found" />
                    <div className="mt-4 mb-4 text-gray-600 text-center">
                        The page you're looking for doesn't exist or has been moved.
                    </div>
                    <Button 
                        label="Go Home" 
                        onClick={() => navigate("/dashboard")}
                    />
                </div>
            </div>
        </div>
    );
}

export default NoPage;