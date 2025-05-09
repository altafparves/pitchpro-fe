'use client';
import TopBar from "@/app/components/bar/TopBar";
import BasicLayout from "@/app/components/BasicLayout";
import ProgressBar from "@/app/components/ProgressBar";
import IconCancelGrey from "../../../../public/assets/icons/ic_cancel_grey";
import Card from "@/app/components/Card";
import CustomSlider from "@/app/components/CustomSlider";
import ContentWrapper from "@/app/components/ContentWrapper";
import OptionButton from "@/app/components/Buttons/OptionBtn";
import Textfield from "@/app/components/Textfield";
import Button from "@/app/components/Button";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { sendPreTest } from "@/redux/features/Pretest/preTestSlice";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function PretestPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [anxietyLevel, setAnxietyLevel] = useState(true);
  const [anxietyReason, setAnxietyReason] = useState("");
  const [progress,setProgress]=useState(0);
  const searchParams = useSearchParams();
  const nodeId = searchParams.get("id");
  console.log("this is node",nodeId);
  useEffect(() => {
    if (anxietyLevel && anxietyReason) {
      setProgress(100);
    } else if (anxietyLevel || anxietyReason) {
      setProgress(50);
    } else {
      setProgress(0);
    }
  }, [anxietyLevel, anxietyReason]);
  const reasons = ["The topic", "The environment", "Lack of preparation", "Fear of failure"];

  // send pretest data to the server
  const handleNext = () => {
    if (!anxietyReason) {
      alert("Please select a reason for your anxiety.");
      return;
    }

    const userId = JSON.parse(localStorage.getItem("user"))?.id;
    localStorage.setItem(`pretest_done_${userId}`, "true");

    dispatch(
      sendPreTest({
        id: nodeId,
        anxiety_level: anxietyLevel,
        anxiety_reason: anxietyReason,
      })
    )
      .unwrap()
      .then(() => {
        router.push("/next-page");
      })
      .catch((err) => {
        console.error("Pretest submission failed:", err);
      });
  };
  
  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <BasicLayout className="bg-neutral-400">
        <TopBar bgColor="bg-neutral-50">
          <div className="flex  w-full flex-row gap-6 items-center">
            <button onClick={handleGoBack}>
              <IconCancelGrey />
            </button>
            <ProgressBar progress={progress} />
          </div>
        </TopBar>

        <ContentWrapper className="pt-[102px] min-h-screen   justify-between pb-12">
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
                {/* <Textfield className="mb-0" placeholder="Other"></Textfield> */}
              </div>
            </Card>
          </div>
          <Button onClick={handleNext} disabled={!anxietyLevel || !anxietyReason}>
            Next
          </Button>
        </ContentWrapper>
      </BasicLayout>
    </>
  );
}
