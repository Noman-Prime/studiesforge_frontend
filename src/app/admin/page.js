"use client";

import Link from "next/link";
import { Images, BookOpen, Library, FileText, CircleHelp, ArrowRight } from "lucide-react";
import { useAuth } from "../context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Admin = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);


  const pages = [
    { name: "Sliders", description: "Manage homepage sliders", href: "/admin/slider", icon: Images },
    { name: "Subjects", description: "Manage all subjects", href: "/admin/subject", icon: BookOpen },
    { name: "Chapters", description: "Manage subject chapters", href: "/admin/chapter/create", icon: Library },
    { name: "Topics", description: "Manage chapter topics", href: "/admin/topic/create", icon: FileText },
    { name: "MCQs", description: "Manage practice questions", href: "/admin/MCQS/create", icon: CircleHelp },
  ];


  if (!user) {
    return null;
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2B3F43]">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your MDCAT website content from one place.
          </p>
        </div>


        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {pages.map((page) => {

            const Icon = page.icon;

            return (
              <Link
                key={page.name}
                href={page.href}
                className="group flex flex-col rounded-2xl bg-[#2B3F43] p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-[#2B3F43]">
                  <Icon size={28} />
                </div>


                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {page.name}
                </h2>


                <p className="mt-2 flex-grow text-sm text-gray-300">
                  {page.description}
                </p>


                <div className="mt-6 flex items-center gap-2 font-semibold text-white">
                  Manage
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-2"
                  />
                </div>


              </Link>
            );
          })}

        </div>

      </div>
    </div>
  );
};

export default Admin;