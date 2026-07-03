"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { FileText, Plus } from "lucide-react";
import { toast } from "sonner";

const Topic = () => {
    const { id } = useParams();

    const [chapter, setChapter] = useState(null);
    const [topics, setTopics] = useState([]);

    const fetchChapter = async () => {
        try {
            const result = await axios.get(
                `http://localhost:5000/mdcat/chapter/get/${id}`,
                { withCredentials: true }
            );

            setChapter(result.data.chapter);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch chapter");
        }
    };

    const fetchTopics = async () => {
        try {
            const result = await axios.get(
                `http://localhost:5000/api/v1/topic/chapter/${id}`,
                { withCredentials: true }
            );

            setTopics(result.data.topic || []);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch topics");
        }
    };

    const deleteTopic = async (topicId) => {
        try {
            const result = await axios.delete(
                `http://localhost:5000/api/v1/topic/delete/${topicId}`,
                { withCredentials: true }
            );

            toast.success(result.data.message);
            fetchTopics();
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to delete topic");
        }
    };

    useEffect(() => {
        if (!id) return;

        fetchChapter();
        fetchTopics();
    }, [id]);
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl p-8">

                <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>

                        <div className="mb-3 flex items-center gap-3">
                            <span className="rounded-full bg-[#2B3F43]/10 px-3 py-1 text-sm font-semibold text-[#2B3F43]">
                                Chapter
                            </span>

                            <span className="text-lg font-semibold text-gray-700">
                                {chapter?.title}
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold text-[#2B3F43]">
                            Topics
                        </h1>

                        <p className="mt-2 max-w-2xl text-gray-600">
                            Browse and manage all topics available in
                            <span className="font-medium text-[#2B3F43]">
                                {" "}{chapter?.title}
                            </span>
                            .
                        </p>

                    </div>

                    <Link
                        href="/admin/topic/create"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#2B3F43] px-5 py-3 font-medium text-white transition hover:bg-[#24363A]"
                    >
                        <Plus size={18} />
                        Create Topic
                    </Link>

                </div>

                {topics.length === 0 ? (
                    <div className="rounded-2xl bg-white p-12 text-center shadow">
                        <FileText
                            size={60}
                            className="mx-auto text-[#2B3F43]/30"
                        />

                        <h2 className="mt-5 text-2xl font-semibold text-[#2B3F43]">
                            No Topics Found
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Create your first topic to get started.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {topics.map((topic, index) => (
                            <div
                                key={topic._id}
                                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2B3F43] hover:shadow-xl"
                            >

                                {topic.image?.url ? (
                                    <img
                                        src={topic.image.url}
                                        alt={topic.title}
                                        className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-56 items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                        <FileText
                                            size={60}
                                            className="text-[#2B3F43]/30"
                                        />
                                    </div>
                                )}

                                <div className="space-y-4 p-6">

                                    <span className="inline-flex rounded-full bg-[#2B3F43]/10 px-3 py-1 text-xs font-semibold text-[#2B3F43]">
                                        Topic {index + 1}
                                    </span>

                                    <h2 className="line-clamp-2 text-xl font-bold text-[#2B3F43]">
                                        {topic.title}
                                    </h2>

                                    <p className="line-clamp-3 text-sm leading-6 text-gray-600">
                                        {topic.description}
                                    </p>

                                    <div className="flex gap-3">

                                        <Link
                                            href={`/admin/topic/${id}/viewTopic/${topic._id}`}
                                            className="flex-1 rounded-lg bg-[#2B3F43] py-2.5 text-center text-sm font-medium text-white transition hover:opacity-90"
                                        >
                                            View
                                        </Link>

                                        <button
                                            onClick={() => deleteTopic(topic._id)}
                                            className="flex-1 rounded-lg border border-red-500 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>
    );
};

export default Topic;