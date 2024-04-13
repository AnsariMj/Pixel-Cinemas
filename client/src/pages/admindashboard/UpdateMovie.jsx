import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { server } from "../../server";

const UpdateMovie = (props) => {
  const [data, setData] = useState({
    title: "",
    cast: "",
    releaseDate: "",
    director: "",
    duration: "",
    genre: "",
    format: "",
    description: "",
    link: "",
    type: "now",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `${server}movie/get-movie/${props.id}`
        );
        if (res) {
          setData(res.data.data);
        } else {
          console.log("Error getting movie");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [props.id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleTypeChange = (e) => {
    setData({ ...data, type: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${server}movie/update-movie/${props.id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        toast.success("Movie Updated Successfully");

        navigate("/all-movie")
      } else {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container items-center justify-center text-center bg-teal-600">
        <h1 className="text-xl mt-2 font-semibold">MOVIE DETAILS</h1>
        <div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            <div className="flex flex-col m-4">
              <label htmlFor="title" className="text-teal-100 text-xl">
                Add Movie
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={data.title}
                className="text-black text-xl p-1"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col m-4">
              <label htmlFor="cast" className="text-teal-100 text-xl">
                Add Cast
              </label>
              <input
                id="cast"
                type="text"
                name="cast"
                value={data.cast}
                className="text-black text-xl p-1"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col m-4">
              <label htmlFor="releaseDate" className="text-teal-100 text-xl">
                Add Release Data
              </label>
              <input
                id="releaseDate"
                type="date"
                name="releaseDate"
                value={data.releaseDate}
                className="text-black text-xl p-1"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col m-4">
              <label htmlFor="director" className="text-teal-100 text-xl">
                Add Director
              </label>
              <input
                id="director"
                type="text"
                name="director"
                value={data.director}
                className="text-black text-xl p-1"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col m-4">
              <label htmlFor="duration" className="text-teal-100 text-xl">
                Add Duration
              </label>
              <input
                id="duration"
                type="text"
                name="duration"
                value={data.duration}
                className="text-black text-xl p-1"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col m-4">
              <label htmlFor="genre" className="text-teal-100 text-xl">
                Add Genre
              </label>
              <input
                id="genre"
                type="text"
                name="genre"
                value={data.genre}
                className="text-black text-xl p-1"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col m-4">
              <label htmlFor="format" className="text-teal-100 text-xl">
                Add Format
              </label>
              <input
                id="format"
                type="text"
                name="format"
                value={data.format}
                className="text-black text-xl p-1"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col m-4">
              <label htmlFor="description" className="text-teal-100 text-xl">
                Add Description
              </label>
              <input
                id="description"
                type="text"
                name="description"
                value={data.description}
                className="text-black text-xl p-1"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col m-4">
              <label htmlFor="link" className="text-teal-100 text-xl">
                Add Link
              </label>
              <input
                id="link"
                type="text"
                name="link"
                value={data.link}
                className="text-black text-xl p-1"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col m-4">
              <label htmlFor="type" className="text-teal-100 text-xl">
                Add Type
              </label>
              <select
                name="type"
                id="type"
                className="text-black"
                value={data.type}
                onChange={handleTypeChange}
              >
                <option value="now">Now Showing</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn bg-blue-900 rounded m-11 text-xl p-2 hover:bg-slate-900"
            >
              Update Movie
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateMovie;
