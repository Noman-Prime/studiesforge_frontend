"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ChevronRight, Loader2, BookOpen } from "lucide-react";

const SubjectsTopic = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const { data: res } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/topic/by_subject`,
                { withCredentials: true }
            );
            if (res?.data) setData(res.data);
        } catch (error) {
            console.error("Error fetching subjects and topics:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#2B3F43]" />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="mx-auto max-w-6xl px-6 space-y-16">

                {data.map((item) => (
                    <section key={item.subject._id} className="space-y-6">
                        {/* Subject Header */}
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                            <h2 className="flex items-center gap-3 text-2xl font-bold text-[#2B3F43]">
                                <BookOpen className="text-[#2B3F43]" />
                                {item.subject.title}
                            </h2>
                            <Link
                                href={`/subjectDetail/${item.subject._id}`}
                                className="flex items-center gap-1 text-sm font-semibold text-gray-500 transition-colors hover:text-[#2B3F43]"
                            >
                                View All <ChevronRight size={16} />
                            </Link>
                        </div>

                        {/* Topics Grid */}
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
                            {item.topics?.slice(0, 4).map((topic) => (
                                <Link
                                    key={topic._id}
                                    href={`/topic/${topic._id}`}
                                    className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="h-32 w-full overflow-hidden bg-gray-100">
                                        {topic?.image?.url ? (
                                            <img
                                                src={topic.image.url}
                                                alt={topic.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-gray-300">
                                                <BookOpen size={24} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-800 transition-colors group-hover:text-[#2B3F43] line-clamp-1">
                                            {topic.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
};

export default SubjectsTopic;