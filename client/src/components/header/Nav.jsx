import {
  Bars3BottomRightIcon,
  FilmIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../../pages/login/Logout";
import { server } from "../../server";
const Header = (props) => {
  const navigate = useNavigate();
  let Links = [
    { name: "HOME", link: "/" },
    { name: "ABOUT", link: "/about" },
    { name: "CONTACT", link: "/contact" },
  ];
  let [open, setOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchMovie = async () => {
    const response = await axios.get(
      `${server}movie/search?name=${searchQuery}`
    );
    if (response) {
      setSearchResults(response.data.movie);
    } else {
      console.log("No results found");
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      fetchMovie();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleClick = (id) => {
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      <div className="shadow-md w-full fixed top-0 left-0 z-50 bg-gray-900 ">
        <div className="flex items-center justify-between bg-transparent backdrop-blur-[900px] px-7 md:px-10 pt-4 pb-4">
          {/* Logo */}
          <div
            onClick={() => {
              navigate("/");
            }}
            className="font-bold text-xl cursor-pointer font-serif text-white flex items-center gap-1"
          >
            <FilmIcon className="w-7 h-7 text-orange-500" />
            <span>Pixel Cinemas</span>
          </div>

          {/* Mobile Menu Icon */}
          <div
            onClick={() => setOpen(!open)}
            className="absolute right-8 top-2 cursor-pointer md:hidden w-7 h-7 "
          >
            {open ? (
              <XMarkIcon className="text-white" />
            ) : (
              <Bars3BottomRightIcon className="text-white" />
            )}
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search Movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`absolute font-serif left-64 md:left-64 md:w-[300px] p-2 rounded-3xl border bg-transparent text-white placeholder-white focus:outline-none transition-all duration-300 ease-in ${open ? "block" : "hidden md:block"
              }`}
          />

          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static top-full left-0 w-full md:w-auto md:pl-0 pl-80  ${open ? "block" : "hidden md:block"
              } ${open ? "bg-[#051622]" : ""}`}
          >
            {Links.map((link, i) => (
              <li className="md:ml-4 my-4 md:my-0 font-semibold" key={i}>
                <Link
                  to={link.link}
                  className="show text-zinc-400 text-lg font-serif hover:text-teal-400 duration-500"
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {localStorage.getItem("token") ? (
              <>
                <li className="md:ml-4 my-4 md:my-0 font-semibold">

                  <Link to="/profile" className="text-zinc-400 text-lg font-serif hover:text-teal-400 duration-500">
                    PROFILE
                  </Link>
                </li>
                <li className="md:ml-4  md:my-0 my-4">
                  <Logout />
                </li>
              </>
            ) : (
              <li className="md:ml-4  md:my-0 my-4">
                <Link
                  onClick={handleClick}
                  to="/login"
                  className="btn hover:bg-blue-500 py-2 bg-amber-600 text-white font-serif hover:text-white font-bold text-lg px-3 py- rounded duration-500 "
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Search results */}
      {searchResults && searchResults.length > 0 && (
        <div className="fixed overflow-auto  z-20 w-full h-full bg-gray-950 bg-opacity-95 flex flex-col items-center justify-center pt-20">
          {/* Search result display code */}
          {searchResults.map((movie, i) => (
            <Link
              key={i}
              to={`/movie-details/${movie._id}`}
              onClick={handleClick}
            >
              <div
                className={`p-4 m-4 z-50 bg-teal-200 rounded-md shadow-md flex items-center w-[1000px]  ${searchResults.length === 1
                  ? "  "
                  : ""
                  }`}
              >
                <img
                  src={movie.photo}
                  alt="Movie Poster"
                  className="w-24 h-40 object-cover rounded-md mr-4"
                />
                <div>
                  <h1 className="text-xl text-gray-700 font-bold mb-2">
                    {movie.data.title}
                  </h1>
                  <h1 className="text-xl text-gray-600 font-bold mb-2">
                    {" "}
                    Cast: {movie.data.cast}
                  </h1>
                  <h1 className="text-xl text-gray-600 font-bold mb-2">
                    {" "}
                    Director: {movie.data.director}
                  </h1>
                  <p className="text-gray-600">{movie.data.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

    </>
  );
};

export default Header;
