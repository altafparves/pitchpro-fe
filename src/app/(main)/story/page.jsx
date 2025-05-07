"use client";
import { useRouter } from "next/navigation";
import XpChip from "@/app/components/XpChip";
import StoryCard from "@/app/components/StoryCard";
import PageTransitionWrapper from "@/app/animation/PageTransition";
export default function Home() {
  const router = useRouter();
  return (
    <>
    <PageTransitionWrapper transitionType="dissolve">
      <div className="bg-neutral-50 overflow-y-auto w-full min-h-screen flex flex-col relative ">
        <div className="bg-neutral-50 h-[104px] flex items-end justify-end py-2 fixed w-full z-40 px-6">
          <XpChip></XpChip>
        </div>

        <div className="flex-1 bg-neutral-50 mt-[104px] overflow-y-auto px-6 pb-[104px] flex flex-col gap-8 ">
          <div className="w-full flex flex-col items-start gap-4 text-neutral-900">
            <p className="text-heading-h1 font-semibold">Story</p>
          </div>
          {/* story container */}
          <div className="w-full flex flex-col gap-8">
            {/* story */}
            <StoryCard id="final-year" title="Final Year of Collage Student" bgGradient="bg-[linear-gradient(to_bottom_right,#DAECFF,#7BB1EB)]" contentBg="bg-[#EBF4FF]" shadowColor="#ADD5FF" />
            {/* story 2 */}
            <StoryCard title="Final Year of Collage Student" bgGradient="bg-[linear-gradient(to_bottom_right,#E9D1EE,#E08CED)]" contentBg="bg-[#EBD4F7]" shadowColor="#D6A5EE" />
          </div>
        </div>
      </div>
      </PageTransitionWrapper>
    </>
  );
}
