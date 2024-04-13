import { FilmIcon } from "@heroicons/react/24/solid";
import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsWhatsapp
} from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";
import Item from "./Item.jsx";
import { LINKS, SUPPORT } from "./Menus";

const Footer = () => {
  return (
    <div className="flex flex-col min-h-screen  "
      style={{ position: "relative", bottom: 0, width: "100%" }}
    >
      <div className="flex-grow">
      </div>

      <footer className="bg-gray-900 flex flex-col text-white mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 sm:px-8 px-5 py-16">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="font-bold text-3xl  font-serif cursor-pointer text-white flex items-center gap-1"
          >
            <FilmIcon className="w-20 h-20  text-orange-500" />
            <span>Pixel Cinemas</span>
          </div>
          <Item Links={LINKS} title="LINKS" />
          <Item Links={SUPPORT} title="CONTACT INFO" />
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
          text-center pt-2 text-gray-400 text-sm pb-8"
        // style={{ position: "fixed", bottom: 0, width: "100%" }}
        >
          <span className="sm:col-span-2 lg:col-span-1">
            © 2023 Pixel Cinemas. All rights reserved.
          </span>
          <span className="sm:col-span-2 lg:col-span-1">Terms · Privacy Policy</span>
          <div className="flex justify-center sm:justify-end lg:justify-center gap-5 px-4 sm:px-20">
            <BsFacebook className="hover:text-orange-600 text-3xl" />
            <BsWhatsapp className="hover:text-orange-600 text-3xl" />
            <BsInstagram className="hover:text-orange-600 text-3xl" />
            <RiTwitterXFill className="hover:text-orange-600 text-3xl" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
