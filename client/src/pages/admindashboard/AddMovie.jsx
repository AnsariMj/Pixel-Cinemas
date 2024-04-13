import axios from 'axios';
import React, { useState } from 'react';
import { toast } from "react-toastify";
import { server } from '../../server';

const AddMovie = () => {
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
        type: "now"
    });
    const [photo, setPhoto] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'releaseDate') {
            const today = new Date();
            const selectedDate = new Date(value);

            if (selectedDate < today) {
                setError("Release date cannot be a past date.");
                setTimeout(() => {
                    setError("");
                }, 3000);
                return;
            }
        }

        // Update the state with the new input value
        setData({ ...data, [name]: value });
    };

    const handleTypeChange = (e) => {
        setData({ ...data, type: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const selectedFile = e.target.files[0];
        setPhoto(selectedFile);
    };

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");

        e.preventDefault();
        try {
            const totaldata = {
                data,
                photo: photo
            };
            const response = await axios.post(`${server}movie/add-movie`, totaldata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: token
                }
            });

            if (response) {
                toast.success("Movie Added successfully");
                setData({
                    title: "",
                    cast: "",
                    releaseDate: "",
                    director: "",
                    duration: "",
                    genre: "",
                    format: "",
                    description: "",
                    link: "",
                    type: ""
                });
                setPhoto([]);
            } else {
                console.log(error);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="container mx-auto flex justify-center items-center h-fit">
            <div className='bg-teal-600 p-8 rounded-lg shadow-lg'>
                <h1 className="text-3xl font-bold text-white mt-6 mb-8">ADD MOVIE</h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <div className="flex flex-col m-4">
                        <label htmlFor="title" className="text-white text-lg font-semibold">Title</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            className="text-black p-2 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col m-4">
                        <label htmlFor="cast" className="text-white text-lg font-semibold">Cast</label>
                        <input
                            id="cast"
                            type="text"
                            name="cast"
                            value={data.cast}
                            className="text-black p-2 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
                            onChange={handleInputChange}
                            required

                        />
                    </div>
                    <div className="flex flex-col m-4">
                        <label htmlFor="releaseDate" className="text-white text-lg font-semibold">Release Date</label>
                        <input
                            id="releaseDate"
                            type="date"
                            name="releaseDate"
                            // max={new Date.now}
                            value={data.releaseDate}
                            className="text-black p-2 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
                            onChange={handleInputChange}
                            required

                        />
                    </div>
                    <div className="flex flex-col m-4">
                        <label htmlFor="director" className="text-white text-lg font-semibold">Director</label>
                        <input
                            id="director"
                            type="text"
                            name="director"
                            value={data.director}
                            className="text-black p-2 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
                            onChange={handleInputChange}
                            required

                        />
                    </div>
                    <div className="flex flex-col m-4">
                        <label htmlFor="duration" className="text-white text-lg font-semibold">Duration</label>
                        <input
                            id="duration"
                            type="text"
                            name="duration"
                            value={data.duration}
                            className="text-black p-2 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
                            onChange={handleInputChange}
                            required

                        />
                    </div>
                    <div className="flex flex-col m-4">
                        <label htmlFor="genre" className="text-white text-lg font-semibold">Genre</label>
                        <input
                            id="genre"
                            type="text"
                            name="genre"
                            value={data.genre}
                            className="text-black p-2 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
                            onChange={handleInputChange}
                            required

                        />
                    </div>
                    <div className="flex flex-col m-4">
                        <label htmlFor="format" className="text-white text-lg font-semibold">Format</label>
                        <input
                            id="format"
                            type="text"
                            name="format"
                            value={data.format}
                            className="text-black p-2 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
                            onChange={handleInputChange}
                            required

                        />
                    </div>
                    <div className="flex flex-col m-4">
                        <label htmlFor="description" className="text-white text-lg font-semibold">Description</label>
                        <input
                            id="description"
                            type="text"
                            name="description"
                            value={data.description}
                            className="text-black p-2 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
                            onChange={handleInputChange}
                            required

                        />
                    </div>
                    <div className="flex flex-col m-4">
                        <label htmlFor="link" className="text-white text-lg font-semibold">Link</label>
                        <input
                            id="link"
                            type="text"
                            name="link"
                            value={data.link}
                            className="text-black p-2 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
                            onChange={handleInputChange}
                            required

                        />
                    </div>
                    <div className="flex flex-col m-4">
                        <label htmlFor="photo" className="text-white text-lg font-semibold">Upload Movie Photo</label>
                        <input
                            id="photo"
                            type="file"
                            name="photo"
                            className="text-black p-2 rounded border border-gray-300 focus:outline-none focus:border-teal-500"
                            onChange={handlePhotoChange}
                            required

                        />
                    </div>
                    <div className="flex flex-col m-4">
                        <label htmlFor="type" className="text-white text-lg font-semibold">Type</label>
                        <select name="type" id="type" className="text-black p-2 rounded border border-gray-300 focus:outline-none focus:border-teal-500" value={data.type} onChange={handleTypeChange}>
                            <option value="now">Now Showing</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                    </div>

                    <div flex flex-col m-4>

                        <button
                            type="submit"
                            className="bg-blue-900 text-white rounded-lg p-4 mt-8 mx-5 hover:bg-blue-700 transition duration-300 ease-in-out"
                        >
                            Add Movie
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default AddMovie;
