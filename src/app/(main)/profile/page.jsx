"use client";
import { useSelector } from "react-redux";
import Image from "next/image";
import Card from "@/app/components/Card";
import XpChip from "@/app/components/XpChip";
import Badges from "./Badges";
import LineChart from "@/app/components/chart/LineChart";
import Skeleton from "@/app/components/Skeleton";
export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user?.user);
  return (
    <div className="flex-1 relative bg-neutral-50 overflow-y-auto px-5 pb-[104px] flex flex-col items-start gap-6 pt-14">
      <Card>
        <div className="w-fulls flex flex-row gap-6 items-center justify-start">
          <Image className="rounded-full bg-[#D9D9D9D9]" height={128} width={128} src={user.avatar} alt="User Avatar" />
           <p className="text-neutral-900 text-title font-semibold flex flex-col items-start text-center">
            {user?.username ? user.username : <Skeleton rows={1} height="12px" mb="0.75rem" />}
            <span className="text-label font-normal">{user?.email}</span>
          </p>
        </div>
      </Card>
      <Card padding="p-4" title="Progress">
        <div className="w-full flex flex-col gap-2 items-start">
          <p className="text-label font-normal text-neutral-900">Progress Your XP in this week</p>
          <LineChart />
          <p className="text-label font-normal text-neutral-900">Total XP in this week</p>
          <XpChip />
        </div>
      </Card>
      <Badges />
    </div>
  );
}
