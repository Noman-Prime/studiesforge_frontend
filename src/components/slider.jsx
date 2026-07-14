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

        console.error(error);

      }

    };


    return () => SSE.close();


  }, []);





  useEffect(() => {

    if (!sliders.length) return;


    const interval = setInterval(() => {


      setPosition((prev) =>
        prev === sliders.length - 1 ? 0 : prev + 1
      );


    }, 5000);



    return () => clearInterval(interval);



  }, [sliders]);





  if (!sliders.length) return null;





  return (

    <section className="bg-gradient-to-br from-[#eef5f6] via-[#f8fafc] to-white px-4 py-5 lg:px-16">


      <div className="mx-auto max-w-[1500px]">





        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-10 lg:gap-8">






          <div className="order-1 lg:order-1 lg:col-span-3">


            <div className="inline-flex whitespace-nowrap rounded-full bg-[#2B3F43]/15 px-4 py-2 text-xs font-semibold text-[#2B3F43] md:text-sm">


              COMPLETE LEARNING PLATFORM


            </div>






            <div className="hidden lg:block mt-8">


              <h1 className="text-5xl font-bold leading-tight text-[#24383c]">


                Your Journey
                <br />
                To Medical
                <br />


                <span className="text-blue-600">

                  Success Starts Here

                </span>


              </h1>





              <p className="mt-6 text-lg leading-relaxed text-[#53666a]">


                Prepare smarter with organized study material,
                structured learning and exam-focused practice.


              </p>


            </div>


          </div>








          <div className="order-2 lg:order-2 lg:col-span-7">



            <div className="relative h-[300px] w-full overflow-hidden rounded-3xl shadow-[0_25px_60px_rgba(43,63,67,0.25)] md:h-[450px] lg:h-[520px]">





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


                    <p className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur-md md:text-lg">


                      {slider.description}


                    </p>


                  </div>



                </div>


              ))}






              {sliders.length > 1 && (

                <>


                  <button
                    onClick={() => setPosition(
                      position === 0
                        ? sliders.length - 1
                        : position - 1
                    )}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur"
                  >

                    <ChevronLeft size={20} />

                  </button>




                  <button
                    onClick={() => setPosition(
                      position === sliders.length - 1
                        ? 0
                        : position + 1
                    )}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur"
                  >

                    <ChevronRight size={20} />

                  </button>


                </>

              )}



            </div>



          </div>








          <div className="order-3 lg:hidden">


            <h1 className="text-3xl font-bold leading-tight text-[#24383c]">


              Your Journey
              <br />
              To Medical
              <br />


              <span className="text-blue-600">

                Success Starts Here

              </span>


            </h1>




            <p className="mt-5 text-sm leading-relaxed text-[#53666a]">


              Prepare smarter with organized study material,
              structured learning and exam-focused practice.


            </p>


          </div>



        </div>








        <div className="mt-8 flex flex-nowrap gap-3 overflow-x-auto pb-2">



          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#2B3F43] shadow-[0_8px_25px_rgba(43,63,67,0.12)]">

            <Layers size={16} />

            Topic Wise Learning

          </div>




          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#2B3F43] shadow-[0_8px_25px_rgba(43,63,67,0.12)]">

            <BookOpen size={16} />

            Chapter Wise MCQs

          </div>




          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#2B3F43] shadow-[0_8px_25px_rgba(43,63,67,0.12)]">

            <Video size={16} />

            Video Lectures

          </div>




          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-[#2B3F43] shadow-[0_8px_25px_rgba(43,63,67,0.12)]">

            <FileText size={16} />

            Study Notes

          </div>



        </div>




      </div>


    </section>

  );

};


export default Slider;