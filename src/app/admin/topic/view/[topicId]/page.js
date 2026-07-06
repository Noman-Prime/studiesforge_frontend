"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import {
    Eye,
    BookOpen,
    FileText,
    FileVideo,
    Image as ImageIcon,
    Brain,
} from "lucide-react";

const ViewTopic = () => {
    const { topicId } = useParams();

    const [topic, setTopic] = useState(null);
    const [subject, setSubject] = useState(null);
    const [chapter, setChapter] = useState(null);
    const fetchSubject = async (subjectId) => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/subject/get/${subjectId}`,
                { withCredentials: true }
            );

            setSubject(res.data.subject);
        } catch (error) {
            toast.error("Failed to fetch subject");
        }
    };

    const fetchChapter = async (chapterId) => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/mdcat/chapter/get/${chapterId}`,
                { withCredentials: true }
            );

            setChapter(res.data.chapter);
        } catch (error) {
            toast.error("Failed to fetch chapter");
        }
    };

    const fetchTopic = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/topic/get/${topicId}`,
                { withCredentials: true }
            );

            const topicData = res.data.topic;

            setTopic(topicData);

            const subjectId =
                typeof topicData.subject === "object"
                    ? topicData.subject._id
                    : topicData.subject;

            const chapterId =
                typeof topicData.chapter === "object"
                    ? topicData.chapter._id
                    : topicData.chapter;

            fetchSubject(subjectId);
            fetchChapter(chapterId);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch topic");
        }
    };

    useEffect(() => {
        if (topicId) {
            fetchTopic();
        }
    }, [topicId]);

    if (!topic) return null;

    return (
        <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
                        <Eye className="text-zinc-600" />
                        View Topic
                    </h1>
                    <p className="mt-2 text-zinc-500">
                        Review all information related to this topic.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-2">
                                Subject
                            </label>

                            <div className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-zinc-800 font-medium">
                                {subject?.title}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-2">
                                Chapter
                            </label>

                            <div className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-zinc-800 font-medium">
                                {chapter?.title || "N/A"}
                            </div>
                        </div>

                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-700 mb-2">
                            Topic Title
                        </label>

                        <div className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-zinc-800 font-medium">
                            {topic.title}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-700 mb-2">
                            Description
                        </label>

                        <div className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 whitespace-pre-wrap leading-7 text-zinc-700 min-h-[120px]">
                            {topic.description}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-700 mb-2">
                            Detailed Notes
                        </label>

                        <div className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4 whitespace-pre-wrap leading-8 text-zinc-700 min-h-[220px]">
                            {topic.notes || "No notes available."}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-2">
                                Thumbnail
                            </label>

                            <div className="relative border-2 border-dashed border-zinc-200 rounded-2xl h-56 flex items-center justify-center overflow-hidden bg-zinc-50">

                                {topic.image?.url ? (
                                    <img
                                        src={topic.image.url}
                                        alt={topic.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <ImageIcon
                                        size={45}
                                        className="text-zinc-300"
                                    />
                                )}

                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-2">
                                Video Lecture
                            </label>

                            <div className="relative border-2 border-dashed border-zinc-200 rounded-2xl h-56 flex items-center justify-center overflow-hidden bg-zinc-50">

                                {topic.video?.url ? (
                                    <video
                                        src={topic.video.url}
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FileVideo
                                        size={45}
                                        className="text-zinc-300"
                                    />
                                )}

                            </div>
                        </div>

                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 pt-2">

                        <Link
                            href={`/admin/MCQS/${topic._id}`}
                            className="w-full bg-zinc-900 text-white font-bold py-4 rounded-xl hover:bg-zinc-800 transition shadow-lg flex items-center justify-center gap-2"
                        >
                            <Brain size={20} />
                            View MCQs
                        </Link>

                        <Link
                            href={`/admin/topic/update/${topic._id}`}
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2"
                        >
                            <BookOpen size={20} />
                            Update Topic
                        </Link>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ViewTopic;