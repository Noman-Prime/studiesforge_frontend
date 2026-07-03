"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

const Update = () => {
    const { TopicId } = useParams();

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

    // ------------------ GET SUBJECTS ------------------

    const getSubjects = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/v1/subject/all",
                {
                    withCredentials: true,
                }
            );

            setSubjects(data.subject);
        } catch (error) {
            console.log(error);
        }
    };

    // ------------------ GET CHAPTERS ------------------

    const getChapter = async (subject) => {
        try {
            const { data } = await axios.get(
                `http://localhost:5000/mdcat/chapter/subject/${subject}`,
                {
                    withCredentials: true,
                }
            );

            setChapters(data.chapter);
        } catch (error) {
            console.log(error);
        }
    };

    // ------------------ GET TOPIC ------------------

    const getTopic = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:5000/api/v1/topic/get/${TopicId}`,
                {
                    withCredentials: true,
                }
            );

            const topic = data.topic;

            setSubjectId(topic.subject._id);

            await getChapter(topic.subject._id);

            // Works whether chapter is populated or not
            setChapterId(
                typeof topic.chapter === "object"
                    ? topic.chapter._id
                    : topic.chapter
            );

            setTitle(topic.title || "");
            setDescription(topic.description || "");
            setNotes(topic.notes || "");

            setImagePreview(topic.image?.url || "");
            setVideoPreview(topic.video?.url || "");
        } catch (error) {
            console.log(error);
        }
    };

    // ------------------ IMAGE ------------------

    const imageHandler = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    // ------------------ VIDEO ------------------

    const videoHandler = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setVideo(file);
        setVideoPreview(URL.createObjectURL(file));
    };

    // ------------------ UPDATE ------------------

    const updateTopic = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("subject", subjectId);
            formData.append("chapter", chapterId);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("notes", notes);

            if (image) {
                formData.append("image", image);
            }

            if (video) {
                formData.append("video", video);
            }

            const { data } = await axios.put(
                `http://localhost:5000/api/v1/topic/update/${TopicId}`,
                formData,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                toast.success("Topic updated successfully.");
            }
        } catch (error) {
            console.log(error.response?.data || error);
            toast.error("Failed to update topic.");
        }
    };

    // ------------------ LOAD ------------------

    useEffect(() => {
        if (!TopicId) return;

        const loadData = async () => {
            await getSubjects();
            await getTopic();
        };

        loadData();
    }, [TopicId]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl p-8">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#2B3F43]">
                        Update Topic
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Update subject, chapter and topic details.
                    </p>
                </div>

                <form
                    onSubmit={updateTopic}
                    className="rounded-2xl bg-white p-8 shadow"
                >

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Subject */}

                        <div>
                            <label className="mb-2 block font-semibold text-[#2B3F43]">
                                Subject
                            </label>

                            <select
                                value={subjectId}
                                onChange={async (e) => {
                                    const id = e.target.value;

                                    setSubjectId(id);
                                    setChapterId("");
                                    setChapters([]);

                                    await getChapter(id);
                                }}
                                className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                            >
                                <option value="">
                                    Select Subject
                                </option>

                                {subjects.map((sub) => (
                                    <option
                                        key={sub._id}
                                        value={sub._id}
                                    >
                                        {sub.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Chapter */}

                        <div>
                            <label className="mb-2 block font-semibold text-[#2B3F43]">
                                Chapter
                            </label>

                            <select
                                value={chapterId}
                                onChange={(e) =>
                                    setChapterId(e.target.value)
                                }
                                disabled={!subjectId}
                                className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                            >
                                <option value="">
                                    Select Chapter
                                </option>

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

                    {/* Title */}

                    <div className="mt-6">
                        <label className="mb-2 block font-semibold text-[#2B3F43]">
                            Topic Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter topic title"
                            className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                        />
                    </div>

                    {/* Description */}

                    <div className="mt-6">
                        <label className="mb-2 block font-semibold text-[#2B3F43]">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Enter topic description"
                            className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                        />
                    </div>

                    {/* Notes */}

                    <div className="mt-6">
                        <label className="mb-2 block font-semibold text-[#2B3F43]">
                            Notes
                        </label>

                        <textarea
                            rows={8}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Write topic notes..."
                            className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                        />
                    </div>

                    {/* Image & Video */}

                    <div className="mt-8 grid gap-6 md:grid-cols-2">

                        {/* Image */}

                        <div>
                            <label className="mb-2 block font-semibold text-[#2B3F43]">
                                Topic Image
                            </label>

                            <div className="overflow-hidden rounded-2xl border bg-gray-100">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Topic"
                                        className="h-64 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-64 items-center justify-center text-gray-400">
                                        No Image Selected
                                    </div>
                                )}
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={imageHandler}
                                className="mt-3 w-full rounded-lg border p-2"
                            />
                        </div>

                        {/* Video */}

                        <div>
                            <label className="mb-2 block font-semibold text-[#2B3F43]">
                                Topic Video
                            </label>

                            <div className="overflow-hidden rounded-2xl border bg-gray-100">
                                {videoPreview ? (
                                    <video
                                        src={videoPreview}
                                        controls
                                        className="h-64 w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-64 items-center justify-center text-gray-400">
                                        No Video Selected
                                    </div>
                                )}
                            </div>

                            <input
                                type="file"
                                accept="video/*"
                                onChange={videoHandler}
                                className="mt-3 w-full rounded-lg border p-2"
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-full rounded-xl bg-[#2B3F43] py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        Update Topic
                    </button>

                </form>

            </div>
        </div>
    );
};

export default Update;