import Header from "@/components/header"
import VideoCard from "@/components/video-card"
import { dummyData } from "@/constants"

export default function Page() {
    return(
        <main className="wrapper page">
            <Header title="All Videos" subHeader="Public library" />

            <section className="video-grid">
                {dummyData.map((card) => (
                    <VideoCard key={card.id} {...card} />
                ))}
            </section>
        </main>
    )
}