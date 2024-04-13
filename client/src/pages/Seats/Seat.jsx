import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
import "./Test.css";

const SeatSelection = (props) => {
  const [allSeats, setAllSeats] = useState([]);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [seatStatus, setSeatStatus] = useState([]);

  const [timing, setTiming] = useState([]);

  const [price, setPrice] = useState(0);

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTiming = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `${server}timing/get-timing/${props.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        if (response) {
          setTiming(response.data);
        }
      } catch (error) {
        console.error("Error fetching all seats:", error.message);
      }
    };

    fetchTiming();
  }, [props.id]);

  useEffect(() => {
    // Fetch all seats from the backend when the component mounts
    const fetchAllSeats = async () => {
      try {
        const response = await axios.get(
          `${server}seat/specific-seats/${timing.movie}/${timing.time}`
        );
        setAllSeats(response.data);
      } catch (error) {
        console.error("Error fetching all seats:", error.message);
      }
    };

    // Fetch seat status from the backend when the component mounts
    const fetchSeatStatus = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${server}seat/get-status/${timing.movie}/${timing.time}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        setSeatStatus(response.data);
      } catch (error) {
        console.error("Error fetching seat status:", error.message);
      }
    };
    fetchAllSeats();
    fetchSeatStatus();
  }, [timing]);

  // Function to handle seat selection
  const handleSeatClick = (seatId) => {
    // Check if the seat is already booked
    const isSeatBooked = seatStatus.find(
      (seat) => seat.id === seatId && seat.isBooked
    );

    if (!isSeatBooked) {
      const updatedSeats = selectedSeats.includes(seatId)
        ? selectedSeats.filter((id) => id !== seatId)
        : [...selectedSeats, seatId];

      setSelectedSeats(updatedSeats);
      setPrice(updatedSeats.length * 300);
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${server}seat/update-seats-status/${timing.movie}/${timing.time}`,
        {
          price,
          selectedSeats,
        },
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      const khalti = await axios.post(`${server}auth/khalti`, {
        seatId: Math.floor(Math.random() + 10),
        amount: price,
      });

      if (khalti) {
        window.location.href = khalti.data.payment_url;
      }
    } catch (error) {
      console.error("Error during booking:", error.message);
    }
  };

  return (
    <div className="relative top-24">
      <h1 className="text-4xl font-bold text-center pb-6 ">{timing.movie}</h1>
      <div className=" text-center text-2xl font-semibold text-slate-300 pb-6">
        Select Your Seat Number
      </div>
      <div className=" grid grid-cols-3  md:ml-64 sm:ml-28">
        <div className="  border-solid bg-green-600 w-20 h-7 text-center shadow-2xl rounded   ">
          Available
        </div>
        <div className=" border-solid bg-teal-600 w-20 h-7 text-center shadow-2xl rounded   ">
          Selected
        </div>
        <div className=" border-solid bg-red-700 w-20 h-7 text-center shadow-2xl rounded ">
          Sold
        </div>
      </div>

      <div className=" sm:mt-10 sm:mr-24 sm:ml-24 md:ml-36 grid grid-cols-10 ">
        {allSeats.map((seat) => (
          <div
            key={seat.id}
            onClick={() => handleSeatClick(seat.id)}
            style={{
              // margin: "auto",
              marginBottom: "20px",
              width: "35px",
              height: "35px",
              margin: "20px",
              borderRadius: "5px",
              textAlign: "center",
              boxShadow: "0 0 5px",

              backgroundColor: seatStatus.find(
                (status) => status.id === seat.id
              )?.isBooked
                ? "red"
                : selectedSeats.includes(seat.id)
                  ? "teal"
                  : "green",
              cursor: seatStatus.find((status) => status.id === seat.id)
                ?.isBooked
                ? "not-allowed"
                : "pointer",
            }}
          >
            {seat.id}
          </div>
        ))}
      </div>
      <div className="screen  ">Screen</div>
      <div className=" text-slate-300 text-center text-lg font-bold  ">
        <h1>Total Price : {price}</h1>
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
        {/* <button onClick={handleFetchBookedSeats}>Fetch Booked Seats</button> */}
        <button
          onClick={() => setOpen(!open)}
          className="p-4 mt-4 mb-20  bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xl"
        >
          Book Now
        </button>
      </div>

      {open ? (
        <>
          {" "}
          <div className="">
            <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
              <div className="w-[70%] 800px:w-[60%] h-[50vh]  800px:h-[50vh] bg-slate-900 rounded-md shadow-sm relative p-4 text-center">
                <RxCross1
                  size={30}
                  className="absolute right-3 top-3 z-50 text-white font-bold cursor-pointer"
                  onClick={() => setOpen(false)}
                />

                <h1 className="text-center text-2xl font-bold">CHECKOUT</h1>
                <h1>Movie Name : {timing.movie}</h1>
                <h1>Total Selected Seats : {selectedSeats.join(",")}</h1>
                <h1>Total Price : {price}</h1>
                <h2><strong>Pay With Khalti</strong></h2>
                <button
                  onClick={handleSubmit}
                  className="p-4 mt-4 mb-20  bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xl"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SeatSelection;
