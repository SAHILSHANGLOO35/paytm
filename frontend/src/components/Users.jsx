import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([
        {
            firstName: "Sahil",
            lastName: "Shangloo",
            _id: 1,
        },
        {
            firstName: "Anuj",
            lastName: "Gill",
            _id: 2,
        },
        {
            firstName: "Arkan",
            lastName: "Khan",
            _id: 3,
        }
    ]);

    return (
        <div className="flex flex-col ml-4">
            <div className="font-bold text-xl mt-4">Users</div>
            <div className="mr-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="border p-2 rounded-md border-slate-300 w-full mt-4"
                />
            </div>
            <div className="flex flex-col mt-4 space-y-2">
                <div>
                    {users.map((user) => (
                        <User key={user._id} user={user} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function User({ user }) {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center w-full">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstName[0]}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-ful">
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center ">
                <button
                    className="border py-2 px-4 rounded-md bg-black text-white font-semibold mr-4"
                    onClick={() => navigate("/send")}
                >
                    Send money
                </button>
            </div>
        </div>
    );
}

export default Users;
