"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const Update = () => {
    const { mcqId } = useParams();

    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [topics, setTopics] = useState([]);

    const [subjectId, setSubjectId] = useState("");
    const [chapterId, setChapterId] = useState("");
    const [topicId, setTopicId] = useState("");

    const [statement, setStatement] = useState("");

    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");

    const [correctOption, setCorrectOption] = useState("");
    const [reason, setReason] = useState("");

    const [loading, setLoading] = useState(true);
    const getSubjects = async () => {
        try {
            const result = await axios.get(
                "http://localhost:5000/api/v1/subject/all",
                {
                    withCredentials: true,
                }
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
                {
                    withCredentials: true,
                }
            );

            setChapters(result.data.chapter);
        } catch (error) {
            console.log(error);
        }
    };
    const getTopic = async (id) => {
        try {
            const result = await axios.get(
                `http://localhost:5000/api/v1/topic/chapter/${id}`,
                {
                    withCredentials: true,
                }
            );

            setTopics(result.data.topic);
        } catch (error) {
            console.log(error);
        }
    };
    const getMCQ = async () => {
        try {
            const result = await axios.get(
                `http://localhost:5000/api/v1/mcqs/get/${mcqId}`,
                {
                    withCredentials: true,
                }
            );

            const mcq = result.data.mcqs;

            setSubjectId(mcq.subject._id);
            await getChapter(mcq.subject._id);

            setChapterId(mcq.chapter);
            await getTopic(mcq.chapter);

            setTopicId(mcq.topic._id);

            setStatement(mcq.statement);

            setOptionA(mcq.options[0].text);
            setOptionB(mcq.options[1].text);
            setOptionC(mcq.options[2].text);
            setOptionD(mcq.options[3].text);

            setCorrectOption(mcq.correctOption);
            setReason(mcq.reason);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load MCQ");
        } finally {
            setLoading(false);
        }
    };
    const updateMCQ = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.put(
                `http://localhost:5000/api/v1/mcqs/update/${mcqId}`,
                {
                    subject: subjectId,
                    chapter: chapterId,
                    topic: topicId,
                    statement,
                    options: [
                        {
                            id: "A",
                            text: optionA,
                        },
                        {
                            id: "B",
                            text: optionB,
                        },
                        {
                            id: "C",
                            text: optionC,
                        },
                        {
                            id: "D",
                            text: optionD,
                        },
                    ],
                    correctOption,
                    reason,
                },
                {
                    withCredentials: true,
                }
            );

            if (result.data.success) {
                toast.success("MCQ Updated Successfully");
            }
        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message
            );
        }
    };

    useEffect(() => {
        getSubjects();

        if (mcqId) {
            getMCQ();
        }
    }, [mcqId]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl p-8">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#2B3F43]">
                        Update MCQ
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Update subject, chapter, topic and MCQ details.
                    </p>
                </div>

                <form
                    onSubmit={updateMCQ}
                    className="rounded-2xl bg-white p-8 shadow"
                >

                    <div className="grid gap-6 md:grid-cols-3">

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
                                    setTopicId("");

                                    setChapters([]);
                                    setTopics([]);

                                    await getChapter(id);
                                }}
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

                        <div>
                            <label className="mb-2 block font-semibold text-[#2B3F43]">
                                Chapter
                            </label>

                            <select
                                value={chapterId}
                                onChange={async (e) => {
                                    const id = e.target.value;

                                    setChapterId(id);
                                    setTopicId("");

                                    setTopics([]);

                                    await getTopic(id);
                                }}
                                disabled={!subjectId}
                                className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43] disabled:bg-gray-100"
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

                        <div>
                            <label className="mb-2 block font-semibold text-[#2B3F43]">
                                Topic
                            </label>

                            <select
                                value={topicId}
                                onChange={(e) => setTopicId(e.target.value)}
                                disabled={!chapterId}
                                className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43] disabled:bg-gray-100"
                            >
                                <option value="">
                                    Select Topic
                                </option>

                                {topics.map((topic) => (
                                    <option
                                        key={topic._id}
                                        value={topic._id}
                                    >
                                        {topic.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="mt-6">
                        <label className="mb-2 block font-semibold text-[#2B3F43]">
                            Question Statement
                        </label>

                        <textarea
                            rows={4}
                            value={statement}
                            onChange={(e) => setStatement(e.target.value)}
                            placeholder="Enter MCQ statement"
                            className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                        />
                    </div>

                    <div className="mt-8">
                        <h2 className="mb-4 text-xl font-semibold text-[#2B3F43]">
                            Options
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block font-medium">
                                    Option A
                                </label>

                                <input
                                    type="text"
                                    value={optionA}
                                    onChange={(e) => setOptionA(e.target.value)}
                                    className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Option B
                                </label>

                                <input
                                    type="text"
                                    value={optionB}
                                    onChange={(e) => setOptionB(e.target.value)}
                                    className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Option C
                                </label>

                                <input
                                    type="text"
                                    value={optionC}
                                    onChange={(e) => setOptionC(e.target.value)}
                                    className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block font-medium">
                                    Option D
                                </label>

                                <input
                                    type="text"
                                    value={optionD}
                                    onChange={(e) => setOptionD(e.target.value)}
                                    className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                                />
                            </div>

                        </div>
                    </div>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">

                        <div>
                            <label className="mb-2 block font-semibold text-[#2B3F43]">
                                Correct Option
                            </label>

                            <select
                                value={correctOption}
                                onChange={(e) => setCorrectOption(e.target.value)}
                                className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                            >
                                <option value="">Select Correct Option</option>
                                <option value="A">Option A</option>
                                <option value="B">Option B</option>
                                <option value="C">Option C</option>
                                <option value="D">Option D</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block font-semibold text-[#2B3F43]">
                                Reason
                            </label>

                            <textarea
                                rows={3}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="w-full rounded-lg border p-3 outline-none focus:border-[#2B3F43]"
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-full rounded-xl bg-[#2B3F43] py-3 font-semibold text-white transition hover:opacity-90"
                    >
                        Update MCQ
                    </button>

                </form>

            </div>
        </div>
    );
};

export default Update;