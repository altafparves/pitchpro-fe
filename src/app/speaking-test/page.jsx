"use client";
import IconCancelGrey from "../../../public/assets/icons/ic_cancel_grey";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import IconAudio from "../../../public/assets/icons/mingcute_voice-fill";
import IconInfo from "../../../public/assets/icons/IconInfo";
export default function SpeakingTestPage() {
  return (
    <>
      <div className="flex bg-neutral-50 w-full min-h-screen flex-col px-5 pt-14 pb-12 justify-between items-center">
        {/* top */}
        <div className="w-ful flex flex-col gap-5">
          {/* progress */}
          <div className="w-full bg-neutral-50 flex items-center flex-row gap-3">
            <button>
              <IconCancelGrey />
            </button>
            <ProgressBar progress={30} />
          </div>
          {/* pointer */}
          <div
            className="w-full rounded-3xl bg-[#EBF4FF] py-4 px-3 flex-col items-start justify-start gap-1"
            style={{
              boxShadow: "0px 4px 0px 0px #ADD5FF",
            }}
          >
            <p className="text-body font-semibold text-neutral-900">This is Pointer</p>
            <p className="text-label font-normal text-neutral-900">This text will help you practice in public speaking. Below this pointer is animation showing the schenario of life moments.</p>
          </div>
        </div>

        <div className="bottom w-full flex flex-col gap-6">
          <div className="w-full flex flex-row gap-4">
            <Button variant="info" className="w-[30%]">
              <IconInfo></IconInfo>
            </Button>
            <Button variant="primary" className="flex flex-row gap-1">
              <IconAudio></IconAudio>Record Audio
            </Button>
          </div>
          <Button variant="success">Next</Button>
        </div>
      </div>
    </>
  );
}
