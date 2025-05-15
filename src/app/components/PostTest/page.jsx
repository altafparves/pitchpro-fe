"use client";

import TopBar from "@/app/components/bar/TopBar";
import BasicLayout from "@/app/components/BasicLayout";
import ProgressBar from "@/app/components/ProgressBar";
import IconCancelGrey from "../../../../public/assets/icons/ic_cancel_grey";
import { Card } from "@/app/components/Card";
import CustomSlider from "@/app/components/CustomSlider";
import ContentWrapper from "@/app/components/ContentWrapper";
import OptionButton from "@/app/components/Buttons/OptionBtn";
import Button from "@/app/components/Button";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { sendPostTest } from "@/redux/features/PostTest/postTestSlice";
import { useRouter } from "next/navigation";
export default function PostTest({ nodeId, onDone,status }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [anxietyLevel, setAnxietyLevel] = useState(null);
  const [anxietyReason, setAnxietyReason] = useState("");
  const [progress, setProgress] = useState(0);


  const reasons = ["The topic", "The environment", "Lack of preparation", "Fear of failure"];

  useEffect(() => {
    if (anxietyLevel !== null && anxietyReason) {
      setProgress(100);
    } else if (anxietyLevel !== null || anxietyReason) {
      setProgress(50);
    } else {
      setProgress(0);
    }
  }, [anxietyLevel, anxietyReason]);

  const handleNext = () => {
    if (anxietyLevel === null || !anxietyReason) {
      alert("Please complete both questions before proceeding.");
      return;
    }
    dispatch(
      sendPostTest({
        id: nodeId,
        anxiety_level: anxietyLevel,
        anxiety_reason: anxietyReason,
        status,
      })
    )
      .unwrap()
      .then(() => {
        onDone();
      })
      .catch((err) => {
        console.error("Posttest submission failed:", err);
      });
  };

  const handleGoBack = () => {
    router.push("/story/1/1");
  };

  return (
    <BasicLayout className="bg-neutral-400">
      <TopBar bgColor="bg-neutral-50">
        <div className="flex w-full flex-row gap-6 items-center">
          <button onClick={handleGoBack}>
            <IconCancelGrey />
          </button>
          <ProgressBar progress={progress} />
        </div>
      </TopBar>

      <ContentWrapper className="pt-[102px] min-h-screen justify-between pb-12">
        <div className="w-full flex flex-col gap-6 mb-6">
          <Card borderColor="border-[#5CAAFF]" title="How anxious were you during this public speaking practice?">
            <div className="w-full pt-4">
              <CustomSlider onChange={setAnxietyLevel} />
            </div>
            <p className="text-caption-c1 w-full flex flex-row justify-between items-center pt-1 text-neutral-900 font-semibold">
              Not Anxious
              <span>Very Anxious</span>
            </p>
          </Card>

          <Card borderColor="border-[#5CAAFF]" title="What made you anxious during this public speaking practice?">
            <div className="flex mt-5 flex-col items-start gap-4">
              {reasons.map((label) => (
                <OptionButton key={label} label={label} selected={anxietyReason === label} onSelect={setAnxietyReason} />
              ))}
            </div>
          </Card>
        </div>

        <Button onClick={handleNext} disabled={anxietyLevel === null || !anxietyReason}>
          Next
        </Button>
      </ContentWrapper>
    </BasicLayout>
  );
}
