"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { ShieldCheck, Mail, Lock } from "lucide-react";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/v1/user/login`,
        form,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Welcome to StudiesForge");
        router.push("/admin");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#2B3F43] text-white p-6 sm:p-8">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
            <ShieldCheck size={30} />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-white/80 mt-1 text-sm">
            Manage your StudiesForge Dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} className="p-6 sm:p-8 space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <div className="flex items-center h-12 border border-gray-300 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-[#2B3F43] focus-within:border-transparent transition">
              <Mail className="ml-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={changeHandler}
                required
                className="flex-1 h-full bg-transparent outline-none px-3 text-base"
                placeholder="emailaddres@gmail.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="flex items-center h-12 border border-gray-300 rounded-xl bg-gray-50 focus-within:ring-2 focus-within:ring-[#2B3F43] focus-within:border-transparent transition">
              <Lock className="ml-3 text-gray-400" size={20} />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={changeHandler}
                required
                className="flex-1 h-full bg-transparent outline-none px-3 text-base"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => router.push("/admin/user/password/forgot")}
              className="text-sm font-medium text-[#2B3F43] hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#2B3F43] text-white font-semibold hover:bg-[#203033] transition disabled:opacity-70 active:scale-[0.98]"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div className="bg-gray-50 border-t px-8 py-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} StudiesForge
        </div>
      </div>
    </div>
  );
};

export default Login;