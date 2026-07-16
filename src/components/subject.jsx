"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);

  const getSubjects = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/v1/subject/all`,
        { withCredentials: true }
      );

      if (data?.subject) {
        setSubjects(data.subject);
      }

    } catch (error) {
      console.error("Subjects fetch error:", error);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <section className="bg-gradient-to-br from-[#eef5f6] via-[#f8fafc] to-white px-4 py-12 lg:px-16 lg:py-16">

      <div className="mx-auto max-w-[1500px]">


        <div className="mb-10">


          <h2 className="text-3xl font-bold text-[#2B3F43] sm:text-4xl lg:text-5xl">
            Explore Your Subjects
          </h2>


          <p className="mt-3 max-w-2xl text-sm text-gray-600 sm:text-lg">
            Start your MDCAT preparation with organized subject-wise learning,
            practice and study resources.
          </p>


        </div>



        {subjects.length === 0 ? (

          <div className="flex h-32 items-center justify-center rounded-3xl border border-dashed border-gray-300 text-gray-500">

            No subjects available at the moment.

          </div>

        ) : (


          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">


            {subjects.map((subject) => (


              <Link
                key={subject._id}
                href={`/subjects/${subject._id}`}
                className="group overflow-hidden rounded-2xl bg-white/90 backdrop-blur border border-white shadow-[0_15px_40px_rgba(43,63,67,0.12)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(43,63,67,0.2)]"
              >


                <div className="relative h-36 overflow-hidden sm:h-48 lg:h-60">


                  <img
                    src={subject.image?.url}
                    alt={subject.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />


                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />


                  <h3 className="absolute bottom-3 left-3 text-lg font-bold text-white sm:bottom-5 sm:left-5 sm:text-2xl">
                    {subject.title}
                  </h3>


                </div>



                <div className="p-3 sm:p-6">


                  <p className="hidden text-sm text-gray-500 sm:block">
                    Complete subject preparation
                  </p>


                  <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#2B3F43] sm:mt-4 sm:gap-2 sm:text-base">

                    Start Learning

                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1 sm:h-[18px] sm:w-[18px]"
                    />

                  </div>


                </div>


              </Link>


            ))}


          </div>


        )}


      </div>


    </section>
  );
};

export default Subjects;