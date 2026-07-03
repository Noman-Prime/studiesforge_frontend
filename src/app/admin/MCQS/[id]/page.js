"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MCQS = () => {
    const { id } = useParams();

    const [mcqs, setMcqs] = useState([]);
    const [chapter, setChapter] = useState(null);
    const [topic, setTopic] = useState(null);

    const fetchData = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:5000/api/v1/mcqs/topic/${id}`,
                { withCredentials: true }
            );

            const mcqsData = data.mcqs || [];
            setMcqs(mcqsData);

            if (mcqsData.length === 0) return;
            const chapterRes = await axios.get(
                `http://localhost:5000/mdcat/chapter/get/${mcqsData[0].chapter}`,
                { withCredentials: true }
            );

            setChapter(chapterRes.data.chapter);
            const topicRes = await axios.get(
                `http://localhost:5000/api/v1/topic/get/${mcqsData[0].topic}`,
                { withCredentials: true }
            );

            setTopic(topicRes.data.topic);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleDelete = async (mcqId) => {
        try {
            const result = await axios.delete(
                `http://localhost:5000/api/v1/mcqs/delete/${mcqId}`,
                { withCredentials: true }
            );

            if (result.data) {
                setMcqs((prev) =>
                    prev.filter((mcq) => mcq._id !== mcqId)
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    {chapter?.title}
                </h1>

                <h2 className="text-xl text-gray-500 mt-1">
                    {topic?.title}
                </h2>

                <p className="mt-3 text-gray-600">
                    Total MCQs: {mcqs.length}
                </p>
            </div>
            {mcqs.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    No MCQs Found
                </div>
            ) : (
                <div className="space-y-6">
                    {mcqs.map((mcq, index) => (
                        <div
                            key={mcq._id}
                            className="border rounded-xl bg-white p-6 shadow-sm"
                        >
                            <h3 className="text-lg font-semibold mb-4">
                                Q{index + 1}. {mcq.statement}
                            </h3>
                            <div className="space-y-2">
                                {mcq.options.map((option) => (
                                    <div
                                        key={option._id}
                                        className={`p-3 border rounded-lg ${option.id === mcq.correctOption
                                            ? "bg-green-100 border-green-500"
                                            : "bg-gray-50"
                                            }`}
                                    >
                                        <span className="font-semibold">
                                            {option.id}.
                                        </span>{" "}
                                        {option.text}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <span className="font-semibold">
                                    Correct Option:
                                </span>{" "}
                                <span className="text-green-600 font-bold">
                                    {mcq.correctOption}
                                </span>
                            </div>
                            <div className="mt-4">
                                <span className="font-semibold">
                                    Explanation:
                                </span>

                                <p className="mt-1 text-gray-700">
                                    {mcq.reason}
                                </p>
                            </div>
                            <div className="flex gap-3 mt-6">
                                <Link
                                    href={`/admin/MCQS/update/${mcq._id}`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Update
                                </Link>

                                <button
                                    onClick={() => handleDelete(mcq._id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MCQS;