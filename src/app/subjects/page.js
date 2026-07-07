"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, BookOpenText } from "lucide-react";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSubjects = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/v1/subject/all`,
        { withCredentials: true }
      );
      setSubjects(response.data.subject || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  if (loading) return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-[#2B3F43]" />
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-[#2B3F43] sm:text-5xl">
          Browse Subjects
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Select a subject to start your learning journey.
        </p>
      </div>

      {subjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 p-20 text-gray-500">
          <BookOpenText size={48} className="mb-4 text-gray-300" />
          <p>No subjects are currently available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {subjects.map((subject) => (
            <Link
              key={subject._id}
              href={`/subjectDetail/${subject._id}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100"
            >
              <div className="relative h-40 w-full overflow-hidden sm:h-48">
                <img
                  src={subject?.image?.url}
                  alt={subject.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-1 items-center justify-center p-4">
                <h2 className="text-center font-bold text-[#2B3F43] group-hover:text-[#2B3F43]/80">
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