import Image from "next/image";

export default function EmptyState({ description, icon, title }: EmptyStateProps) {
    return (
        <section className="empty-state">
            <div>
                <Image
                    src={icon}
                    alt="icon"
                    width={46}
                    height={46}
                />
            </div>
            <article>
                <h3>{title}</h3>
                <p>{description}</p>
            </article>
        </section>
    )
}