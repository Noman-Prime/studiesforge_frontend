"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import {
    PlusCircle,
    Upload,
    FileVideo,
    Image as ImageIcon,
    BookOpen,
} from "lucide-react";

const Update = () => {
    const { TopicId } = useParams();

    const [loading, setLoading] = useState(false);

    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);

    const [subjectId, setSubjectId] = useState("");
    const [chapterId, setChapterId] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [notes, setNotes] = useState("");

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const [video, setVideo] = useState(null);
    const [videoPreview, setVideoPreview] = useState("");

    const getSubjects = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/subject/all`,
                { withCredentials: true }
            );

            setSubjects(res.data.subject);
        } catch (error) {
            toast.error("Failed to fetch subjects");
        }
    };

    const getChapter = async (subject) => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/mdcat/chapter/subject/${subject}`,
                { withCredentials: true }
            );

            setChapters(res.data.chapter);
        } catch (error) {
            toast.error("Failed to fetch chapters");
        }
    };

    const getTopic = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/topic/get/${TopicId}`,
                { withCredentials: true }
            );

            const topic = res.data.topic;

            const subId =
                typeof topic.subject === "object"
                    ? topic.subject._id
                    : topic.subject;

            const chapId =
                typeof topic.chapter === "object"
                    ? topic.chapter._id
                    : topic.chapter;

            setSubjectId(subId);

            await getChapter(subId);

            setChapterId(chapId);
            setTitle(topic.title);
            setDescription(topic.description);
            setNotes(topic.notes || "");

            setImagePreview(topic.image?.url || "");
            setVideoPreview(topic.video?.url || "");
        } catch (error) {
            toast.error("Failed to fetch topic");
        }
    };

    useEffect(() => {
        getSubjects();

        if (TopicId) {
            getTopic();
        }
    }, [TopicId]);

    const imageHandler = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const videoHandler = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setVideo(file);
        setVideoPreview(URL.createObjectURL(file));
    };

    const updateTopic = async (e) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData();

        formData.append("subject", subjectId);
        formData.append("chapter", chapterId);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("notes", notes);

        if (image) formData.append("image", image);
        if (video) formData.append("video", video);

        try {
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API}/api/v1/topic/update/${TopicId}`,
                formData,
                {
                    withCredentials: true,
                }
            );

            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update topic");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-zinc-50 p-6 md:p-10">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-zinc-900 flex items-center gap-3">
                        <PlusCircle className="text-zinc-600" />
                        Update Topic
                    </h1>
                    <p className="mt-2 text-zinc-500">
                        Update the information below to modify this educational topic.
                    </p>
                </div>

                <form
                    onSubmit={updateTopic}
                    className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6"
                >

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-2">
                                Subject
                            </label>

                            <select
                                value={subjectId}
                                onChange={(e) => {
                                    setSubjectId(e.target.value);
                                    setChapterId("");
                                    getChapter(e.target.value);
                                }}
                                className="w-full rounded-xl border border-zinc-200 p-3 focus:ring-2 focus:ring-zinc-900 outline-none transition"
                            >
                                <option value="">Select Subject</option>

                                {subjects.map((subject) => (
                                    <option
                                        key={subject._id}
                                        value={subject._id}
                                    >
                                        {subject.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-2">
                                Chapter
                            </label>

                            <select
                                value={chapterId}
                                onChange={(e) => setChapterId(e.target.value)}
                                disabled={!subjectId}
                                className="w-full rounded-xl border border-zinc-200 p-3 focus:ring-2 focus:ring-zinc-900 outline-none transition"
                            >
                                <option value="">Select Chapter</option>

                                {chapters.map((chapter) => (
                                    <option
                                        key={chapter._id}
                                        value={chapter._id}
                                    >
                                        {chapter.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-700 mb-2">
                            Topic Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Introduction to Biology"
                            className="w-full rounded-xl border border-zinc-200 p-3 outline-none focus:ring-2 focus:ring-zinc-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-700 mb-2">
                            Description
                        </label>

                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brief overview..."
                            className="w-full rounded-xl border border-zinc-200 p-3 outline-none focus:ring-2 focus:ring-zinc-900"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-zinc-700 mb-2">
                            Detailed Notes
                        </label>

                        <textarea
                            rows={6}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Paste your lesson notes here..."
                            className="w-full rounded-xl border border-zinc-200 p-3 outline-none focus:ring-2 focus:ring-zinc-900"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-2">
                                Thumbnail
                            </label>

                            <div className="relative border-2 border-dashed border-zinc-200 rounded-2xl h-48 flex items-center justify-center overflow-hidden bg-zinc-50">

                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Topic"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <ImageIcon
                                        size={40}
                                        className="text-zinc-300"
                                    />
                                )}

                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={imageHandler}
                                className="mt-3 w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-zinc-700 mb-2">
                                Video Asset
                            </label>

                            <div className="relative border-2 border-dashed border-zinc-200 rounded-2xl h-48 flex items-center justify-center overflow-hidden bg-zinc-50">

                                {videoPreview ? (
                                    <video
                                        src={videoPreview}
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FileVideo
                                        size={40}
                                        className="text-zinc-300"
                                    />
                                )}

                            </div>

                            <input
                                type="file"
                                accept="video/*"
                                onChange={videoHandler}
                                className="mt-3 w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200"
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-zinc-900 text-white font-bold py-4 rounded-xl hover:bg-zinc-800 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <BookOpen size={20} />
                        {loading ? "Updating Topic..." : "Update Topic"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Update;