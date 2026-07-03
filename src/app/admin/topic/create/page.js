"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const Create = () => {
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
            const result = await axios.get(
                "http://localhost:5000/api/v1/subject/all",
                { withCredentials: true }
            );

            setSubjects(result.data.subject);
        } catch (error) {
            console.log(error);
        }
    };

    const getChapter = async (id) => {
        try {
            const result = await axios.get(
                `http://localhost:5000/mdcat/chapter/subject/${id}`,
                { withCredentials: true }
            );

            setChapters(result.data.chapter);
        } catch (error) {
            console.log(error);
        }
    };

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

    const createTopic = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("subject", subjectId);
        formData.append("chapter", chapterId);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("notes", notes);

        if (image) formData.append("image", image);
        if (video) formData.append("video", video);

        try {
            const result = await axios.post(
                "http://localhost:5000/api/v1/topic/create",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (result.data) {
                toast.success("Topic is create")
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSubjects();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl p-8">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#2B3F43]">
                        Create Topic
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Select subject, chapter and add topic details.
                    </p>
                </div>

                <form
                    onSubmit={createTopic}
                    className="rounded-2xl bg-white p-8 shadow"
                >

                    <div className="grid gap-6 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block font-semibold text-[#2B3F43]">
                                Subject
                            </label>

                            <select
                                value={subjectId}
                                onChange={(e) => {
                                    const id = e.target.value;

                                    setSubjectId(id);
                                    setChapterId("");
                                    setChapters([]);

                                    getChapter(id);
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

                        <div>
                            <label className="mb-2 block font-semibold text-[#2B3F43]">
                                Chapter
                            </label>

                            <select
                                value={chapterId}
                                onChange={(e) => setChapterId(e.target.value)}
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

                    <div className="mt-6">
                        <label className="mb-2 block font-semibold text-[#2B3F43]">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter topic description"
                            className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                        />
                    </div>

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

                    <div className="mt-8 grid gap-6 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block font-semibold text-[#2B3F43]">
                                Topic Image
                            </label>

                            <div className="overflow-hidden rounded-2xl border bg-gray-100">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
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
                        Create Topic
                    </button>

                </form>

            </div>
        </div>
    );
};

export default Create;