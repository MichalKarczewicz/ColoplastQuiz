import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between p-4 shadow-2xl border-b rounded-t-3xl border-gray-300 bg-[linear-gradient(90deg,rgba(42,123,155,1)_0%,rgba(87,199,133,1)_52%,rgba(237,221,83,1)_94%)]">
      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full max-w-md text-white px-4 py-2 bg-[#17b7cf] transition hover:shadow-lg rounded-[24px] hover:underline text-2xl"
        >
          Home
        </motion.button>
      </Link>

      {/* Right side - Logo */}
      <div className="flex justify-end">
        <img
          alt="Coloplast Logo"
          src="https://www.coloplast.pl/Global/03_Default%20images/CP_Logo_Deep_Blue_RGB.png"
          className="w-48 max-w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};
export default Header;
