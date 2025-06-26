import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, [auth]);

  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 shadow-2xl border-b rounded-t-3xl border-gray-300 bg-[linear-gradient(90deg,rgba(42,123,155,1)_0%,rgba(87,199,133,1)_52%,rgba(237,221,83,1)_94%)]">
      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="text-white px-4 py-2 transition hover:shadow-lg rounded-[24px] hover:underline text-2xl"
        >
          <img
            alt="Coloplast Logo"
            src="https://www.coloplast.pl/Global/03_Default%20images/CP_Logo_Deep_Blue_RGB.png"
            className="w-48 max-w-full h-auto object-contain"
          />
        </motion.button>
      </Link>

      <nav>
        <ul className="flex space-x-8 text-white text-base font-semibold items-center">
          {isLoggedIn ? (
            <>
              <li
                className="cursor-pointer hover:underline transition"
                onClick={() => navigate("/quiz")}
              >
                Quiz
              </li>
              <li className="cursor-pointer hover:underline transition" onClick={onLogout}>
                Logout</li>
            </>
          ) : (
            <li
              className="cursor-pointer hover:underline transition"
              onClick={() => navigate("/signIn")}
            >
              Sign In
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
