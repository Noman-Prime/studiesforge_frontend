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
    <section className="bg-gradient-to-br from-[#eef5f6] via-[#f8fafc] to-white px-6 lg:px-16 py-16">

      <div className="max-w-[1500px] mx-auto">


        <div className="mb-12">

          <div className="inline-flex px-4 py-2 rounded-full bg-[#2B3F43]/10 text-[#2B3F43] text-sm font-semibold">
            SUBJECT LIBRARY
          </div>


          <h2 className="mt-5 text-4xl lg:text-5xl font-bold text-[#2B3F43]">
            Explore Your Subjects
          </h2>


          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Start your MDCAT preparation with organized subject-wise learning,
            practice and study resources.
          </p>


        </div>



        {subjects.length === 0 ? (

          <div className="flex h-32 items-center justify-center rounded-3xl border border-dashed border-gray-300 text-gray-500">

            No subjects available at the moment.

          </div>

        ) : (


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">


            {subjects.map((subject) => (


              <Link
                key={subject._id}
                href={`/subjectDetail/${subject._id}`}
                className="group overflow-hidden rounded-3xl bg-white/90 backdrop-blur border border-white shadow-[0_15px_40px_rgba(43,63,67,0.12)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(43,63,67,0.2)]"
              >


                <div className="relative h-60 overflow-hidden">


                  <img
                    src={subject.image?.url}
                    alt={subject.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />


                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />


                  <h3 className="absolute bottom-5 left-5 text-2xl font-bold text-white">
                    {subject.title}
                  </h3>


                </div>



                <div className="p-6">


                  <p className="text-sm text-gray-500">
                    Complete subject preparation
                  </p>


                  <div className="mt-4 flex items-center gap-2 text-[#2B3F43] font-semibold">

                    Start Learning

                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
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