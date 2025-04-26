"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function StoryCard({ title, bgGradient, contentBg, shadowColor, id }) {
    
  const router = useRouter();

  return (
    <div className={`w-full rounded-[20px] relative h-[384px] ${bgGradient} cursor-pointer`} onClick={() => router.push(`/story/${id}`)}>
      <div className={`content absolute bottom-0 h-[40%] rounded-b-[20px] ${contentBg} p-5 shadow-[0px_4px_0px_0px_${shadowColor}]`}>
        <p className="text-heading-h3 font-[550] text-start text-[#0A4585]">{title}</p>
      </div>
    </div>
  );
}
