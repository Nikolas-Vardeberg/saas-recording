"use client"

import FileInput from "@/components/file-input";
import FormField from "@/components/form-field";
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from "@/constants";
import { getThumbnailUploadUrl, getVideoUploadUrl, saveVideoDetails } from "@/lib/actions/video";
import { useFileInput } from "@/lib/hooks/use-file-input";
import { redirect, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

const uploadFileToBunny = (file: File, uploadUrl: string, accessKey: string): Promise<void> => {
    return fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "Content-type": file.type,
            AccessKey: accessKey,
        },
        body: file,
    }).then((response) => {
        if (!response.ok) throw new Error("Upload failed")
    })
}

export default function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [videoDuration, setVideoDuration] = useState(0)
    const router = useRouter();
 

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

    useEffect(() => {
        if (video.duration === null || 0) {
            setVideoDuration(video.duration)
        }
    }, [video.duration])

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

            const { 
                videoId,
                uploadUrl: videoUploadUrl,
                accessKey: videoAccessKey
            } = await getVideoUploadUrl();

            if (!videoUploadUrl || !videoAccessKey) throw new Error("Failed to get video upload credentials");

            await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

            const {
                uploadUrl: thumbnailUploadUrl,
                accessKey: thumbnailAccessKey,
                cdnUrl: thumbnailCdnUrl
            } = await getThumbnailUploadUrl(videoId)

            if (!thumbnailUploadUrl || !thumbnailAccessKey || !thumbnailCdnUrl) throw new Error("Failed to get thumbnail upload credentials");

            await uploadFileToBunny(thumbail.file, thumbnailUploadUrl, thumbnailAccessKey);

            await saveVideoDetails({
                videoId,
                thumbnailUrl: thumbnailCdnUrl,
                ...formData,
                duration: videoDuration
            })

            router.push(`/video/${videoId}`)

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