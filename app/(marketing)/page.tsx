import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { headingFont } from "@/components/fonts/headingFont";
import { textFont } from "@/components/fonts/textFont";

const MarketingPage = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className={cn(
          "flex justify-center items-center flex-col",
          headingFont.className
        )}
      >
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 task management.
        </div>
        <h1 className="text-3xl md:text-6xl text-center text-neutral-800 mb-6">
          Taskify helps team move
        </h1>
        <div className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white px-4 p-2 rounded-md pb-4">
          work forward.
        </div>
        <div
          className={cn(
            "mx-auto text-center max-w-xs md:max-w-2xl text-sm md:text-xl text-netural-400 mt-4",
            textFont.className
          )}
        >
          Collaborate, manage projects, and reach new productivity peaks. From
          high rises to the home office, the way your team works is unique -
          accomplish it all with Taskify.
        </div>
        <Button className="mt-6" size="lg" asChild>
          <Link href="/sign-up">Get Taskify for free</Link>
        </Button>
      </div>
    </div>
  );
};

export default MarketingPage;
