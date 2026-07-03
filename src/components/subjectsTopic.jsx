"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const SubjectsTopic = () => {

    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/topic/by_subject", {
                withCredentials: true
            })

            if (res.data?.data) setData(res.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="bg-gray-100 min-h-screen py-4 px-3">
            <div className="max-w-6xl mx-auto space-y-10">

                {data.map((item) => (
                    <section key={item.subject._id} className="space-y-4">

                        <div className="flex items-center justify-between border-b border-gray-300 pb-2">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                {item.subject.title}
                            </h2>

                            <Link
                                href={`/subjectDetail/${item.subject._id}`}
                                className="text-xs sm:text-sm text-gray-600 hover:text-black flex items-center gap-1"
                            >
                                View All
                                <ChevronRight size={14} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 justify-items-center">

                            {item.topics?.slice(0, 3).map((topic) => {

                                const imageUrl = topic?.image?.url

                                return (
                                    <Link
                                        key={topic._id}
                                        href={`/topic/${topic._id}`}
                                        className="group w-full max-w-[160px] bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
                                    >

                                        <div className="h-16 sm:h-20 bg-gray-200 overflow-hidden">
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={topic.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        <div className="bg-[#2B3F43] px-2 py-1">
                                            <h3 className="text-[10px] sm:text-xs text-white font-semibold truncate">
                                                {topic.title}
                                            </h3>
                                        </div>

                                    </Link>
                                )
                            })}

                        </div>
                    </section>
                ))}

            </div>
        </div>
    )
}

export default SubjectsTopic