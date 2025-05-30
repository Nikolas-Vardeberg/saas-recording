export const MAX_VIDEO_SIZE = 500 * 1024 * 1024;
export const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024;

export const BUNNY = {
  STREAM_BASE_URL: "https://video.bunnycdn.com/library",
  STORAGE_BASE_URL: "https://storage.bunnycdn.com/snapcast-ver",
  CDN_URL: "https://ver-snapcast.b-cdn.net",
  EMBED_URL: "https://iframe.mediadelivery.net/embed",
  TRANSCRIPT_URL: "https://vz-3c6ce555-dc5.b-cdn.net",
};

export const emojis = ["😂", "😍", "👍"];

export const filterOptions = [
  "Most Viewed",
  "Most Recent",
  "Oldest First",
  "Least Viewed",
];

export const visibilities: Visibility[] = ["public", "private"];

export const ICONS = {
  record: "/assets/icons/record.svg",
  close: "/assets/icons/close.svg",
  upload: "/assets/icons/upload.svg",
};

export const initialVideoState = {
  isLoaded: false,
  hasIncrementedView: false,
  isProcessing: true,
  processingProgress: 0,
};

export const infos = ["transcript", "metadata"];

export const DEFAULT_VIDEO_CONFIG = {
  width: { ideal: 1920 },
  height: { ideal: 1080 },
  frameRate: { ideal: 30 },
};

export const DEFAULT_RECORDING_CONFIG = {
  mimeType: "video/webm;codecs=vp9,opus",
  audioBitsPerSecond: 128000,
  videoBitsPerSecond: 2500000,
};

interface VideoData {
    id: string;
    title: string;
    thumbnail: string;
    createdAt: Date;
    userImg: string;
    username: string;
    views: number;
    visibility: Visibility;
    duration: number;
}

export const dummyData: VideoData[] = [
    {
        id: "1",
        title: "SnapChat Message",
        thumbnail: "/assets/images/video1.png",
        createdAt: new Date(),
        userImg: "/assets/images/jason.png",
        username: "Jason",
        views: 10,
        visibility: "public",
        duration: 165
    },
    {
        id: "1",
        title: "SnapChat Message",
        thumbnail: "/assets/images/video1.png",
        createdAt: new Date(),
        userImg: "/assets/images/jason.png",
        username: "Jason",
        views: 10,
        visibility: "public",
        duration: 165
    },
    {
        id: "1",
        title: "SnapChat Message",
        thumbnail: "/assets/images/video1.png",
        createdAt: new Date(),
        userImg: "/assets/images/jason.png",
        username: "Jason",
        views: 10,
        visibility: "public",
        duration: 165
    },
    {
        id: "1",
        title: "SnapChat Message",
        thumbnail: "/assets/images/video1.png",
        createdAt: new Date(),
        userImg: "/assets/images/jason.png",
        username: "Jason",
        views: 10,
        visibility: "public",
        duration: 165
    },
    {
        id: "1",
        title: "SnapChat Message",
        thumbnail: "/assets/images/video1.png",
        createdAt: new Date(),
        userImg: "/assets/images/jason.png",
        username: "Jason",
        views: 10,
        visibility: "public",
        duration: 165
    }
]