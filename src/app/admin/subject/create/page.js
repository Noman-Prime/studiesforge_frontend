"use client";

import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2B3F43]">Create Subject</h1>
          <p className="mt-2 text-gray-600">Add a new subject to your MDCAT website.</p>
        </div>
        <form onSubmit={createSubject} className="w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div className="bg-[#2B3F43] px-8 py-6">
            <h2 className="text-2xl font-semibold text-white">Subject Information</h2>
          </div>
          <div className="grid w-full gap-10 p-8 lg:grid-cols-2">
            <div className="w-full">
              <label className="mb-3 block font-semibold text-[#2B3F43]">Subject Image</label>
              <div className="w-full overflow-hidden rounded-2xl border border-dashed border-gray-300 bg-gray-50">
                <div className="flex h-80 w-full items-center justify-center bg-gray-100">
                  {preview ? (
                    <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-lg text-gray-400">No Image Selected</span>
                  )}
                </div>
                <div className="border-t p-5">
                  <input ref={fileRef} type="file" name="image" accept="image/*" onChange={changeData} className="w-full rounded-xl border border-gray-300 bg-white p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-[#2B3F43] file:px-5 file:py-2 file:text-white file:cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col space-y-6">
              <div>
                <label className="mb-2 block font-semibold text-[#2B3F43]">Subject Title</label>
                <input type="text" name="title" value={data.title} onChange={changeData} placeholder="Enter subject title..." className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-[#2B3F43]" />
              </div>
              <div className="flex-grow">
                <label className="mb-2 block font-semibold text-[#2B3F43]">Description</label>
                <textarea name="description" value={data.description} onChange={changeData} rows={9} placeholder="Enter subject description..." className="w-full resize-none rounded-xl border border-gray-300 p-4 outline-none transition focus:border-[#2B3F43]" />
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-xl bg-[#2B3F43] px-8 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
                  {loading ? <Loader2 className="animate-spin" size={20} /> : "Create Subject"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;