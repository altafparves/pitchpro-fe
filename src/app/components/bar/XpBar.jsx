"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchXp } from "@/redux/features/xp/XpSlice";
import XpChip from "../XpChip";

export default function XpBar() {
  const dispatch = useDispatch();
  const xp = useSelector((state) => state.xp.value);
  const loading = useSelector((state) => state.xp.loading);

  useEffect(() => {
    dispatch(fetchXp());
  }, [dispatch]);

  return (
    <div className="bg-neutral-50 h-[104px] flex items-end justify-end py-2 fixed w-full z-40 px-6">
      <XpChip>{loading ? "..." : xp}</XpChip>
    </div>
  );
}
