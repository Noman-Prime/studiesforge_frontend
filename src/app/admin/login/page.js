"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { ShieldCheck, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/app/context/auth";

const Login = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/api/v1/user/login`,
        data,
        {
          withCredentials: true,
        }
      );

      if (resp.data.success) {
        setUser(resp.data.user)

        toast.success("Welcome to StudiesForge");
        router.push("/admin");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-[#2B3F43] p-8 text-center text-white">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm">
            <ShieldCheck size={36} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
          <p className="text-white/80 mt-2 text-sm">Access your secure dashboard</p>
        </div>

        <form onSubmit={submitHandler} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-900 ml-1">
                Email Address
              </label>

              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-gray-400" size={18} />

                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={changeHandler}
                  required
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43] outline-none transition-all"
                  placeholder="admin@studiesforge.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-900 ml-1">
                Password
              </label>

              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-gray-400" size={18} />

                <input
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={changeHandler}
                  required
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#2B3F43]/20 focus:border-[#2B3F43] outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-14 rounded-2xl bg-[#2B3F43] text-white font-bold text-lg hover:bg-[#1e2d30] transition-all flex items-center justify-center gap-2"
          >
            Login
            <ArrowRight size={20} />
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/user/password/forgot")}
            className="block w-full text-sm font-semibold text-[#2B3F43] hover:underline"
          >
            Forgot password?
          </button>
        </form>

        <div className="pb-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} StudiesForge — Secure Portal
        </div>
      </div>
    </div>
  );
};

export default Login;