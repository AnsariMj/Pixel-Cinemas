import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import { server } from "../../server";

const Details = (props) => {
  const [data, setData] = useState();
  const [time, setTime] = useState();
  const token = localStorage.getItem("token");

  const videoOptions = {
    height: "400",
    width: "640",
    playerVars: {
      autoplay: 1, // Auto-play
      mute: 1, // Muted
    },
  };

  const getVideoIdFromUrl = (url) => {
    const videoIdRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(videoIdRegex);
    return match ? match[1] : null;
  };

  const formatTime12Hour = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    let hour = parseInt(hours);
    const amOrPm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert hours to 12-hour format
    return `${hour}:${minutes} ${amOrPm}`;
  };

  const isMovieTimePassed = (screeningTime) => {
    const [hours, minutes] = screeningTime.split(":");
    const screeningDateTime = new Date();
    screeningDateTime.setHours(hours, minutes, 0, 0);

    const currentDateTime = new Date();
    return currentDateTime > screeningDateTime;
  };

  useEffect(() => {
    const fetchSingleMovieDetails = async () => {
      const response = await axios.get(`${server}movie/get-movie/${props.id}`);
      setData(response.data);
      window.scrollTo(0, 0);
    };

    const getTime = async () => {
      try {
        const res = await axios.get(`${server}timing/get-timing`);

        if (res) {
          setTime(res.data);
        } else {
          console.log("Error getting movie");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getTime();

    fetchSingleMovieDetails();
  }, [props.id]);

  return (
    <div className="mt-24">
      {data && data.data.type === "now" ? (
        <>
          <div className="text-white  text-center">
            <h1 className="text-4xl">Show Timing</h1>
            <div>
              {time &&
                time.map(
                  (screening, index) =>
                    data &&
                    data.data.title === screening.movie && (
                      <React.Fragment key={index}>
                        {isMovieTimePassed(screening.time) ? (
                          <span className="inline-block rounded-full m-4 text-xl mt-10 bg-gray-400 px-6 pb-2 pt-2.5 font-medium uppercase">
                            {formatTime12Hour(screening.time)}
                          </span>
                        ) : token ? (
                          <Link
                            to={`/movie-details/timing/${screening._id}`}
                            type="button"
                            className="inline-block rounded-full m-4 text-xl mt-10 bg-teal-700 px-6 pb-2 pt-2.5 font-medium uppercase"
                          >
                            {formatTime12Hour(screening.time)}
                          </Link>
                        ) : (
                          <Link
                            to={`/login`}
                            type="button"
                            className="inline-block rounded-full m-4 text-xl mt-10 bg-teal-700 px-6 pb-2 pt-2.5 font-medium uppercase"
                          >
                            {formatTime12Hour(screening.time)}
                          </Link>
                        )}
                      </React.Fragment>
                    )
                )}
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
        <div className="md:order-1">
          {data ? (
            <>
              <div>
                <div className=" shadow-lg border-gray-100 	 border sm:rounded-3xl p-8  flex space-x-20">
                  <div className="h-2/5 overflow-visible w-2/5">
                    <img className=" rounded-lg" src={data.photo} alt="" />
                  </div>
                  <div className="flex flex-col w-3/5 space-y-8">
                    <div className="flex justify-between items-start">
                      <h2 className="text-3xl font-bold">{data.data.title}</h2>
                    </div>
                    <hr />
                    <div className="flex  gap-20 ">
                      <div className="flex gap-10 flex-col">
                        <h2 className=" font-bold">
                          Release Date : {data.data.releaseDate}
                        </h2>
                        <h2 className=" font-bold">
                          {" "}
                          Duration : {data.data.duration}
                        </h2>
                        <h2 className=" font-bold">Cast : {data.data.cast}</h2>
                      </div>
                      <div className="flex gap-10 flex-col">
                        <h2 className=" font-bold">
                          Director : {data.data.director}
                        </h2>
                        <h2 className=" font-bold">
                          Genre : {data.data.genre}
                        </h2>
                        <h2 className=" font-bold">
                          Format : {data.data.format}
                        </h2>
                      </div>
                    </div>
                    <hr />
                    <p className=" text-gray-400 max-h-40 overflow-y-hidden">
                      Description : {data.data.description}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        <div className="md:order-2 m-auto md:mt-26">
          {data && (
            <YouTube
              videoId={getVideoIdFromUrl(data.data.link)}
              opts={videoOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
