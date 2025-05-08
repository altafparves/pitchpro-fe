"use client";
import { useRouter } from "next/navigation";
import XpChip from "@/app/components/XpChip";
import StoryCard from "@/app/components/StoryCard";
import PageTransitionWrapper from "@/app/animation/PageTransition";
import ProtectedRoute from "@/app/(protected)/layout";
import ChapterCard from "@/app/components/ChapterCard";
export default function StoryDetail() {
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
                <p className="text-heading-h1 font-semibold">Chapter</p>
              </div>
              {/* story container */}
              <div className="w-full flex flex-col gap-8">
                {/* story */}
                <ChapterCard chapterId={1} title="Chapter 1" description="Practice with friend and final presentation with lecture"></ChapterCard>
              </div>
            </div>
          </div>
        </PageTransitionWrapper>
    </>
  );
}
