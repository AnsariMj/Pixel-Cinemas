import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SignUpGenre from "./SignUpGenre";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    selectedGenres: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}auth/register`,
        data
      );
      if (response) {
        toast.success("User Registered successfully ")
        e.target.reset();
        navigate("/login")
      } else {
        toast.success("Registration failed ")
      }
    } catch (error) {
      console.log("Registration error:", error.response || error);
      alert(error.response.data.message || error.data.message)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };


  const handleGenreChange = (selectedGenre) => {
    setData((preData) => ({

      ...preData,
      selectedGenres: [...preData.selectedGenres, selectedGenre]
    }));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="bg-grey-lighter mt-20 min-h-screen flex flex-col">
        <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center ">
          <div className="bg-teal-900 px-6 py-6 rounded shadow-md text-white w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>

            <form onSubmit={handleSubmit}>
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                className=" text-black block border border-grey-light w-full p-3 rounded mb-4"
                name="username"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
              <label htmlFor="">Password</label>
              <input
                type="password"
                className=" text-black block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                autoComplete="off"
                placeholder="Password"
                onChange={handleChange}
                required

              />
              <label htmlFor="">Email</label>
              <input
                type="email"
                className=" text-black block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
                autoComplete="off"
                onChange={handleChange}
                required

              />
              <label htmlFor="">Phone No.</label>
              <input
                type="text"
                className=" text-black block border border-grey-light w-full p-3 rounded mb-4"
                name="phoneNumber"
                placeholder="Phone Number"
                autoComplete="off"
                onChange={handleChange}
                required

              />
              <label className=" text-slate-50-400 text-lg" htmlFor="genre">
                Please Select Your Favourite Genre:
              </label>
              <SignUpGenre
                onChange={handleChange}
                onGenreChange={handleGenreChange}
              />
              <button
                type="submit"
                className="w-full text-center py-2 rounded bg-teal-600 text-white hover:bg-teal-700 focus:outline-none my-1"
              >
                Create Account
              </button>
            </form>

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
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
            <div className="text-grey-dark  mt-6">
              <Link className=" underline  hover:text-teal-600" to="/login">
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
