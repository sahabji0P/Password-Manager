import React from "react";

const Navbar = () => {
  const handleClick = () => {
    window.location.href = "https://github.com/sahabji0P";
  };

  return (
    <nav className="bg-gradient-to-br from-black to-gray-700">
      <div className="mycontainer justify-between flex items-center px-6 h-16 text-white">
        <div className="logo font-bold">
          <img src="/logo.png" alt="" className="w-[150px]" />
        </div>
        {/* <ul>
          <li className="flex gap-8">
            <a className="hover:text-gray-400 font-bold" href="/">
              Home
            </a>
            <a className="hover:text-gray-400 font-bold" href="#">
              About
            </a>
            <a className="hover:text-gray-400 font-bold" href="#">
              Contact Us
            </a>
          </li>
        </ul> */}
        <button onClick={handleClick}>
          <img
            className="invert p-3 w-16"
            src="icons/github.svg"
            alt="github logo"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
