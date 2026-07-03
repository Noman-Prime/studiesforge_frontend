"use client";

import axios from "axios";
import { use, useEffect, useState } from "react";
import { BookOpen, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";

const SubjectDetail = ({ params }) => {
    const { id } = use(params);
    const [subject, setSubject] = useState(null);
    const [topics, setTopics] = useState([]);

    const findSubject = async () => {
        try {
            const result = await axios.get(
                `http://localhost:5000/api/v1/subject/get/${id}`,
                { withCredentials: true }
            );
            if (result.data) {
                setSubject(result.data.subject);
            }
        } catch (error) {
            console.log(`Api is not working: ${error}`);
        }
    };

    const findTopic = async () => {
        try {
            const result = await axios.get(
                `http://localhost:5000/api/v1/topic/subject/${id}`,
                { withCredentials: true }
            );
            if (result.data) {
                setTopics(result.data.topic);
            }
        } catch (error) {
            console.log(`Api is not working: ${error}`);
        }
    };

    useEffect(() => {
        findSubject();
        findTopic();
    }, [id]);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
            <div className="bg-[#2B3F43] text-white p-6 sm:p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3">{subject?.title}</h1>
            </div>

            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <BookOpen className="text-[#2B3F43]" />
                    Course Topics
                </h2>

                {topics.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {topics.map((topic) => {
                            const imageUrl = topic?.image?.url;

                            return (
                                <Link
                                    key={topic._id}
                                    href={`/topic/${topic._id}`}
                                    className="group bg-[#2B3F43] rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt={topic.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-[#2B3F43]">
                                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-200 flex items-center justify-center">
                                                    <FileText size={28} />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-5 flex items-center justify-between gap-3">
                                        <h3 className="font-semibold text-lg text-white group-hover:text-[#2B3F43] transition-colors line-clamp-2">
                                            {topic.title}
                                        </h3>

                                        <ChevronRight className="text-gray-400 group-hover:text-[#2B3F43] group-hover:translate-x-1 transition-all shrink-0" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-gray-500">
                        No topics found for this subject.
                    </div>
                )}
            </section>
        </div>
    );
};

export default SubjectDetail;