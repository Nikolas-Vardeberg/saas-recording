import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return(
        <main className="sign-in">
            <aside className="testimonial">
                <Link href="/">
                    <Image 
                        src="/assets/icons/logo.svg"
                        alt="logo"
                        width={32}
                        height={32}
                    />
                    <h1>SnapCast</h1>
                </Link>

                <div className="description">
                    <section>
                        <figure>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Image
                                    src="/assets/icons/star.svg"
                                    alt="star"
                                    height={20}
                                    width={20}
                                    key={index}
                                />
                            ))}
                            </figure>
                            
                            <p>SnapCast makes screen recording easy. From quick walkthroughs to full presentation, its fast smooth and shareable</p>

                            <article>
                                <Image 
                                    src="/assets/images/jason.png"
                                    alt="jason"
                                    height={64}
                                    width={64}
                                    className="rounded-full"
                                />
                                <div>
                                    <h2>William Meindhart</h2>
                                    <p>Product designer, Easy123</p>
                                </div>
                            </article>
                    </section>
                </div>
                <p>&copy; Snapcast {new Date().getFullYear()}</p>
            </aside>
            <aside className="google-sign-in">
                <section>
                    <Link href="/">
                        <Image 
                            src="/assets/icons/logo.svg"
                            alt="logo"
                            height={40}
                            width={40}
                        />
                        <h1>SnapCast</h1>
                    </Link>
                    <p>Create and share your very <span>SnapCast</span> in no time</p>
                    <button>
                        <Image
                            src="/assets/icons/google.svg"
                            alt="google"
                            width={22}
                            height={22}
                        />
                        <span>Sign in with Google</span>
                    </button>
                </section>
            </aside>
            <div className="overlay" />
        </main>
    )
}