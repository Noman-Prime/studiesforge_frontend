"use client"

import Slider from "@/components/slider"
import Subjects from "@/components/subject"
import SubjectsTopic from "@/components/subjectsTopic"
import { useEffect } from "react"

const Home = () => {
  return (
    <>
      <main>
        <Slider />
        <Subjects />
        <SubjectsTopic />
      </main>
    </>
  )
}

export default Home