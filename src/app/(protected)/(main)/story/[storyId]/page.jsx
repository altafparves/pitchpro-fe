"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "@/redux/features/video/videoSlice";
import XpChip from "@/app/components/XpChip";
import PageTransitionWrapper from "@/app/animation/PageTransition";
import ChapterCard from "@/app/components/ChapterCard";
import useCombinedSceneData from "@/app/hooks/useCombinedSceneData";
export default function StoryDetail() {
  const dispatch = useDispatch();
  const { videos, loading, error } = useSelector((state) => state.video);
  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);
  useEffect(() => {
    if (videos.length > 0) {
      console.log("Fetched videos:", videos);
    }
  }, [videos]);

  const combinedSceneData = useCombinedSceneData(videos);

  useEffect(() => {
    console.log("Combined scene data with URLs:", combinedSceneData);
  }, [combinedSceneData]);

  return (
    <>
      <PageTransitionWrapper transitionType="dissolve">
        <div className="bg-neutral-50 overflow-y-auto w-full min-h-screen flex flex-col relative ">
          <div className="bg-neutral-50 h-[104px] flex items-end justify-end py-2 fixed w-full z-40 px-6">
            <XpChip />
          </div>

          <div className="flex-1 bg-neutral-50 mt-[104px] overflow-y-auto px-6 pb-[104px] flex flex-col gap-8 ">
            <div className="w-full flex flex-col items-start gap-4 text-neutral-900">
              <p className="text-heading-h1 font-semibold">Chapter</p>
            </div>
            {/* story container */}
            <div className="w-full flex flex-col gap-8">
              {/* story */}
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <div className="text-neutral-500 text-lg">Loading chapter...</div>
                </div>
              ) : (
                <ChapterCard chapterId={1} title="Chapter 1" description="Practice with friend and final presentation with lecture" />
              )}
            </div>
          </div>
        </div>
      </PageTransitionWrapper>
    </>
  );
}
