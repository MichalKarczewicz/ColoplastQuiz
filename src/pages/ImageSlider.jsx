import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ImageSlider = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const length = images.length;
  const timeoutRef = useRef(null);
  const delay = 8000; // 10 sekund

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, delay);

    // czyścimy timeout przy odmontowaniu lub zmianie current
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  const nextSlide = () => {
    setFade(false); // zacznij znikać
    setTimeout(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
      setFade(true); // pokaż nowy obraz
    }, 500); // czas animacji w ms
  };

  const prevSlide = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
      setFade(true);
    }, 500);
  };

  if (!Array.isArray(images) || images.length === 0) return null;

  return (
    <div className="relative max-w-xl mx-auto overflow-hidden rounded-2xl shadow-lg group">
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-r hover:bg-black/60 z-10
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="text-[#17b7cf]" />
      </button>

      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className={`w-full h-80 object-cover transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-l hover:bg-black/60 z-10
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <FontAwesomeIcon icon={faArrowRight} className="text-[#17b7cf]" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
