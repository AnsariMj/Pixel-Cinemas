import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { server } from "../../server";

const AddTiming = (props) => {
  const [data, setData] = useState({
    movie: "",
    time: "",
  });

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${server}movie/get-all-movie`);

        if (res) {
          setMovie(res.data);
        } else {
          console.log("Error getting movie");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}timing/create-timing`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        toast.success("Timing Added successfully");
        setData({ movie: "", time: "" });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto flex justify-center items-center h-screen">
        <div className="bg-teal-600 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-6 text-white">ADD TIMING</h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="time" className="text-teal-100 text-lg block mb-2">Add Timing</label>
              <input
                id="time"
                type="time"
                name="time"
                value={data.time}
                className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-teal-500"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="movie" className="text-teal-100 text-lg block mb-2">Select Movie</label>
              <select
                className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:border-teal-500"
                name="movie"
                value={data.movie}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select movie</option>
                {movie &&
                  movie.map(
                    (movie, i) =>
                      movie.data.type === "now" && (
                        <option key={i} value={movie.data.title}>
                          {movie.data.title}
                        </option>
                      )
                  )}
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-900 text-white rounded-lg py-2 px-4 hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Add Timing
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTiming;
