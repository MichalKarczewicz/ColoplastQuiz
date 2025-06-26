import React, { useState } from "react";
import { AiOutlineMail, AiFillUnlock } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const SignIn = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const showPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      toast.info("Login");
      navigate("/");
    } catch (error) {
      toast.error("Bad user credentials");
    }
  }

  return (
    <section>
  <div className="flex justify-center items-center px-6 py-12 max-w-6xl mx-auto">
    <div className="w-full max-w-xl bg-white p-6 rounded-md shadow-md">
      <p className="text-2xl font-bold text-center text-gray-800 mb-4">Sign In</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={onChange}
            value={email}
            className="w-full px-3 py-2 text-gray-700 border rounded-md shadow-sm focus:outline-none"
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            {!passwordVisibility ? (
              <RiLockPasswordLine
                className="absolute top-2.5 right-3 text-xl text-gray-600 cursor-pointer"
                onClick={showPassword}
              />
            ) : (
              <AiFillUnlock
                className="absolute top-2.5 right-3 text-xl text-gray-600 cursor-pointer"
                onClick={showPassword}
              />
            )}
            <input
              type={passwordVisibility ? "text" : "password"}
              id="password"
              placeholder="Password"
              onChange={onChange}
              value={password}
              className="w-full px-3 py-2 pr-10 text-gray-700 border rounded-md shadow-sm focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        <div className="text-sm text-gray-600 text-center space-y-1 pt-2">
          <p>
            Don’t have an account?
            <Link
              to="/signUp"
              className="text-blue-600 hover:underline ml-1"
            >
              Sign Up
            </Link>
          </p>
          <p>
            Forgot password?
            <Link
              to="/forgotPassword"
              className="text-blue-600 hover:underline ml-1"
            >
              Reset
            </Link>
          </p>
        </div>
      </form>
    </div>
  </div>
</section>

  );
};

export default SignIn;