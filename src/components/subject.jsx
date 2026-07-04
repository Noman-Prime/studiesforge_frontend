"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);

  const getSubjects = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/subject/all`, { withCredentials: true });
      if (data?.subject) setSubjects(data.subject);
    } catch (error) {
      console.error("Subjects fetch error:", error);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  // Show only 3 subjects + the "View All" card
  const displaySubjects = subjects.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-[#2B3F43]">Popular Subjects</h2>
        <Link href="/subjects" className="flex items-center gap-1 text-sm font-semibold text-[#2B3F43] hover:underline">
          View all <ArrowRight size={16} />
        </Link>
      </div>

      {subjects.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-gray-300 text-gray-500">
          No subjects available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {displaySubjects.map((subject) => (
            <Link
              key={subject._id}
              href={`/subjectDetail/${subject._id}`}
              className="group relative block overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={subject.image?.url}
                  alt={subject.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-[#2B3F43]">{subject.title}</h3>
                <p className="text-xs text-gray-500">View Curriculum</p>
              </div>
            </Link>
          ))}

          {/* View All Card */}
          <Link
            href="/subjects"
            className="flex flex-col items-center justify-center rounded-2xl bg-[#2B3F43] p-6 text-white transition hover:bg-[#1e2d30]"
          >
            <span className="mb-2 text-3xl">→</span>
            <span className="font-bold">View All</span>
            <span className="text-xs opacity-70">Browse Library</span>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Subjects;