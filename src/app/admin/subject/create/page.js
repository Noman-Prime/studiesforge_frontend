"use client";

import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, UploadCloud } from "lucide-react";

const Create = () => {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    image: null,
    title: "",
    description: "",
  });

  const changeData = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const file = files[0];
      setData((prev) => ({ ...prev, image: file }));
      if (file) setPreview(URL.createObjectURL(file));
      return;
    }
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const createSubject = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("title", data.title);
      formData.append("description", data.description);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/v1/subject/create`, formData, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        setData({ image: null, title: "", description: "" });
        setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create subject");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2B3F43] sm:text-4xl">Create Subject</h1>
          <p className="mt-2 text-gray-600">Add a new subject to your MDCAT website.</p>
        </div>

        <form onSubmit={createSubject} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div className="bg-[#2B3F43] px-8 py-6">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">Subject Information</h2>
          </div>

          <div className="flex flex-col gap-8 p-6 sm:p-8">
            <div>
              <label className="mb-3 block font-semibold text-[#2B3F43]">Subject Image</label>
              <div 
                onClick={() => fileRef.current?.click()}
                className="relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-[#2B3F43] hover:bg-gray-100"
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="h-full w-full rounded-2xl object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <UploadCloud size={48} className="mb-2" />
                    <span className="font-medium">Click to upload image</span>
                  </div>
                )}
                <input ref={fileRef} type="file" name="image" accept="image/*" onChange={changeData} className="hidden" />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block font-semibold text-[#2B3F43]">Subject Title</label>
                <input type="text" name="title" value={data.title} onChange={changeData} placeholder="Enter subject title..." className="w-full rounded-xl border border-gray-300 p-4 text-gray-900 outline-none transition focus:border-[#2B3F43]" />
              </div>
              <div>
                <label className="mb-2 block font-semibold text-[#2B3F43]">Description</label>
                <textarea name="description" value={data.description} onChange={changeData} rows={6} placeholder="Enter subject description..." className="w-full resize-none rounded-xl border border-gray-300 p-4 text-gray-900 outline-none transition focus:border-[#2B3F43]" />
              </div>
            </div>

            <div className="flex justify-end mt-1">
              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2B3F43] px-8 py-4 font-semibold text-white transition hover:opacity-90 disabled:opacity-50 sm:w-auto">
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Create Subject"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;