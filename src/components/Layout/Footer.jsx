import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative mt-[16rem] xl:mt-20 bg-gray-900 px-4 pt-20">
     
      <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-white p-2">
        <img className="h-full object-contain" src="https://github.com/omprakash2929/Image/blob/main/logo/bag.gif?raw=true" alt />
      </div>
      <nav
        aria-label="Footer Navigation"
        className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left"
      >
        <Link to="/" className="font-medium text-white">
          Home
        </Link>
        <Link to="/" className="font-medium text-white">
          Support
        </Link>
        <Link to="/" className="font-medium text-white">
          Privacy Policy
        </Link>
        <Link to="/" className="font-medium text-white">
          Terms &amp; Conditions
        </Link>
      </nav>
      <p className="py-10 text-center text-gray-300 font-pop">
        © 2023 pixelmart | All Rights Reserved | create By omprakash
      </p>
    </footer>
  );
};

export default Footer;
