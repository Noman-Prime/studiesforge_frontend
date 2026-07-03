"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
    BookOpen,
    FileText,
    NotebookPen,
    Trash2,
    Pencil,
    Brain,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const ViewTopic = () => {
    const { topicId } = useParams();
    const router = useRouter();

    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);

    // Convert notes string into array
    const notes = topic?.notes
        ? topic.notes
              .split("\n")
              .map((note) => note.trim())
              .filter(Boolean)
        : [];

    // ------------------ GET TOPIC ------------------

    const getTopic = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:5000/api/v1/topic/get/${topicId}`,
                {
                    withCredentials: true,
                }
            );

            setTopic(data.topic);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load topic");
        } finally {
            setLoading(false);
        }
    };

    // ------------------ DELETE TOPIC ------------------

    const deleteTopic = async (id) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:5000/api/v1/topic/delete/${id}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                toast.success("Topic deleted successfully");
                router.back();
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete topic");
        }
    };

    useEffect(() => {
        if (!topicId) return;
        getTopic();
    }, [topicId]);

    // ------------------ LOADING ------------------

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
                Loading...
            </div>
        );
    }

    // ------------------ NOT FOUND ------------------

    if (!topic) {
        return (
            <div className="flex items-center justify-center min-h-screen text-lg font-semibold">
                Topic not found.
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6 min-h-screen">
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

                {/* IMAGE */}

                <div className="w-full h-72 bg-slate-100">
                    {topic.image?.url ? (
                        <img
                            src={topic.image.url}
                            alt={topic.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-slate-400">
                            No Image Available
                        </div>
                    )}
                </div>

                <div className="p-6">

                    {/* HEADER */}

                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                        <BookOpen size={18} />
                        <span className="text-sm font-medium">
                            Study Material
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-slate-900 mb-3">
                        {topic.title}
                    </h1>

                    <div className="flex flex-wrap gap-3 text-sm mb-6">
                        <span className="px-3 py-1 bg-slate-100 rounded-full">
                            {notes.length} Notes
                        </span>

                        <span className="px-3 py-1 bg-slate-100 rounded-full">
                            {topic.video?.url
                                ? "Video Available"
                                : "No Video"}
                        </span>
                    </div>

                    {/* DESCRIPTION */}

                    <section className="mb-8">
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-3">
                            <FileText size={20} />
                            Description
                        </h2>

                        <p className="text-gray-600 leading-8">
                            {topic.description || "No description available."}
                        </p>
                    </section>

                    {/* VIDEO */}

                    {topic.video?.url && (
                        <section className="mb-8">
                            <h2 className="flex items-center gap-2 text-xl font-semibold mb-3">
                                <Brain size={20} />
                                Video Lecture
                            </h2>

                            <video
                                controls
                                className="w-full rounded-xl border"
                            >
                                <source
                                    src={topic.video.url}
                                    type="video/mp4"
                                />
                            </video>
                        </section>
                    )}

                    {/* NOTES */}

                    <section className="mb-8">
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                            <NotebookPen size={20} />
                            Notes
                        </h2>

                        {notes.length > 0 ? (
                            <div className="space-y-3">
                                {notes.map((note, index) => (
                                    <div
                                        key={index}
                                        className="flex gap-3 p-4 border rounded-xl bg-slate-50"
                                    >
                                        <span className="flex items-center justify-center h-7 w-7 rounded-full bg-blue-600 text-white text-sm font-semibold shrink-0">
                                            {index + 1}
                                        </span>

                                        <p className="text-gray-700">
                                            {note}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="border rounded-xl p-6 text-gray-500 bg-slate-50">
                                No notes available.
                            </div>
                        )}
                    </section>

                    {/* ACTION BUTTONS */}

                    <div className="flex flex-wrap gap-3 border-t pt-6">

                        <Link
                            href={`/admin/MCQS/${topic._id}`}
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            <Brain size={16} />
                            MCQs
                        </Link>

                        <Link
                            href={`/admin/topic/update/${topic._id}`}
                            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            <Pencil size={16} />
                            Update
                        </Link>

                        <button
                            onClick={() => deleteTopic(topic._id)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                            <Trash2 size={16} />
                            Delete
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewTopic;