import React from "react";
import { useNavigate } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const images = [
    "https://www.cpbc.pl/Global/CPBC/486x324%20cpbc1.png",
    "https://www.cpbc.pl/Global/CPBC/486x323%20so%20you%20can%20be%20you.jpg",
    "https://www.cpbc.pl/Global/1_Corporate_website/Career/New%20career%20pages/Master%20thesis%20363%20x542.png",
    "https://www.cpbc.pl/Global/CPBC/363x242%20CP%20HQ.png",
  ];

  return (
    <div className="flex flex-col items-center justify-center ">
      {/* Logo */}
      <div className="w-full flex justify-center border-b bg-[#f5f5f5] py-4">
        <img
          alt="Coloplast_Logo"
          src="https://www.coloplast.pl/Global/03_Default%20images/CP_Logo_Deep_Blue_RGB.png"
          className="w-48 max-w-full h-auto object-contain"
        />
      </div>

      {/* Slider + Intro */}
      <div className="w-full flex justify-center border-b bg-white">
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl px-5 py-6">
          <div className="w-full md:w-1/2">
            <ImageSlider images={images} />
          </div>
          <div className="w-full md:w-1/2 flex items-center">
            <p className="text-lg text-[#6f6f6f] leading-relaxed text-justify">
              <strong>Coloplast</strong> creates products and services that make
              life easier for people facing very personal and sensitive medical
              challenges. <br />
              But how well do you really know our solutions? Think you’re
              already an expert on Coloplast and everything we do? <br />
              Let’s put your knowledge to the test!
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Info */}
      <div className="w-full flex flex-col items-center justify-center bg-[#f5f5f5] border-b px-5 py-8 rounded-b-2xl">
        <div className="max-w-xl text-[#6f6f6f] text-lg leading-relaxed">
          <h2 className="text-2xl font-bold text-[#6f6f6f] mb-1">
            Test your knowledge of Coloplast!
          </h2>
          <p>
            This quiz is a great opportunity to check how much you know about
            our products, processes, and the company itself.
          </p>
          <p>
            There will be quizzes from different categories to choose from.
            You’ll face one-choice questions — no going back. But don’t worry —
            it’s not a test, it’s a fun way to learn!
          </p>
          <p>
            You can take the quiz as many times as you like. Each attempt is a
            chance to improve your score and strengthen your understanding.
          </p>
          <p className="font-semibold">
            Give it a try and see how well you really know Coloplast!
          </p>
        </div>

        <div className="mt-6">
          <motion.button
            initial={{ opacity: 0, y: 0.5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/Category")}
            className="text-white px-6 py-3 bg-[#17b7cf] transition hover:shadow-lg rounded-[24px] hover:underline text-2xl"
          >
            Start Quiz
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Home;
