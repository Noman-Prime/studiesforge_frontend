"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Chapter = () => {
    const [subjects, setSubjects] = useState([]);
    const [subjectId, setSubjectId] = useState("");
    const [number, setNumber] = useState("");
    const [title, setTitle] = useState("");
    
    // Added state for better UX
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const getSubjects = async () => {
        try {
            const result = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/subject/all`,
                { withCredentials: true }
            );
            setSubjects(result.data.subject);
        } catch (error) {
            console.error(error);
        }
    };

    const createChapter = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API}/mdcat/chapter/create`,
                { subject: subjectId, number, title },
                { withCredentials: true }
            );

            setMessage({ type: "success", text: "Chapter created successfully!" });
            setSubjectId("");
            setNumber("");
            setTitle("");
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data?.message || "Something went wrong." });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSubjects();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="mx-auto max-w-xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-[#2B3F43]">Create New Chapter</h1>
                    <p className="mt-2 text-gray-500">Fill in the details to add a chapter to your curriculum.</p>
                </div>

                <form onSubmit={createChapter} className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
                    {/* Feedback Message */}
                    {message.text && (
                        <div className={`mb-6 p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}

                    <div className="space-y-5">
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Subject</label>
                            <select
                                required
                                value={subjectId}
                                onChange={(e) => setSubjectId(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43]"
                            >
                                <option value="">Select a subject</option>
                                {subjects.map((s) => (
                                    <option key={s._id} value={s._id}>{s.title}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Chapter Number</label>
                            <input
                                required
                                type="text"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                placeholder="e.g., 01"
                                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43]"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-gray-700">Chapter Title</label>
                            <input
                                required
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Introduction to Biology"
                                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43]"
                            />
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full rounded-lg bg-[#2B3F43] py-3.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Chapter"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chapter;