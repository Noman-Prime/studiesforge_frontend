"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const Update = () => {

    const { id } = useParams();

    const fileRef = useRef(null);

    const [subject, setSubject] = useState(null);

    const [preview, setPreview] = useState(null);

    const [data, setData] = useState({
        image: null,
        title: "",
        description: ""
    });

    const getSubject = async () => {

        try {

            const result = await axios.get(
                `http://localhost:5000/api/v1/subject/get/${id}`,
                { withCredentials: true }
            );

            const sub = result.data.subject;

            setSubject(sub);

            setData({
                image: null,
                title: sub.title || "",
                description: sub.description || ""
            });

            setPreview(sub.image?.url || null);

        } catch (error) {

            console.log(error);
            toast.error("Failed to fetch subject");

        }

    };

    useEffect(() => {
        if (id) {
            getSubject();
        }
    }, [id]);

    const changeData = (e) => {

        const { name, value, files, type } = e.target;

        if (type === "file") {

            const file = files[0];

            setData((prev) => ({
                ...prev,
                image: file
            }));

            if (file) {
                setPreview(URL.createObjectURL(file));
            }

            return;
        }

        setData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const updateSubject = async (e) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("title", data.title);
            formData.append("description", data.description);

            if (data.image) {
                formData.append("image", data.image);
            }

            const res = await axios.put(
                `http://localhost:5000/api/v1/subject/update/${id}`,
                formData,
                { withCredentials: true }
            );

            toast.success(res.data?.message || "Subject updated successfully");

        } catch (error) {

            console.log(error);
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );

        }

    };

    if (!subject) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <h1 className="text-gray-600 text-lg">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-6xl p-8">

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-[#2B3F43]">
                        Update Subject
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Update subject information
                    </p>
                </div>

                <form
                    onSubmit={updateSubject}
                    className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl"
                >

                    <div className="bg-[#2B3F43] px-8 py-6">
                        <h2 className="text-2xl font-semibold text-white">
                            Subject Information
                        </h2>
                    </div>

                    <div className="grid gap-10 p-8 lg:grid-cols-2">

                        <div>

                            <label className="mb-3 block font-semibold text-[#2B3F43]">
                                Subject Image
                            </label>

                            <div className="rounded-2xl border border-dashed border-gray-300 overflow-hidden">

                                <div className="h-80 flex items-center justify-center bg-gray-100">

                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-400">
                                            No Image
                                        </span>
                                    )}

                                </div>

                                <div className="p-5 border-t">

                                    <input
                                        ref={fileRef}
                                        type="file"
                                        name="image"
                                        onChange={changeData}
                                        className="w-full"
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="space-y-6">

                            <div>

                                <label className="block mb-2 font-semibold text-[#2B3F43]">
                                    Subject Title
                                </label>

                                <input
                                    name="title"
                                    value={data.title}
                                    onChange={changeData}
                                    className="w-full border p-4 rounded-xl"
                                />

                            </div>

                            <div>

                                <label className="block mb-2 font-semibold text-[#2B3F43]">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={data.description}
                                    onChange={changeData}
                                    rows={5}
                                    className="w-full border p-4 rounded-xl"
                                />

                            </div>

                            <button
                                type="submit"
                                className="bg-[#2B3F43] text-white px-8 py-3 rounded-xl"
                            >
                                Update Subject
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default Update;