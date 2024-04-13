import axios from 'axios';
import React, { useState } from "react";
import { toast } from "react-toastify";
import { server } from "../../server";

const AddBanner = () => {
  const [data, setData] = useState({
    title: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(`${server}banner/add-banner`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        }
      });

      console.log(response);
      if (response) {
        toast.success("Banner Added successfully");
        setData({
          title: "",
          image: ""
        });
      } else {
        console.log(error);
      }
      // Clear input fields after successful submission


      // Handle success message here
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className="bg-teal-600 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6 text-white">Add Banner</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="text-teal-100 text-lg block mb-2">Banner Name</label>
            <input
              id="title"
              type="text"
              name="title"
              value={data.title}
              className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-teal-500"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="image" className="text-teal-100 text-lg block mb-2">Upload Image link</label>
            <input
              id="image"
              type="text"
              name="image"
              value={data.image}
              className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-teal-500"
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-900 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Add Banner
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBanner;