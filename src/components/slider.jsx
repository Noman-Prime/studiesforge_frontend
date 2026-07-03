"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const [position, setPosition] = useState(0);

  // Fetch initial data
  const getSlider = async () => {
    try {
      const result = await axios.get(
        "http://localhost:5000/api/v1/slider/get/all",
        { withCredentials: true }
      );

      if (result.data) {
        setSliders(result.data.slider);
        setPosition(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSlider();
  }, []);

  // SSE connection
  useEffect(() => {
    const SSE = new EventSource(
      "http://localhost:5000/api/v1/slider/stream"
    );

    SSE.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data && data.slider) {
          setSliders(data.slider);
          setPosition(0);
        }
      } catch (error) {
        console.log(`parse error: ${error}`);
      }
    };

    SSE.onerror = (error) => {
      console.log(`SSE stream error: ${error}`);
    };

    return () => {
      SSE.close();
    };
  }, []);

  // Auto slide
  useEffect(() => {
    if (sliders.length === 0) return;

    const interval = setInterval(() => {
      setPosition((prev) =>
        prev === sliders.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [sliders]);

  // Next
  const next = () => {
    if (position < sliders.length - 1) {
      setPosition(position + 1);
    }
  };

  // Prev
  const prev = () => {
    if (position > 0) {
      setPosition(position - 1);
    }
  };

  return (
    <>
      {sliders.length > 0 && (
        <div
          className="relative w-full overflow-hidden h-[240px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
        >
          {/* Image */}
          <img
            src={sliders[position]?.image?.url}
            alt="slider"
            className="w-full h-full object-cover object-center transition-all duration-500"
          />

          {/* Description */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm text-white text-sm md:text-base font-semibold rounded-lg text-center">
            {sliders[position]?.description}
          </div>

          {/* Prev */}
          {sliders.length > 1 && (
            <button
              onClick={prev}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 
                         bg-black/40 hover:bg-black/70 text-white 
                         p-2 sm:p-3 rounded-full"
            >
              &#10094;
            </button>
          )}

          {/* Next */}
          {sliders.length > 1 && (
            <button
              onClick={next}
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 
                         bg-black/40 hover:bg-black/70 text-white 
                         p-2 sm:p-3 rounded-full"
            >
              &#10095;
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Slider;