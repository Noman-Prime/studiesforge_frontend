"use client";

import { useState, useEffect, use } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const create = () => {

    const router = useRouter();

    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);

    // const [formData, setFormData] = useState({
    //     subject: "",
    //     chapter: "",
    //     title: "",
    //     image: null,
    //     video: null,
    //     isPublished: true,
    //     content: []
    // });

    

    const getSubjects = async () => {
        try {
            const resp = await axios.get( `${process.env.NEXT_PUBLIC_API}/api/v1/subject/all`, { withCredentials: true});
            if (resp.data.success) {
                setSubjects(resp.data.subjects);
            }
        } catch (error) {
            console.log(error.response?.data?.error);
        }
    };
    useEffect(()=>{
        getSubjects()
    },[])

    const getChapters = async (id) => {
        try {

            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/mdcat/chapter/subject/${id}`,
                {
                    withCredentials: true
                }
            );

            if (data.success) {
                setChapters(data.chapters);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        setFormData({
            ...formData,
            [name]:9
                type === "checkbox"
                    ? checked
                    : type === "file"
                        ? files[0]
                        : value
        });
    };

    const addSection = () => {
        setFormData({
            ...formData,
            content: [
                ...formData.content,
                {
                    subHeading: "",
                    description: "",
                    list: [],
                    table: {
                        headers: [],
                        rows: []
                    },
                    image: null
                }
            ]
        });
    };

    const removeSection = (index) => {
        const updated = [...formData.content];
        updated.splice(index, 1);

        setFormData({
            ...formData,
            content: updated
        });
    };

    const handleSectionChange = (index, field, value) => {
        const updated = [...formData.content];
        updated[index][field] = value;

        setFormData({
            ...formData,
            content: updated
        });
    };

    const handleSectionImage = (index, file) => {
        const updated = [...formData.content];
        updated[index].image = file;

        setFormData({
            ...formData,
            content: updated
        });
    };

    const addListItem = (sectionIndex) => {
        const updated = [...formData.content];
        updated[sectionIndex].list.push("");

        setFormData({
            ...formData,
            content: updated
        });
    };

    const removeListItem = (sectionIndex, listIndex) => {
        const updated = [...formData.content];
        updated[sectionIndex].list.splice(listIndex, 1);

        setFormData({
            ...formData,
            content: updated
        });
    };

    const handleListChange = (sectionIndex, listIndex, value) => {
        const updated = [...formData.content];
        updated[sectionIndex].list[listIndex] = value;

        setFormData({
            ...formData,
            content: updated
        });
    };

    const addHeader = (sectionIndex) => {
        const updated = [...formData.content];

        updated[sectionIndex].table.headers.push("");

        updated[sectionIndex].table.rows.forEach(row => {
            row.push("");
        });

        setFormData({
            ...formData,
            content: updated
        });
    };

    const removeHeader = (sectionIndex, headerIndex) => {
        const updated = [...formData.content];

        updated[sectionIndex].table.headers.splice(headerIndex, 1);

        updated[sectionIndex].table.rows.forEach(row => {
            row.splice(headerIndex, 1);
        });

        setFormData({
            ...formData,
            content: updated
        });
    };

    const handleHeaderChange = (sectionIndex, headerIndex, value) => {
        const updated = [...formData.content];

        updated[sectionIndex].table.headers[headerIndex] = value;

        setFormData({
            ...formData,
            content: updated
        });
    };

    const addRow = (sectionIndex) => {
        const updated = [...formData.content];

        updated[sectionIndex].table.rows.push(
            Array(updated[sectionIndex].table.headers.length).fill("")
        );

        setFormData({
            ...formData,
            content: updated
        });
    };

    const removeRow = (sectionIndex, rowIndex) => {
        const updated = [...formData.content];

        updated[sectionIndex].table.rows.splice(rowIndex, 1);

        setFormData({
            ...formData,
            content: updated
        });
    };

    const handleRowChange = (sectionIndex, rowIndex, columnIndex, value) => {
        const updated = [...formData.content];

        updated[sectionIndex].table.rows[rowIndex][columnIndex] = value;

        setFormData({
            ...formData,
            content: updated
        });
    };

    const handleSubmit = async (e) => {

    };

    return (
        <div className="w-full p-6">
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">

                <h1 className="text-3xl font-bold mb-8">
                    Create Topic
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                        <label className="block font-medium mb-2">
                            Subject
                        </label>

                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 outline-none"
                        >
                            <option value="">
                                Select Subject
                            </option>

                            {
                                subjects.map((item) => (
                                    <option
                                        key={item._id}
                                        value={item._id}
                                    >
                                        {item.title}
                                    </option>
                                ))
                            }

                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-2">
                            Chapter
                        </label>

                        <select
                            name="chapter"
                            value={formData.chapter}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3 outline-none"
                        >
                            <option value="">
                                Select Chapter
                            </option>

                            {
                                chapters.map((item) => (
                                    <option
                                        key={item._id}
                                        value={item._id}
                                    >
                                        {item.number}. {item.title}
                                    </option>
                                ))
                            }

                        </select>
                    </div>

                </div>

                <div className="mt-6">

                    <label className="block font-medium mb-2">
                        Topic Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter Topic Title"
                        className="w-full border rounded-lg p-3 outline-none"
                    />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                    <div>

                        <label className="block font-medium mb-2">
                            Cover Image
                        </label>

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                    <div>

                        <label className="block font-medium mb-2">
                            Video
                        </label>

                        <input
                            type="file"
                            name="video"
                            accept="video/*"
                            onChange={handleChange}
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                </div>

                <div className="flex items-center gap-3 mt-6">

                    <input
                        type="checkbox"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={handleChange}
                    />

                    <label>
                        Publish Topic
                    </label>

                </div>

                <div className="flex justify-end mt-6">

                    <button
                        type="button"
                        onClick={addSection}
                        className="px-5 py-2 rounded-lg bg-green-600 text-white"
                    >
                        Add Section
                    </button>

                </div>

                <div className="space-y-8 mt-8">

                    {
                        formData.content.map((section, sectionIndex) => (

                            <div
                                key={sectionIndex}
                                className="border rounded-xl p-6 space-y-6"
                            >

                                <div className="flex justify-between items-center">

                                    <h2 className="text-xl font-semibold">
                                        Section {sectionIndex + 1}
                                    </h2>

                                    <button
                                        type="button"
                                        onClick={() => removeSection(sectionIndex)}
                                        className="text-red-600"
                                    >
                                        Remove
                                    </button>

                                </div>

                                <div>

                                    <label className="block mb-2">
                                        Sub Heading
                                    </label>

                                    <input
                                        type="text"
                                        value={section.subHeading}
                                        onChange={(e) =>
                                            handleSectionChange(
                                                sectionIndex,
                                                "subHeading",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded-lg p-3"
                                    />

                                </div>

                                <div>

                                    <label className="block mb-2">
                                        Description
                                    </label>

                                    <textarea
                                        rows={6}
                                        value={section.description}
                                        onChange={(e) =>
                                            handleSectionChange(
                                                sectionIndex,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="w-full border rounded-lg p-3 resize-none"
                                    />

                                </div>

                                <div>

                                    <div className="flex justify-between items-center mb-3">

                                        <label>
                                            Bullet List
                                        </label>

                                        <button
                                            type="button"
                                            onClick={() => addListItem(sectionIndex)}
                                            className="px-3 py-1 rounded bg-blue-600 text-white"
                                        >
                                            Add Item
                                        </button>

                                    </div>

                                    <div className="space-y-3">

                                        {
                                            section.list.map((item, listIndex) => (

                                                <div
                                                    key={listIndex}
                                                    className="flex gap-3"
                                                >

                                                    <input
                                                        type="text"
                                                        value={item}
                                                        onChange={(e) =>
                                                            handleListChange(
                                                                sectionIndex,
                                                                listIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="flex-1 border rounded-lg p-3"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeListItem(
                                                                sectionIndex,
                                                                listIndex
                                                            )
                                                        }
                                                        className="px-4 bg-red-600 text-white rounded-lg"
                                                    >
                                                        X
                                                    </button>

                                                </div>

                                            ))
                                        }

                                    </div>

                                </div>
                                <div>

                                    <div className="flex justify-between items-center mb-3">

                                        <label>
                                            Table Headers
                                        </label>

                                        <button
                                            type="button"
                                            onClick={() => addHeader(sectionIndex)}
                                            className="px-3 py-1 rounded bg-green-600 text-white"
                                        >
                                            Add Header
                                        </button>

                                    </div>

                                    <div className="space-y-3">

                                        {
                                            section.table.headers.map((header, headerIndex) => (

                                                <div
                                                    key={headerIndex}
                                                    className="flex gap-3"
                                                >

                                                    <input
                                                        type="text"
                                                        value={header}
                                                        onChange={(e) =>
                                                            handleHeaderChange(
                                                                sectionIndex,
                                                                headerIndex,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="flex-1 border rounded-lg p-3"
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeHeader(
                                                                sectionIndex,
                                                                headerIndex
                                                            )
                                                        }
                                                        className="px-4 rounded-lg bg-red-600 text-white"
                                                    >
                                                        X
                                                    </button>

                                                </div>

                                            ))
                                        }

                                    </div>

                                </div>

                                <div>

                                    <div className="flex justify-between items-center mb-3">

                                        <label>
                                            Table Rows
                                        </label>

                                        <button
                                            type="button"
                                            onClick={() => addRow(sectionIndex)}
                                            className="px-3 py-1 rounded bg-green-600 text-white"
                                        >
                                            Add Row
                                        </button>

                                    </div>

                                    <div className="space-y-4">

                                        {
                                            section.table.rows.map((row, rowIndex) => (

                                                <div
                                                    key={rowIndex}
                                                    className="grid gap-3"
                                                    style={{
                                                        gridTemplateColumns: `repeat(${section.table.headers.length || 1}, minmax(0,1fr))`
                                                    }}
                                                >

                                                    {
                                                        row.map((cell, columnIndex) => (

                                                            <input
                                                                key={columnIndex}
                                                                type="text"
                                                                value={cell}
                                                                onChange={(e) =>
                                                                    handleRowChange(
                                                                        sectionIndex,
                                                                        rowIndex,
                                                                        columnIndex,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="border rounded-lg p-3"
                                                            />

                                                        ))
                                                    }

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeRow(
                                                                sectionIndex,
                                                                rowIndex
                                                            )
                                                        }
                                                        className="px-4 py-2 rounded-lg bg-red-600 text-white"
                                                    >
                                                        Remove Row
                                                    </button>

                                                </div>

                                            ))
                                        }

                                    </div>

                                </div>

                                <div>

                                    <label className="block mb-2">
                                        Section Image
                                    </label>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handleSectionImage(
                                                sectionIndex,
                                                e.target.files[0]
                                            )
                                        }
                                        className="w-full border rounded-lg p-3"
                                    />

                                </div>

                            </div>

                        ))
                    }

                </div>

                <div className="flex justify-end mt-10">

                    <button
                        type="button"
                        disabled={loading}
                        onClick={handleSubmit}
                        className="px-8 py-3 rounded-lg bg-blue-600 text-white disabled:opacity-50"
                    >
                        {
                            loading
                                ? "Creating..."
                                : "Create Topic"
                        }
                    </button>

                </div>

            </div>
        </div>
    );
};

export default create;