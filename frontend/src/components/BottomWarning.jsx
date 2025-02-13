import React from "react";
import { Link } from "react-router-dom";

function BottomWarning({ label, to, text }) {
    return (
        <div className="flex flex-row gap-x-2 text-center items">
            <div className="font text-lg">{label}</div>
            <Link className="font text-lg" to={to} ><u>{ text }</u></Link>
        </div>
    );
}

export default BottomWarning;
