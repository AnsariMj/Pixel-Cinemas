import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";

const MovieDetails = () => {
  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${server}movie/get-all-movie`);
        if (res) {
          setData(res.data);
        } else {
          console.log("Error getting movie");
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTime = async () => {
      try {
        const res = await axios.get(`${server}timing/get-timing`);
        if (res) {
          setTime(res.data);
        } else {
          console.log("Error getting movie timing");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchTime();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this movie?");
    if (confirmed) {
      try {
        await axios.delete(`${server}movie/delete-movie/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          }
        });
        setData(data.filter(movie => movie._id !== id));
        toast.success("Movie deleted successfully");
      } catch (error) {
        console.error("Error while deleting movie:", error);
      }
    }
  };

  const handleTimingDelete = async (id, title, time) => {
    console.log("Deleting timing:", id);
    const confirmed = window.confirm("Are you sure you want to delete this timing?");
    if (confirmed) {
      try {
        await axios.delete(`${server}timing/delete-timing/${title}/${time}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          }
        });
        const updatedTimings = time.filter(timing => timing._id !== id);
        setTime(updatedTimings);
        toast.success("Movie timing deleted successfully");
      } catch (error) {
        console.error("Error while deleting movie timing:", error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
      {data.map((movie) => (
        <div key={movie._id} className="rounded-lg bg-white shadow-md p-4">
          <img src={movie.photo} alt={movie.data.title} className="w-full h-3/6 mb-4 rounded-lg " />
          <div className="text-center">
            <p className="text-sm font-bold text-neutral-900 dark:text-neutral-600  mb-2">
              {movie.data.type === "now" ? "Now Showing" : "Coming Soon"}
            </p>
            <h5 className="text-lg font-semibold text-neutral-900 dark:text-neutral-600  mb-2">{movie.data.title}</h5>
            <p className="text-sm text-neutral-600 dark:text-neutral-800 font-bold mb-4">{movie.data.description.slice(0, 100)}...</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-800 font-bold mb-2">Cast: {movie.data.cast}</p>
            <div className="flex justify-center mb-4">
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleDelete(movie._id)}
              >
                Delete
              </button>
              <Link
                to={`/update-movie/${movie._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </Link>
            </div>
            <div className="text-black font-bold my-2">
              Show Time
            </div>
            <div className="flex flex-wrap justify-center">
              {time.map((timing) => (
                movie.data.title === timing.movie && (

                  <button
                    key={timing._id}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-2 mr-2 hover:bg-blue-600"
                    onClick={() => handleTimingDelete(timing._id, movie.data.title, timing.time)}
                  >
                    {timing.time}
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieDetails;
