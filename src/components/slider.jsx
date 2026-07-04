"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const [position, setPosition] = useState(0);

  const getSlider = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/slider/get/all`, { withCredentials: true });
      if (data?.slider) {
        setSliders(data.slider);
        setPosition(0);
      }
    } catch (error) {
      console.error("Slider fetch error:", error);
    }
  };

  useEffect(() => {
    getSlider();

    const SSE = new EventSource(`${process.env.NEXT_PUBLIC_API}/api/v1/slider/stream`);
    SSE.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.slider) setSliders(data.slider);
      } catch (err) {
        console.error("SSE parse error:", err);
      }
    };

    return () => SSE.close();
  }, []);

  useEffect(() => {
    if (sliders.length === 0) return;
    const interval = setInterval(() => {
      setPosition((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
    }, 5000); // Increased to 5s for better readability
    return () => clearInterval(interval);
  }, [sliders]);

  if (sliders.length === 0) return null;

  return (
    <div className="relative h-[300px] w-full overflow-hidden shadow-lg md:h-[500px]">
      {sliders.map((slider, index) => (
        <div
          key={slider._id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === position ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
            src={slider.image?.url}
            alt={slider.description || "Slider"}
            className="h-full w-full object-cover"
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-8 left-0 w-full px-6 text-center">
            <p className="mx-auto max-w-2xl rounded-full bg-white/10 px-6 py-2 text-sm font-medium text-white backdrop-blur-md md:text-lg">
              {slider.description}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      {sliders.length > 1 && (
        <>
          <button
            onClick={() => setPosition((p) => (p === 0 ? sliders.length - 1 : p - 1))}
            className="absolute left-4 top-1/2 flex -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/40"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setPosition((p) => (p === sliders.length - 1 ? 0 : p + 1))}
            className="absolute right-4 top-1/2 flex -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/40"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default Slider;