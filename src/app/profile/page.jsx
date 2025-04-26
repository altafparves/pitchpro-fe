"use client";
import Image from "next/image";
import Card from "../components/Card";
import XpChip from "../components/XpChip";
import Badges from "./Badges";
import LineChart from "../components/chart/LineChart";
export default function ProfilePage() {
  return (
    <div className="flex-1 bg-neutral-50  overflow-y-auto px-5 pb-[104px] flex flex-col items-start gap-6 pt-14">
      <Card>
        <div className="w-full flex flex-row gap-6 items-center justify-center">
          <Image className="rounded-full bg-gray-600" height={128} width={128}></Image>
          <p className="text-neutral-900 text-title font-semibold flex flex-col items-start text-center">
            Alfi 220
            <span className="text-label font-normal">fianc@gmail.com</span>
          </p>
        </div>
      </Card>
      <Card padding="p-4">
        <div className="w-full flex flex-col gap-2 items-start">
          <p className="text-neutral-900 text-title font-semibold flex flex-col items-start text-center gap-2">
            Progress
            <span className="text-label font-normal">Your XP in this week</span>
          </p>
          <LineChart></LineChart>
          <p className="text-label font-normal text-neutral-900">Total XP in this week</p>
          <XpChip />
        </div>
      </Card>
      <Badges/>
     
    </div>
  );
}
