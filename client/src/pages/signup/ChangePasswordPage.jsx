import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { server } from '../../server';


const ChangePasswordPage = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { email: passedEmail } = location.state || {};

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${server}auth/resetPassword`, {
                email,
                newPassword,
                confirmPassword
            });

            if (response.status === 200) {
                toast.success("Password Changed Successfully")
                setMessage(response.data.message);
                navigate('/login');
            } else {
                setMessage('An error occurred while resetting the password.');
            }
        } catch (error) {
            toast.warning("Something went wrong")

            console.error('Error:', error.message);
            setMessage('An error occurred while resetting the password.');
        }
    };
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleTogglePassword1 = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    useEffect(() => {
        if (passedEmail) {
            setEmail(passedEmail);
        }
    }, [passedEmail]);

    return (
        <>
            <div>
                <div className="bg-grey-lighter mt-20 min-h-screen flex flex-col">
                    <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center ">
                        <div className="bg-teal-900 px-6 py-6 rounded shadow-md text-white w-full">
                            <h1 className="mb-8 text-3xl text-center">Reset Password</h1>

                            <form onSubmit={handleResetPassword}>
                                <label htmlFor="">Enter Your Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="text-black block border border-grey-light w-full p-3 rounded mb-4"
                                    name="email"
                                    placeholder="Email"
                                    autoComplete="off"
                                />
                                <div className='relative'>
                                    <label htmlFor="">Enter New Password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}

                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="text-black block border border-grey-light w-full p-3 rounded mb-4"
                                        name="newPassword"
                                        placeholder="New Password"
                                        autoComplete="off"
                                    />
                                    <span
                                        onClick={handleTogglePassword}
                                        className="absolute text-slate-600 top-7 right-0 mt-3 mr-4 cursor-pointer"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>

                                </div>
                                <label htmlFor="">Confirm New Password</label>
                                <div className='relative'>

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}

                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="text-black block border border-grey-light w-full p-3 rounded mb-4"
                                        name="confirmPassword"
                                        placeholder="Confirm New Password"
                                        autoComplete="off"
                                    />
                                    <span
                                        onClick={handleTogglePassword1}
                                        className="absolute text-slate-600 top-1 right-0 mt-3 mr-4 cursor-pointer"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>

                                <p>{message}</p>

                                <button
                                    type="submit"
                                    className="w-full text-center py-2 rounded bg-teal-600 text-white hover:bg-green-600 focus:outline-none my-1"
                                >
                                    Reset Password
                                </button>
                            </form>

                            <div className="text-center text-sm text-grey-dark mt-4">
                                <a
                                    className="no-underline border-b border-grey-dark text-grey-dark"
                                    href="#"
                                >
                                    Terms of Service
                                </a>{' '}
                                and
                                <a
                                    className="no-underline border-b border-grey-dark text-grey-dark"
                                    href="#"
                                >
                                    Privacy Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangePasswordPage;
