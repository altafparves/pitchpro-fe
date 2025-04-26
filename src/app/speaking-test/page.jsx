"use client";
import IconCancelGrey from "../../../public/assets/icons/ic_cancel_grey";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import IconAudio from "../../../public/assets/icons/mingcute_voice-fill";
import IconInfo from "../../../public/assets/icons/IconInfo";
import PopupInfo from "../components/PopupInfo";
export default function SpeakingTestPage() {
  return (
    <>
      <div className="flex bg-neutral-50 w-full min-h-screen flex-col px-5 pt-14 pb-12 justify-between items-center relative">
        {/* progress */}
        <div className="w-full bg-neutral-50 flex items-center flex-row gap-3">
          <button>
            <IconCancelGrey />
          </button>
          <ProgressBar progress={30} />
        </div>
        <PopupInfo title="This is Pointer" desc="This text will help you practice in public speaking. Below this pointer is animation showing the schenario of life moments."></PopupInfo>

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
