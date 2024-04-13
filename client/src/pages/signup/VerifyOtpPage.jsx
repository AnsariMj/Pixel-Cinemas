import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { server } from '../../server';

const VerifyOtpPage = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { email: passedEmail } = location.state || {};


    const handleVerification = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${server}auth/verifyOtp`, { email, otp });

            if (response.status === 200) {
                toast.success("OTP Verification Successful")
                setMessage(response.data.message);
                navigate('/change-password', { state: { email } });
            } else {
                setMessage('Please Provide Correct Credentials');
            }
        } catch (error) {
            toast.warning("Please Enter Valid Email and OTP")
            console.error('Error:', error.message);
            setMessage(' Please Provide Correct Credentials....!');
        }
    };
    useEffect(() => {
        if (passedEmail) {
            setEmail(passedEmail);
        }
    }, [passedEmail]);

    return (
        <>
            <div>
                <div className="bg-grey-lighter mt-10 min-h-screen flex flex-col">
                    <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center ">
                        <div className="bg-teal-900 px-6 py-6 rounded shadow-md text-white w-full">
                            <h1 className="mb-8 text-3xl text-center">Verify OTP</h1>

                            <form onSubmit={handleVerification}>

                                <label htmlFor=""> Enter Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className=" text-black block border border-grey-light w-full p-3 rounded mb-4"
                                    name="email"
                                    placeholder="Email"
                                    autoComplete="off"
                                />
                                <label htmlFor=""> Enter  OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className=" text-black block border border-grey-light w-full p-3 rounded mb-4"
                                    name="otp"
                                    placeholder="OTP"
                                    autoComplete="off"
                                />
                                <p>{message}</p>
                                <button
                                    type="submit"
                                    className="w-full text-center py-2 rounded bg-teal-600 text-white hover:bg-green-600 focus:outline-none my-1"
                                >
                                    Verify OTP
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
        </>
    );
};

export default VerifyOtpPage;
