
import React, { useState } from "react";
import { AiOutlineMail, AiFillUnlock } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase" 
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";

const SignUp = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

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
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const user = userData.user;

      const formDataWithoutPassword = {
        ...formData,
      };
      delete formDataWithoutPassword.password;
      formDataWithoutPassword.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataWithoutPassword);
      toast.success("Registered successfully!");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else {
        toast.error("Something went wrong!");
      }
    }
  }

  return (
    <section>
  <div className="flex justify-center items-center py-12 max-w-6xl mx-auto">
    <div className="w-full max-w-xl bg-white p-6 rounded-md shadow-md">
      <p className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</p>
      <form onSubmit={onSubmit} className="space-y-4">

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <BsFillPersonFill className="absolute top-2.5 right-3 text-xl text-gray-600" />
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Full name"
              className="w-full px-3 py-2 pr-10 text-gray-700 border rounded-md shadow-sm focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <AiOutlineMail className="absolute top-2.5 right-3 text-xl text-gray-600" />
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={onChange}
              value={email}
              className="w-full px-3 py-2 pr-10 text-gray-700 border rounded-md shadow-sm focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
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
          Sign Up
        </button>

        <div className="text-sm text-gray-600 text-center space-y-1 pt-2">
          <p>
            Have an account?
            <Link
              to="/signIn"
              className="text-blue-600 hover:underline ml-1"
            >
              Sign In
            </Link>
          </p>
          <p>
            Forgot password?
            <Link
              to="/forgotPassword"
              className="text-blue-600 hover:underline ml-1"
            >
              Reset password
            </Link>
          </p>
        </div>

        {/* Register with Google / Facebook (opcjonalnie później) */}

      </form>
    </div>
  </div>
</section>
  );
};

export default SignUp;
