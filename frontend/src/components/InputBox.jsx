import React from "react";

function InputBox({ label, type, placeholder }) {
    return (
        <div>
            <div className="font-medium text-afxl mb-1">{label}</div>
            <input
                type={type}
                placeholder={placeholder}
                className="w-96 p-2 border border-gray-400 mb-2 rounded-md"
            />
        </div>
    );
}

export default InputBox;
