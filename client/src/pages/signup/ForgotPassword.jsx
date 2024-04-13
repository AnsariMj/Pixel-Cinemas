import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${server}auth/forgotPassword`, { email });

            if (response.data.message) {
                toast.success("OTP Send Successfully")
                setMessage(response.data.message);
                navigate('/verify-otp', { state: { email } });
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            toast.warning("Please Enter Valid Email Address")

            console.error('Error:', error.message);
            setMessage('An error occurred.');
        }
    };

    return (
        <div>
            <div className="bg-grey-lighter mt-5 min-h-screen flex flex-col">
                <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center ">
                    <div className="bg-teal-900 px-6 py-6 rounded shadow-md text-white w-full">
                        <h1 className="mb-8 text-3xl text-center">Forgot Password</h1>

                        <form onSubmit={handleForgotPassword}>

                            <label htmlFor=""> Enter Your Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className=" text-black block border border-grey-light w-full p-3 rounded mb-4"
                                name="email"
                                placeholder="Email"
                                autoComplete="off"
                            />
                            <p>{message}</p>
                            <button
                                className="w-full text-center py-2 rounded bg-teal-600 text-white hover:bg-green-600 focus:outline-none my-1"
                            >
                                Send OTP
                            </button>
                        </form>

                        <div className="text-center text-sm text-grey-dark mt-4">

                            <a
                                className="no-underline border-b border-grey-dark text-grey-dark"
                                href="#"
                            >
                                Terms of Service
                            </a>{" "}
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


    );
};

export default ForgotPassword;
