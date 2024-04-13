import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        toast.warning(" User logout successfully")
        localStorage.removeItem('token');
        navigate("/")
        window.location.reload();
    }
    return (
        <button
            onClick={handleLogout}
            className="btn bg-amber-600 font-serif  hover:bg-blue-500 text-white hover:text-white font-bold text-lg px-3 py-1 rounded duration-500"
        >
            Logout
        </button>
    )
}

export default Logout