"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Chapter = () => {
    const [subjects, setSubjects] = useState([]);

    const [subjectId, setSubjectId] = useState("");
    const [number, setNumber] = useState("");
    const [title, setTitle] = useState("");

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

    const createChapter = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post(
                "http://localhost:5000/mdcat/chapter/create",
                {
                    subject: subjectId,
                    number,
                    title,
                },
                {
                    withCredentials: true,
                }
            );

            console.log(result.data);

            setSubjectId("");
            setNumber("");
            setTitle("");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSubjects();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-5xl p-8">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#2B3F43]">
                        Create Chapter
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Select a subject and create a new chapter.
                    </p>
                </div>

                <form
                    onSubmit={createChapter}
                    className="rounded-2xl bg-white p-8 shadow"
                >

                    <div className="mb-6">
                        <label className="mb-2 block font-semibold text-[#2B3F43]">
                            Subject
                        </label>

                        <select
                            value={subjectId}
                            onChange={(e) => setSubjectId(e.target.value)}
                            className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                        >
                            <option value="">
                                Select Subject
                            </option>

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

                    <div className="mb-6">
                        <label className="mb-2 block font-semibold text-[#2B3F43]">
                            Chapter Number
                        </label>

                        <input
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="Enter chapter number"
                            className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="mb-2 block font-semibold text-[#2B3F43]">
                            Chapter Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter chapter title"
                            className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-[#2B3F43] py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        Create Chapter
                    </button>

                </form>

            </div>
        </div>
    );
};

export default Chapter;