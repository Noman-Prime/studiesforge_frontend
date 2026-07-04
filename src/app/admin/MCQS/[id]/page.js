"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Loader2, Trash2, Edit, AlertCircle } from "lucide-react";

const MCQS = () => {
    const { id } = useParams();
    const [mcqs, setMcqs] = useState([]);
    const [chapter, setChapter] = useState(null);
    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        if (!id) return;
        setLoading(true);
        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/mcqs/topic/${id}`,
                { withCredentials: true }
            );

            const mcqsData = data.mcqs || [];
            setMcqs(mcqsData);

            if (mcqsData.length > 0) {
                // Fetching metadata in parallel for faster loading
                const [chapterRes, topicRes] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API}/mdcat/chapter/get/${mcqsData[0].chapter}`, { withCredentials: true }),
                    axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/topic/get/${mcqsData[0].topic}`, { withCredentials: true })
                ]);
                setChapter(chapterRes.data.chapter);
                setTopic(topicRes.data.topic);
            }
        } catch (error) {
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = async (mcqId) => {
        if (!confirm("Are you sure you want to delete this MCQ?")) return;

        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API}/api/v1/mcqs/delete/${mcqId}`, { withCredentials: true });
            setMcqs((prev) => prev.filter((mcq) => mcq._id !== mcqId));
            toast.success("MCQ deleted successfully");
        } catch (error) {
            toast.error("Failed to delete MCQ");
        }
    };

    if (loading) return <div className="min-h-[50vh] flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-gray-400" /></div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="mb-8 border-b pb-6">
                <h1 className="text-3xl font-bold text-gray-900">{chapter?.title || "Loading..."}</h1>
                <h2 className="text-xl text-gray-500 mt-1">{topic?.title || "Loading..."}</h2>
                <p className="mt-3 text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                    Total MCQs: {mcqs.length}
                </p>
            </div>

            {mcqs.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed rounded-2xl">
                    <AlertCircle className="mx-auto w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-gray-500">No MCQs found for this topic.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {mcqs.map((mcq, index) => (
                        <div key={mcq._id} className="border rounded-2xl bg-white p-6 shadow-sm hover:border-gray-300 transition">
                            <h3 className="text-lg font-bold mb-4">Q{index + 1}. {mcq.statement}</h3>

                            <div className="grid gap-2">
                                {mcq.options.map((option) => (
                                    <div key={option.id} className={`p-3 border rounded-xl font-medium ${option.id === mcq.correctOption ? "bg-green-50 border-green-200 text-green-700" : "bg-gray-50"}`}>
                                        <span className="mr-2">{option.id}.</span> {option.text}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 p-4 bg-gray-50 rounded-xl border">
                                <p className="text-sm font-semibold text-gray-600">Explanation:</p>
                                <p className="text-gray-700 mt-1">{mcq.reason || "No explanation provided."}</p>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Link href={`/admin/MCQS/update/${mcq._id}`} className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
                                    <Edit size={16} /> Update
                                </Link>
                                <button onClick={() => handleDelete(mcq._id)} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                                    <Trash2 size={16} /> Delete
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