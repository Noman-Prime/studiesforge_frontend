"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const SubjectsTopic = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTopics = async () => {
        try {
            const { data: res } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/api/v1/topic/by_subject`,
                { withCredentials: true }
            );

            if (res?.data) {
                setData(res.data);
            }

        } catch (error) {
            console.error("Topic fetch error:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchTopics();
    }, []);



    if (loading) {
        return (
            <div className="py-16 text-center text-gray-500">
                Loading topics...
            </div>
        );
    }



    return (
        <section className="bg-gradient-to-br from-[#eef5f6] via-[#f8fafc] to-white px-6 lg:px-16 py-12">

            <div className="max-w-[1500px] mx-auto">


                <div className="mb-10">

                    <div className="inline-flex rounded-full bg-[#2B3F43]/10 px-4 py-2 text-sm font-semibold text-[#2B3F43]">
                        TOPIC LIBRARY
                    </div>


                    <h2 className="mt-4 text-3xl font-bold text-[#2B3F43]">
                        Explore What You Will Learn
                    </h2>


                    <p className="mt-3 text-base text-gray-600">
                        Discover important MDCAT topics organized by subject.
                    </p>

                </div>




                <div className="space-y-8">


                    {data.map((item) => (

                        <div key={item.subject._id}>


                            <div className="mb-4">

                                <h3 className="text-2xl font-bold text-[#2B3F43]">
                                    {item.subject.title}
                                </h3>

                            </div>



                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">



                                {item.topics?.slice(0, 3).map((topic) => (


                                    <Link
                                        key={topic._id}
                                        href={`/topic/${topic._id}`}
                                        className="group overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(43,63,67,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(43,63,67,0.18)]"
                                    >


                                        <div className="h-32 overflow-hidden bg-gray-100">


                                            {topic.image?.url ? (

                                                <img
                                                    src={topic.image.url}
                                                    alt={topic.title}
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                                />

                                            ) : (

                                                <div className="flex h-full items-center justify-center text-gray-400">
                                                    Topic Image
                                                </div>

                                            )}


                                        </div>



                                        <div className="p-4">


                                            <h4 className="line-clamp-1 text-base font-bold text-[#2B3F43]">
                                                {topic.title}
                                            </h4>


                                            <p className="mt-2 text-sm text-gray-500">
                                                Start Learning →
                                            </p>


                                        </div>


                                    </Link>


                                ))}





                                <Link
                                    href={`/subjectDetail/${item.subject._id}`}
                                    className="flex min-h-[200px] flex-col items-center justify-center rounded-2xl bg-[#2B3F43] text-white shadow-[0_10px_30px_rgba(43,63,67,0.2)] transition duration-300 hover:-translate-y-1"
                                >


                                    <div className="text-4xl">
                                        →
                                    </div>


                                    <h4 className="mt-3 text-xl font-bold">
                                        View All
                                    </h4>


                                    <p className="mt-1 text-sm text-white/70">
                                        {item.subject.title} Topics
                                    </p>


                                </Link>



                            </div>


                        </div>


                    ))}


                </div>


            </div>


        </section>
    );
};


export default SubjectsTopic;