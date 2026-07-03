"use client";

const About = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-gray-800 px-6 md:px-20 py-16">

      <section className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-[#2B3F43]">
          About MoonAcademy
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-gray-500">
          A simple platform built to help students prepare for MDCAT with ease.
        </p>
      </section>

      <section className="max-w-4xl mx-auto space-y-6 text-gray-600 leading-7 text-sm md:text-base">

        <p>
          MoonAcademy is an educational platform designed for students who want
          to improve their understanding of subjects, practice MCQs, and prepare
          for competitive exams like MDCAT.
        </p>

        <p>
          Our goal is to make learning simple, structured, and accessible for
          everyone. We organize content into subjects, topics, notes, and
          practice tests so students can learn step by step.
        </p>

        <p>
          We believe consistency and practice are the key to success, and this
          platform is built to support that journey.
        </p>

      </section>

      <section className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 text-center border border-gray-200 rounded-lg bg-white hover:shadow-sm transition">
          <h3 className="text-lg font-semibold text-[#2B3F43]">Subjects</h3>
          <p className="mt-2 text-sm text-gray-500">
            Well-structured academic subjects
          </p>
        </div>

        <div className="p-6 text-center border border-gray-200 rounded-lg bg-white hover:shadow-sm transition">
          <h3 className="text-lg font-semibold text-[#2B3F43]">MCQs Practice</h3>
          <p className="mt-2 text-sm text-gray-500">
            Improve your exam preparation with practice tests
          </p>
        </div>

        <div className="p-6 text-center border border-gray-200 rounded-lg bg-white hover:shadow-sm transition">
          <h3 className="text-lg font-semibold text-[#2B3F43]">Topics</h3>
          <p className="mt-2 text-sm text-gray-500">
            Organized topic-wise structured learning
          </p>
        </div>

      </section>

    </main>
  );
};

export default About;