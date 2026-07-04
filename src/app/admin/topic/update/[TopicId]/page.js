"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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

    // Clean up object URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith("blob:")) URL.revokeObjectURL(imagePreview);
            if (videoPreview && videoPreview.startsWith("blob:")) URL.revokeObjectURL(videoPreview);
        };
    }, [imagePreview, videoPreview]);

    const getSubjects = async () => {
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/subject/all`, { withCredentials: true });
            setSubjects(data.subject);
        } catch (error) {
            toast.error("Failed to fetch subjects");
        }
    };

    const getChapters = useCallback(async (subject) => {
        if (!subject) return;
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/mdcat/chapter/subject/${subject}`, { withCredentials: true });
            setChapters(data.chapter);
        } catch (error) {
            toast.error("Failed to fetch chapters");
        }
    }, []);

    const getTopic = useCallback(async () => {
        if (!TopicId) return;
        setLoading(true);
        try {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/v1/topic/get/${TopicId}`, { withCredentials: true });
            const { topic } = data;

            setSubjectId(topic.subject._id);
            await getChapters(topic.subject._id);

            setChapterId(typeof topic.chapter === "object" ? topic.chapter._id : topic.chapter);
            setTitle(topic.title || "");
            setDescription(topic.description || "");
            setNotes(topic.notes || "");
            setImagePreview(topic.image?.url || "");
            setVideoPreview(topic.video?.url || "");
        } catch (error) {
            toast.error("Failed to load topic details");
        } finally {
            setLoading(false);
        }
    }, [TopicId, getChapters]);

    useEffect(() => {
        const init = async () => {
            await getSubjects();
            await getTopic();
        };
        init();
    }, [getTopic]);

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
            await axios.put(`${process.env.NEXT_PUBLIC_API}/api/v1/topic/update/${TopicId}`, formData, { withCredentials: true });
            toast.success("Topic updated successfully.");
        } catch (error) {
            toast.error("Failed to update topic.");
        } finally {
            setLoading(false);
        }
    };

    if (loading && !subjects.length) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8" /></div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-4xl font-bold text-[#2B3F43]">Update Topic</h1>
                <form onSubmit={updateTopic} className="mt-8 rounded-2xl bg-white p-8 shadow">
                    {/* Fields omitted for brevity, ensure inputs use standard onChange handlers */}
                    <button
                        disabled={loading}
                        type="submit"
                        className="mt-8 w-full rounded-xl bg-[#2B3F43] py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Topic"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Update;