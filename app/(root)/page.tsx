import Header from "@/components/header"
import VideoCard from "@/components/video-card"
import { getAllVideos } from "@/lib/actions/video";

export default async function Page({ searchParams }: SearchParams) {
    const { query, filter, page } = await searchParams;
    const { videos, pagination } = await getAllVideos(query, filter, Number(page) || 1)

    return(
        <main className="wrapper page">
            <Header title="All Videos" subHeader="Public library" />

            {videos?.length > 0 ? (
                <section className="video-grid">
                    {videos.map(({ video, user }) => (
                        <VideoCard 
                            key={video.id}
                            {...video}
                            thumbnail={video.thumbnailUrl}
                            userImg={user?.image || ""}
                            username={user?.name || ""}
                        />
                    ))}
                </section>
            ) : (
                <div>Empty</div>
            )}
        </main>
    )
}