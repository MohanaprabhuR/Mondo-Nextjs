import Image from "next/image";
import Link from "next/link";
import CategoryMenu from "@/Components/Header/categoryMenu";

export default async function Header() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/category`);
  const category = await data.json();

  return (
    <header className="header fixed top-0 z-50 w-full transition-all ease-in-out bg-[rgba(0,0,0,0.8)] py-3">
      <nav className="relative mx-auto flex h-10 w-full items-center justify-between px-4 xl:max-w-[1280px]">
        <Link
          className="outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 relative flex shrink-0 items-center justify-center rounded ring-inset sm:h-12"
          href="/"
        >
          <Image
            alt="Universal FYC Home"
            width={182}
            height={18}
            src="https://mondo-dev.vercel.app/images/horizontal-logo.png"
          />
        </Link>
        <CategoryMenu categorylist={category} />
      </nav>
    </header>
  );
}
