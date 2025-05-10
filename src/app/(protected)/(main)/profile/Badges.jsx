import Image from "next/image";
import {Card} from "@/app/components/Card";

const BADGES = [
  {
    src: "/assets/illustrations/i_persuasion.svg",
    alt: "Persuasion Badge",
    title: "Persuasion Pro",
    earned: true,
  },
  {
    src: "/assets/illustrations/i_prof.svg",
    alt: "Professor's Favorite Badge",
    title: "Professor's Favorite",
  },
  {
    src: "/assets/illustrations/i_bold.svg",
    alt: "From Blank to Bold Badge",
    title: "From Blank to Bold",
  },
  {
    src: "/assets/illustrations/i_study.svg",
    alt: "Study Magnet Badge",
    title: "Study Magnet",
  },
  {
    src: "/assets/illustrations/i_brainstormer.svg",
    alt: "Brainstormer Badge",
    title: "Brainstormer",
  },
  {
    src: "/assets/illustrations/i_quiz.svg",
    alt: "Storycrafter Badge",
    title: "Storycrafter",
  },
  {
    src: "/assets/illustrations/i_social.svg",
    alt: "Social Strategist Badge",
    title: "Social Strategist",
  },
  {
    src: "/assets/illustrations/i_quiz.svg",
    alt: "Quiz Whisperer Badge",
    title: "Quiz Whisperer",
  },
  {
    src: "/assets/illustrations/i_brainstormer.svg",
    alt: "Mic Dropper Badge",
    title: "Mic Dropper",
  },
];

export default function Badges() {
  return (
    <Card padding="p-4" title="Badges">
      <div className="w-full grid grid-cols-3 justify-items-center items-center mx-auto gap-2">
        {BADGES.map((badge, index) => (
          <BadgeItem key={index} {...badge} />
        ))}
      </div>
    </Card>
  );
}

function BadgeItem({ src, alt, title, earned }) {
  return (
    <div className="flex flex-col">
      <Image height={88} width={88} src={src} alt={alt} className={`object-contain ${earned ? "" : "grayscale opacity-80"}`} />
      <p className="text-center text-neutral-900 text-caption-c1 font-semibold">{title}</p>
    </div>
  );
}