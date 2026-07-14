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

    <section className="bg-gradient-to-br from-[#eef5f6] via-[#f8fafc] to-white px-4 py-5 lg:px-16">


      <div className="mx-auto max-w-[1500px]">


        <div className="grid grid-cols-10 items-center gap-3 md:gap-8">



          <div className="col-span-3">


            <div className="inline-flex rounded-full bg-[#2B3F43]/15 px-3 py-1 text-[10px] font-semibold text-[#2B3F43] md:px-4 md:py-2 md:text-sm">

              COMPLETE LEARNING PLATFORM

            </div>



            <h1 className="mt-4 text-2xl font-bold leading-tight text-[#24383c] md:mt-6 md:text-5xl">


              Your Journey
              <br />
              To Medical
              <br />

              <span className="text-blue-600">
                Success Starts Here
              </span>


            </h1>



            <p className="mt-4 text-xs leading-relaxed text-[#53666a] md:mt-6 md:text-lg">

              Prepare smarter with organized study material,
              structured learning and exam-focused practice.

            </p>


          </div>





          <div className="col-span-7">


            <div className="relative h-[280px] w-full overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(43,63,67,0.25)] md:h-[520px] md:rounded-[32px]">


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



                  <div className="absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8 md:right-8">


                    <p className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white backdrop-blur-md md:px-6 md:py-4 md:text-lg">

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
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur md:left-5 md:p-3"
                  >

                    <ChevronLeft size={18} />

                  </button>



                  <button
                    onClick={() =>
                      setPosition((p) =>
                        p === sliders.length - 1
                          ? 0
                          : p + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur md:right-5 md:p-3"
                  >

                    <ChevronRight size={18} />

                  </button>


                </>

              )}


            </div>


          </div>


        </div>





        <div className="mt-6 flex flex-nowrap gap-2 overflow-x-auto pb-2 md:mt-8 md:gap-4">


          <div className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-[#2B3F43] shadow-[0_8px_25px_rgba(43,63,67,0.12)] md:px-5 md:py-3 md:text-base">

            <Layers size={14} className="md:size-[18px]" />

            Topic Wise Learning

          </div>




          <div className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-[#2B3F43] shadow-[0_8px_25px_rgba(43,63,67,0.12)] md:px-5 md:py-3 md:text-base">

            <BookOpen size={14} className="md:size-[18px]" />

            Chapter Wise MCQs

          </div>




          <div className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-[#2B3F43] shadow-[0_8px_25px_rgba(43,63,67,0.12)] md:px-5 md:py-3 md:text-base">

            <Video size={14} className="md:size-[18px]" />

            Video Lectures

          </div>




          <div className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-[#2B3F43] shadow-[0_8px_25px_rgba(43,63,67,0.12)] md:px-5 md:py-3 md:text-base">

            <FileText size={14} className="md:size-[18px]" />

            Study Notes

          </div>


        </div>


      </div>


    </section>

  );

};


export default Slider;