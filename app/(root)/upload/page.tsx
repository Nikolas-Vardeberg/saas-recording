"use client"

import FileInput from "@/components/file-input";
import FormField from "@/components/form-field";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import { useFileInput } from "@/lib/hooks/use-file-input";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

export default function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [duration, setDuration] = useState(0);
    const inputRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        visibility: "public",
    })
    const [error, setError] = useState("");
    
    const video = useFileInput(MAX_VIDEO_SIZE);
    const thumbail = useFileInput(MAX_THUMBNAIL_SIZE);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            if (!video.file || !thumbail.file) {
                setError("Please upload a video and thumbail");
                return;
            }
            if (!formData.title || !formData.description) {
                setError("Please fill in all the details");
                return;
            }
        } catch (error) {
            console.log("Error submitting form", error)
        } finally {
            setIsSubmitting(false);
        }
    }


    return(
        <div className="wrapper-md upload-page">
            <h1>Upload a Video</h1>
           
            {error && <div className="error-field">{error}</div>}

            <form className="rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5" onSubmit={handleSubmit}>
                <FormField 
                    id="title"
                    label="title"
                    placeholder="Enter a clear and concise video title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <FormField 
                    id="description"
                    label="description"
                    placeholder="Describe what the video is about"
                    value={formData.description}
                    as="textarea"
                    onChange={handleInputChange}
                />

                <FileInput
                    id="video"
                    label="Video"
                    accept="video/*"
                    file={video.file}
                    previewUrl={video.previewUrl}
                    inputRef={video.inputRef}
                    onChange={video.handleFileChange}
                    onReset={video.resetFile}
                    type="video"
                />

                <FileInput
                    id="thumbail"
                    label="Thumbail"
                    accept="image/*"
                    file={thumbail.file}
                    previewUrl={thumbail.previewUrl}
                    inputRef={thumbail.inputRef}
                    onChange={thumbail.handleFileChange}
                    onReset={thumbail.resetFile}
                    type="image"
                />

                <FormField
                    id="visibility"
                    label="Visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                    as="select"
                    options={[
                        { value: "public", label: "Public" },
                        { value: "private", label: "Private" },
                    ]}
                />
                
                <button type="submit" disabled={isSubmitting} className="submit-button">
                    {isSubmitting ? "Uploading..": "Upload a video"}
                </button>
            </form>
        </div>
    )
}