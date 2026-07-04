"use client";

import Slider from "@/components/slider";
import Subjects from "@/components/subject";
import SubjectsTopic from "@/components/subjectsTopic";

const Home = () => {
  return (
    <div className="flex flex-col gap-12 pb-12">
      <Slider />
      <Subjects />
      <SubjectsTopic />
    </div>
  );
};

export default Home;