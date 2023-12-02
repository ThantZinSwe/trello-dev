import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { headingFont } from "@/components/fonts/headingFont";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/logo.svg" alt="Logo" width={30} height={30} />
        <p className={cn("text-lg text-netural-700 pb-1", headingFont)}>
          Taskify
        </p>
      </div>
    </Link>
  );
};

export default Logo;
