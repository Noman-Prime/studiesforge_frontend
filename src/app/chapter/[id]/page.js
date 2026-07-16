"use client"

import axios from "axios"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { BookOpen, ChevronRight, FileText } from "lucide-react"
import Link from "next/link"

const ChapterTopic = () => {
    const { id } = useParams()
    const [topic, setTopic] = useState([])
    const [chapter, setChapter] = useState(null)

    const getChapter = async () => {
        try {
            const resp = await axios.get(`${process.env.NEXT_PUBLIC_API}/mdcat/chapter/get/${id}`);
            if (resp.data.chapter) {
                setChapter(resp.data.chapter);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getTopics = async () => {
        try {
            const result = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/topic/chapter/${id}`, { withCredentials: true })
            if (result.data.success) {
                setTopic(result.data.topic)
            }
        } catch (error) {
            console.log(error.response?.data?.error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getChapter();
            await getTopics();
        };
        fetchData();
    }, [])

    return (
        <div className="mx-auto max-w-6xl px-6 py-12">
            {/* Header Section */}
            <div className="mb-12 rounded-3xl bg-[#2B3F43] p-10 text-white shadow-xl">
                <h1 className="text-3xl font-extrabold sm:text-5xl">{chapter?.title || "Chapter Topics"}</h1>
                <p className="mt-4 text-blue-100/80 whitespace-nowrap overflow-hidden text-ellipsis">
                    Explore all the essential topics covered in {chapter?.title}. Select a topic to start your learning journey.
                </p>
            </div>

            {/* Topics Section */}
            <section>
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                        <BookOpen className="text-[#2B3F43]" />
                        Available Topics ({topic.length})
                    </h2>
                </div>

                {topic.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {topic.map((t) => (
                            <Link
                                key={t._id}
                                href={`/topic/${t._id}`}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                                    {t?.image?.url ? (
                                        <img
                                            src={t.image.url}
                                            alt={t.name}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-gray-300">
                                            <FileText size={48} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-1 items-center justify-between p-6">
                                    <h3 className="pr-4 font-semibold text-gray-800 transition-colors group-hover:text-[#2B3F43]">
                                        {t.title}
                                    </h3>
                                    <div className="rounded-full bg-gray-50 p-2 text-[#2B3F43] transition-transform group-hover:translate-x-1">
                                        <ChevronRight size={20} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-500">
                        <p>No topics have been added to this chapter yet.</p>
                    </div>
                )}
            </section>
        </div>
    )
}

export default ChapterTopic