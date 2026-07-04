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
                `${process.env.NEXT_PUBLIC_API}/api/v1/user/signup`,
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
        <div className="min-h-screen bg-gray-100 py-6 md:py-10 px-2 md:px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="border-b px-6 md:px-8 py-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Create Admin</h1>
                    <p className="text-gray-600 mt-1 text-sm md:text-base">Create a new administrator account for Studies Forge.</p>
                </div>
                <form onSubmit={submitHandler} className="p-6 md:p-8 space-y-8 md:space-y-10">
                    <div className="w-full">
                        <h2 className="text-lg font-semibold text-gray-900 border-b pb-3 mb-6">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">First Name</label>
                                <input type="text" name="firstName" value={form.firstName} onChange={changeHandler} placeholder="Enter first name" required className="w-full h-12 rounded-xl border border-gray-300 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43] outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Last Name</label>
                                <input type="text" name="lastName" value={form.lastName} onChange={changeHandler} placeholder="Enter last name" required className="w-full h-12 rounded-xl border border-gray-300 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43] outline-none transition" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <h2 className="text-lg font-semibold text-gray-900 border-b pb-3 mb-6">Account Information</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                                <input type="email" name="email" value={form.email} onChange={changeHandler} placeholder="admin@studiesforge.com" required className="w-full h-12 rounded-xl border border-gray-300 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43] outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                                <input type="password" name="password" value={form.password} onChange={changeHandler} placeholder="••••••••" required className="w-full h-12 rounded-xl border border-gray-300 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43] outline-none transition" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <h2 className="text-lg font-semibold text-gray-900 border-b pb-3 mb-6">Additional Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                                <input type="text" name="phoneNumber" value={form.phoneNumber} onChange={changeHandler} placeholder="+1 234 567 890" className="w-full h-12 rounded-xl border border-gray-300 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43] outline-none transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Country</label>
                                <input type="text" name="country" value={form.country} onChange={changeHandler} placeholder="United States" className="w-full h-12 rounded-xl border border-gray-300 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43] outline-none transition" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <h2 className="text-lg font-semibold text-gray-900 border-b pb-3 mb-6">Profile Image</h2>
                        <label htmlFor="image" className="w-full h-48 md:h-64 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col justify-center items-center cursor-pointer hover:border-[#2B3F43] transition">
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-md" />
                            ) : (
                                <div className="text-center p-4">
                                    <UploadCloud size={55} className="text-gray-400 mx-auto" />
                                    <h3 className="mt-4 font-semibold text-gray-900">Upload Profile Image</h3>
                                    <p className="text-gray-500 text-xs md:text-sm mt-1">Click to browse your computer</p>
                                </div>
                            )}
                            <input id="image" type="file" accept="image/*" hidden onChange={imageHandler} />
                        </label>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t">
                        <button type="button" onClick={() => router.back()} className="px-8 py-3 rounded-xl border border-gray-300 text-gray-900 font-medium hover:bg-gray-100 transition">Cancel</button>
                        <button type="submit" disabled={loading} className="px-10 py-3 rounded-xl bg-[#2B3F43] text-white font-semibold hover:bg-[#203033] transition disabled:opacity-70">
                            {loading ? "Creating..." : "Create Admin"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Create;