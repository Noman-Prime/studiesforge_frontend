"use client"

import axios from "axios"
import { use, useEffect, useState } from "react"

const Topic = ({ params }) => {
    const { id } = use(params)
    const [topic, setTopic] = useState(null)

    const getTopic = async () => {
        try {
            const result = await axios.get(
                `http://localhost:5000/api/v1/topic/get/${id}`,
                { withCredentials: true }
            )
            if (result.data?.topic) {
                setTopic(result.data.topic)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTopic()
    }, [id])

    const imageUrl = topic?.image?.url
    const videoUrl = topic?.video?.url

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                {!topic ? (
                    <div className="py-20 text-center">
                        <h2 className="text-2xl font-semibold">Topic not found</h2>
                    </div>
                ) : (
                    <div className="space-y-10">
                        {imageUrl && (
                            <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
                                <img
                                    src={imageUrl}
                                    alt={topic?.title}
                                    className="w-full h-[240px] sm:h-[340px] lg:h-[430px] object-cover"
                                />
                            </div>
                        )}

                        <section>
                            <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-black">
                                {topic?.title}
                            </h1>
                        </section>

                        <section className="border-b border-gray-200 pb-8">
                            <h2 className="text-2xl font-semibold mb-5">Topic Description</h2>
                            <div className="text-[16px] sm:text-[17px] leading-8 text-gray-800 whitespace-pre-line">
                                {topic?.description || "No description available for this topic."}
                            </div>
                        </section>

                        {videoUrl && (
                            <section className="border-b border-gray-200 pb-8">
                                <h2 className="text-2xl font-semibold mb-5">Video Lecture</h2>
                                <div className="overflow-hidden rounded-xl border border-gray-200 bg-black">
                                    <video controls className="w-full max-h-[520px]">
                                        <source src={videoUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </section>
                        )}

                        <section>
                            <h2 className="text-2xl font-semibold mb-5">Notes</h2>

                            {topic?.notes ? (
                                <div className="space-y-4">
                                    {topic.notes
                                        .split("\n")
                                        .filter(item => item.trim() !== "")
                                        .map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white px-4 py-4"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold shrink-0 mt-1">
                                                    {index + 1}
                                                </div>
                                                <p className="text-[16px] leading-8 text-gray-800">
                                                    {item}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            ) : (
                                <div className="rounded-xl border border-gray-200 bg-white px-5 py-5 text-gray-500">
                                    No notes available for this topic.
                                </div>
                            )}
                        </section>

                        <section className="border-t border-gray-200 pt-8">
                            <h2 className="text-2xl font-semibold mb-3">MCQs</h2>
                            <p className="text-gray-600 leading-7">
                                MCQs section will be added here so students can test themselves after reading the topic, notes, and watching the lecture.
                            </p>
                        </section>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Topic