import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent!");
    } catch (error) {
      toast.error("Something went wrong with reset password email");
    }
  }

  return (
<section>
  <div className="flex justify-center items-center px-6 py-12 max-w-6xl mx-auto">
    <div className="w-full max-w-xl bg-white p-6 rounded-md shadow-md">
      <p className="text-2xl font-bold text-center text-gray-800 mb-4">Reset Password</p>
      <form onSubmit={onSubmit} className="space-y-4">

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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
        >
          Reset Password
        </button>

        <div className="text-sm text-gray-600 text-center space-y-1 pt-2">
          <p>
            Don't have an account?
            <Link
              to="/signUp"
              className="text-blue-600 hover:underline ml-1"
            >
              Sign Up
            </Link>
          </p>
          <p>
            Remembered your password?
            <Link
              to="/signIn"
              className="text-blue-600 hover:underline ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>

      </form>
    </div>
  </div>
</section>

  );
};

export default ForgotPassword;