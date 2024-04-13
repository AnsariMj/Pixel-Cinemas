import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}auth/login`, userData);
      const { token } = response.data;

      // console.log(response);

      localStorage.setItem("token", token);

      navigate("/");
      window.location.reload();
      toast.success("User login successfully");
    } catch (error) {
      toast.error("Incorrect Pssword");
      console.log("User Login Failed", error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-teal-900 px-6 py-9 rounded shadow-md text-white w-full">
            <h1 className="mb-8 text-3xl text-center">Login</h1>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="block text-black border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="block text-black border border-grey-light w-full p-3 rounded mb-4"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
                <span
                  onClick={handleTogglePassword}
                  className="absolute text-slate-600 top-1 right-0 mt-3 mr-4 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button
                type="submit"
                className="w-full text-center py-2 rounded bg-teal-600 text-white hover:bg-teal-700 focus:outline-none my-1"
              >
                Login
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

          <div className="flex gap-10">
            <div className="text-grey-dark  mt-6">
              <Link className=" underline  hover:text-teal-600" to="/forgot">
                Forgot Password?

              </Link>
            </div>

            <div className="text-grey-dark mt-6">
              Don't have an account?
              <Link className=" underline hover:text-teal-400" to="/sign-up">
                Signup
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
