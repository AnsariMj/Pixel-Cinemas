import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import Success from "./components/Success";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Nav";
import About from "./pages/About/About";
import AddBanner from "./pages/admindashboard/AddBanner";
import AddMovie from "./pages/admindashboard/AddMovie";
import AddTiming from "./pages/admindashboard/AddTiming";
import BannerDetails from "./pages/admindashboard/BannerDetails";
import Dashboard from "./pages/admindashboard/Dashboard";
import MovieDetails from "./pages/admindashboard/MovieDetails";
import AdminProfile from "./pages/admindashboard/Profile";
import UpdateMovie from "./pages/admindashboard/UpdateMovie";
import UserDetails from "./pages/admindashboard/UserDetails";
import ContactPage from "./pages/contact/ContactPage";
import Details from "./pages/details/Details";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import ChangePasswordPage from "./pages/signup/ChangePasswordPage";
import ForgotPassword from "./pages/signup/ForgotPassword";
import SignUp from "./pages/signup/Signup";
import VerifyOtpPage from "./pages/signup/VerifyOtpPage";
import TicketPage from "./pages/ticket/TicketPage";
import { server } from "./server";
function App() {
  const token = localStorage.getItem("token");

  const [role, setRole] = useState("user");
  useEffect(() => {
    const getRole = async () => {
      const response = await axios.get(`${server}auth/role`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setRole(response.data.role);
    };

    getRole();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <>
        {role === "admin" ? (
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route path="/add-movie" element={<AddMovie />} />
              <Route path="/add-timing" element={<AddTiming />} />
              <Route path="/add-banner" element={<AddBanner />} />
              <Route path="/all-banner" element={<BannerDetails />} />
              <Route path="/all-movie" element={<MovieDetails />} />
              <Route path="/user-details" element={<UserDetails />} />
              <Route path="/user-profile/:id" element={<AdminProfile />} />
              <Route path="/update-movie/:id" element={<UpdateMovieWithId />} />
            </Route>
          </Routes>
        ) : (
          <>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOtpPage />} />
              <Route path="/change-password" element={<ChangePasswordPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/success" element={<Success />} />
              <Route path="/movie-details/:id" element={<MovieDetailsGetParams />} />
              <Route path="/movie-details/timing/:id" element={<TimingGetParams />} />
            </Routes>
            <Footer />
          </>
        )}
      </>
    </>
  );
}

function MovieDetailsGetParams() {
  const { id } = useParams();
  return <Details id={id} />;
}

function TimingGetParams() {
  const { id } = useParams();
  return <TicketPage id={id} />;
}

function UpdateMovieWithId() {
  const { id } = useParams();
  return <UpdateMovie id={id} />;
}

export default App;
