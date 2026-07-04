"use client";


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

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <h1 className="text-lg font-bold text-gray-800 mb-4 text-center">
        All Subjects
      </h1>

      {subjects.length === 0 ? (
        <p className="text-center text-gray-500">No subjects found...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2">

          {subjects.map((subject) => (
            <Link
              key={subject._id}
              className="rounded-sm overflow-hidden shadow-sm bg-white transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
              href={`/subjectDetail/${subject._id}`}
            >
              <div className="w-full h-16 sm:h-20 md:h-28 overflow-hidden">
                <img
                  src={subject?.image?.url}
                  alt={subject.title}
                  className="w-full h-full object-cover block transition-transform duration-300 hover:scale-110"
                />
              </div>

              <div className="bg-[#2B3F43] p-1 sm:p-2">
                <h2 className="text-[10px] sm:text-sm font-semibold text-white truncate">
                  {subject.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subjects;