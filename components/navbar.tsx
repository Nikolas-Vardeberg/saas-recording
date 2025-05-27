import Image from "next/image";
import Link from "next/link";

const user = {}

export default function Navbar() {
    return(
        <header className="navbar">
            <nav>
                <Link href="/">
                    <Image 
                        src="/assets/icons/logo.svg"
                        height={32}
                        width={32}
                        alt="logo"
                    />
                    <h1>SnapCast</h1>
                </Link>

                {user && (
                    <figure>
                        <button>
                            <Image 
                                src="/assets/images/dummy.jpg"
                                height={36}
                                width={36}
                                alt="user"
                                className="rounded-lg aspect-square"
                            />
                        </button>
                        <button className="cursor-pointer">
                            <Image 
                                src="/assets/icons/logout.svg"
                                height={24}
                                width={24}
                                alt="logout"
                            />
                        </button>
                    </figure>
                )}
            </nav>
        </header>
    )
}