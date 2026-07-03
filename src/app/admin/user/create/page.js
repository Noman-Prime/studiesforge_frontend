"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft, UploadCloud } from "lucide-react";

const Create = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        country: "",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");

    const changeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const imageHandler = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("firstName", form.firstName);
            formData.append("lastName", form.lastName);
            formData.append("email", form.email);
            formData.append("password", form.password);
            formData.append("phoneNumber", form.phoneNumber);
            formData.append("country", form.country);

            if (image) {
                formData.append("image", image);
            }

            const { data } = await axios.post(
                "http://localhost:5000/api/v1/user/signup",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data.success) {
                toast.success("Admin is Registed");
                router.push("/admin");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">

            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-8 py-6">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Create Admin
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Create a new administrator account for Studies Forge.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>

                </div>

                <form
                    onSubmit={submitHandler}
                    className="p-8 space-y-10"
                >

                    {/* Personal Information */}

                    <div>

                        <h2 className="text-lg font-semibold border-b pb-3 mb-8">
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-6 gap-y-6">

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={changeHandler}
                                    required
                                    className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:ring-4 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43] outline-none transition"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={changeHandler}
                                    required
                                    className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:ring-4 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43] outline-none transition"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Account Information */}

                    <div>

                        <h2 className="text-lg font-semibold border-b pb-3 mb-8">
                            Account Information
                        </h2>

                        <div className="space-y-6">

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                    required
                                    className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:ring-4 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43] outline-none transition"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                    required
                                    className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:ring-4 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43] outline-none transition"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Additional Information */}

                    <div>

                        <h2 className="text-lg font-semibold border-b pb-3 mb-8">
                            Additional Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-6 gap-y-6">

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={form.phoneNumber}
                                    onChange={changeHandler}
                                    className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:ring-4 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43] outline-none transition"
                                />

                            </div>

                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Country
                                </label>

                                <input
                                    type="text"
                                    name="country"
                                    value={form.country}
                                    onChange={changeHandler}
                                    className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:ring-4 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43] outline-none transition"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Image */}

                    <div>

                        <h2 className="text-lg font-semibold border-b pb-3 mb-8">
                            Profile Image
                        </h2>

                        <label
                            htmlFor="image"
                            className="w-full h-64 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:border-[#2B3F43] transition"
                        >

                            {
                                preview ? (

                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-40 h-40 rounded-full object-cover shadow-md"
                                    />

                                ) : (

                                    <>
                                        <UploadCloud
                                            size={55}
                                            className="text-gray-400"
                                        />

                                        <h3 className="mt-5 text-lg font-semibold text-gray-700">
                                            Upload Profile Image
                                        </h3>

                                        <p className="text-gray-500 text-sm mt-2">
                                            Click here to browse your computer
                                        </p>
                                    </>

                                )
                            }

                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={imageHandler}
                            />

                        </label>

                    </div>

                    {/* Buttons */}

                    <div className="flex justify-end gap-4 pt-6 border-t">

                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-8 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-10 py-3 p-2 rounded-xl bg-[#2B3F43] text-white font-semibold hover:bg-[#203033] transition disabled:opacity-70"
                        >
                            {loading ? "Creating..." : "Create Admin"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default Create;