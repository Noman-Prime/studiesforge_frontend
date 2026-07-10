"use client";

import axios from "axios";
import { use, useEffect, useState } from "react";
import { BookOpen, ChevronRight, FileText, Loader2 } from "lucide-react";
import Link from "next/link";

const SubjectDetail = ({ params }) => {
    const { id } = use(params);

    const [subject, setSubject] = useState(null);
    const [topics, setTopics] = useState([]);

    const getsubject = async () => {
        try {
            const resp = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/subject/get/${id}`)
            if (resp.data.subject) {
                setSubject(resp.data.subject)
                getTopics()
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getTopics = async () => {
        try {
            const resp = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/topic/subject/${id}`)
            if (resp.data.topic) {
                setTopics(resp.data.topic)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getsubject()
    },[]);

    return (
        <div className="mx-auto max-w-6xl px-6 py-12">
            {/* Header Section */}
            <div className="mb-12 rounded-3xl bg-[#2B3F43] p-10 text-white shadow-xl">
                <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-medium tracking-wide text-blue-100">
                    Subject Module
                </span>
                <h1 className="text-4xl font-extrabold sm:text-5xl">{subject?.title}</h1>
                <p className="mt-4 max-w-2xl text-blue-100/80">
                    Explore all the essential topics covered in {subject?.title}. Select a topic to start your learning journey.
                </p>
            </div>

            {/* Topics Section */}
            <section>
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                        <BookOpen className="text-[#2B3F43]" />
                        Available Topics ({topics.length})
                    </h2>
                </div>

                {topics.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {topics.map((topic) => (
                            <Link
                                key={topic._id}
                                href={`/topic/${topic._id}`}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                            >
                                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                                    {topic?.image?.url ? (
                                        <img
                                            src={topic.image.url}
                                            alt={topic.title}
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
                                        {topic.title}
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
                        <p>No topics have been added to this subject yet.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default SubjectDetail;