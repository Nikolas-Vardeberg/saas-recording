"use server"

import { headers } from "next/headers"
import { auth } from "../auth"
import { BUNNY } from "@/constants"
import { apiFetch, getEnv, withErrorHandling } from "../utils";
import { db } from "@/drizzle/db";
import { videos } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";
import aj from "../arcjet";
import { fixedWindow, request } from "@arcjet/next";

const VIDEO_STREAM_BASE_URL = BUNNY.STREAM_BASE_URL;
const THUMBNAIL_STORAGE_BASE_URL = BUNNY.STORAGE_BASE_URL;
const THUMBNAIL_CDN_STORAGE = BUNNY.CDN_URL;
const BUNNY_LIBRARY_KEY = getEnv("BUNNY_LIBRARY_ID")
const ACCESS_KEYS = {
    streamAccessKey: getEnv("BUNNY_STREAM_ACCESS_KEY"),
    storageAccessKey: getEnv("BUNNY_STORAGE_ACCESS_KEY"),
}

const getSessionUserId = async ():Promise<string> => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) throw new Error("Unathorized");

    return session.user.id;
}

const validateWithArcjet = async (fingerprint: string) => {
    const rateLimit = aj.withRule(fixedWindow({
        mode: "LIVE",
        window: "1m",
        max: 2,
        characteristics: ["fingerprint"]
    }))

    const req = await request();

    const decision = await rateLimit.protect(req, { fingerprint });

    if (decision.isDenied()) {
        throw new Error("Rate limit exceeded");
    }
}

const revalidatePaths = (paths: string[]) => {
    paths.forEach((path) => revalidatePath(path))
}

export const getVideoUploadUrl = withErrorHandling(async () => {
    await getSessionUserId();

    const videoResposne = await apiFetch<BunnyVideoResponse>(
        `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_KEY}/videos`,
        {
            method: "POST",
            bunnyType: "stream",
            body: { title: "Temporary Title", collectionId: ""}
        }
    )

    const uploadUrl = `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_KEY}/videos/${videoResposne.guid}`;

    return {
        videoId: videoResposne.guid,
        uploadUrl,
        accessKey: ACCESS_KEYS.streamAccessKey
    }
})

export const getThumbnailUploadUrl = withErrorHandling(async (videoId: string) => {
    const filename = `${Date.now()}-${videoId}-thumbnail}`;
    const uploadUrl = `${THUMBNAIL_STORAGE_BASE_URL}/thumbnails/${filename}`
    const cdnUrl = `${THUMBNAIL_CDN_STORAGE}/thumbnails/${filename}`

    return {
        uploadUrl,
        cdnUrl,
        accessKey: ACCESS_KEYS.storageAccessKey
    }
})

export const saveVideoDetails = withErrorHandling(async (videoDetails: VideoDetails) => {
    const userId = await getSessionUserId();
    await validateWithArcjet(userId);

    await apiFetch(
        `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIBRARY_KEY}/videos/${videoDetails.videoId}`,
        {
            method: "POST",
            bunnyType: "stream",
            body: {
                title: videoDetails.title,
                description: videoDetails.description
            }
        }
    )

    await db.insert(videos).values({
        ...videoDetails,
        videoUrl: `${BUNNY.EMBED_URL}/${BUNNY_LIBRARY_KEY}/${videoDetails.videoId}`,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
    })

    revalidatePaths(["/"]);

    return { videoId: videoDetails.videoId }
})