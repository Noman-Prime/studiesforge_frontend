"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Layers, Video, FileText } from "lucide-react";

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const [position, setPosition] = useState(0);

  const getSlider = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/v1/slider/get/all`,
        { withCredentials: true }
      );

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

    const SSE = new EventSource(
      `${process.env.NEXT_PUBLIC_API}/api/v1/slider/stream`
    );

    SSE.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data?.slider) {
          setSliders(data.slider);
        }

      } catch (error) {
        console.error("SSE parse error:", error);
      }
    };


    return () => SSE.close();

  }, []);



  useEffect(() => {

    if (sliders.length === 0) return;

    const interval = setInterval(() => {

      setPosition((prev) =>
        prev === sliders.length - 1 ? 0 : prev + 1
      );

    }, 5000);


    return () => clearInterval(interval);

  }, [sliders]);



  if (sliders.length === 0) return null;


  return (

    <section className="bg-gradient-to-br from-[#eef5f6] via-[#f8fafc] to-white px-6 lg:px-16 py-5">


      <div className="max-w-[1500px] mx-auto">


        <div className="grid lg:grid-cols-10 gap-8 items-center">


          <div className="lg:col-span-3">


            <div className="inline-flex px-4 py-2 rounded-full bg-[#2B3F43]/15 text-[#2B3F43] text-sm font-semibold">

              COMPLETE LEARNING PLATFORM

            </div>


            <h1 className="mt-6 text-5xl font-bold leading-tight text-[#24383c]">

              Your Journey
              <br />
              To Medical
              <br />

              <span className="text-blue-600">
                Success Starts Here
              </span>

            </h1>


            <p className="mt-6 text-lg text-[#53666a] leading-relaxed">

              Prepare smarter with organized study material,
              structured learning and exam-focused practice.

            </p>


          </div>




          <div className="lg:col-span-7">


            <div className="relative h-[520px] w-full overflow-hidden rounded-[32px] shadow-[0_25px_60px_rgba(43,63,67,0.25)]">


              {sliders.map((slider, index) => (

                <div
                  key={slider._id}
                  className={`absolute inset-0 transition-opacity duration-700 ${index === position
                    ? "opacity-100"
                    : "opacity-0"
                    }`}
                >

                  <img
                    src={slider.image?.url}
                    alt={slider.description || "Slider"}
                    className="h-full w-full object-cover"
                  />


                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />


                  <div className="absolute bottom-8 left-8 right-8">

                    <p className="rounded-2xl bg-white/10 px-6 py-4 text-lg font-medium text-white backdrop-blur-md border border-white/20">

                      {slider.description}

                    </p>

                  </div>


                </div>

              ))}




              {sliders.length > 1 && (

                <>

                  <button
                    onClick={() =>
                      setPosition((p) =>
                        p === 0
                          ? sliders.length - 1
                          : p - 1
                      )
                    }
                    className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur hover:bg-black/50"
                  >

                    <ChevronLeft size={24} />

                  </button>



                  <button
                    onClick={() =>
                      setPosition((p) =>
                        p === sliders.length - 1
                          ? 0
                          : p + 1
                      )
                    }
                    className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-3 text-white backdrop-blur hover:bg-black/50"
                  >

                    <ChevronRight size={24} />

                  </button>


                </>

              )}


            </div>


          </div>


        </div>




        <div className="mt-8 flex flex-wrap gap-4">


          <div className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 shadow-[0_8px_25px_rgba(43,63,67,0.12)] border border-gray-200 text-[#2B3F43] font-medium">

            <Layers size={18} />
            Topic Wise Learning

          </div>



          <div className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 shadow-[0_8px_25px_rgba(43,63,67,0.12)] border border-gray-200 text-[#2B3F43] font-medium">

            <BookOpen size={18} />
            Chapter Wise MCQs

          </div>



          <div className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 shadow-[0_8px_25px_rgba(43,63,67,0.12)] border border-gray-200 text-[#2B3F43] font-medium">

            <Video size={18} />
            Video Lectures

          </div>



          <div className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 shadow-[0_8px_25px_rgba(43,63,67,0.12)] border border-gray-200 text-[#2B3F43] font-medium">

            <FileText size={18} />
            Study Notes

          </div>


        </div>


      </div>


    </section>

  );

};


export default Slider;