"use client";

// import { useStream } from "@/SSE/subject";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

const Subjects = () => {
  const [ subjects, setSubjects ] = useState([]);

  const getSubjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/subject/all",
        { withCredentials: true }
      );
      if (response.data) setSubjects(response.data.subject);
    } catch (error) {
      console.log(`Api is not working: ${error}`);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  const visibleSubjects = subjects.slice(0, 3);

  return (
    <div className="bg-gray-100 px-3 py-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-base sm:text-lg font-bold text-gray-800 mb-3 text-center">
          All Subjects
        </h1>

        {subjects.length === 0 ? (
          <p className="text-center text-gray-500 text-sm">
            No subjects found...
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">

            {visibleSubjects.map((subject) => (
              <Link
                key={subject._id}
                href={`/subjectDetail/${subject._id}`}
                className="rounded-sm overflow-hidden bg-white shadow-sm hover:shadow-md transition-transform duration-200 hover:-translate-y-0.5"
              >

                <div className="h-14 sm:h-20 md:h-24 overflow-hidden bg-gray-200">
                  {subject?.image?.url ? (
                    <img
                      src={subject.image.url}
                      alt={subject.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                <div className="bg-[#2B3F43] px-2 py-1">
                  <h2 className="text-[10px] sm:text-xs font-semibold text-white truncate">
                    {subject.title}
                  </h2>
                </div>

              </Link>
            ))}

            {/* VIEW ALL CARD */}
            <Link
              href="/subjects"
              className="rounded-sm bg-[#2B3F43] text-white flex items-center justify-center hover:opacity-90 transition"
            >
              <div className="text-center leading-tight">
                <p className="text-xs font-semibold">View All</p>
                <p className="text-[10px] opacity-80">Subjects</p>
              </div>
            </Link>

          </div>
        )}

      </div>
    </div>
  );
};

export default Subjects;