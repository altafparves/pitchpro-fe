import AudioRecorder from "../Recorder";
import Countdown from "../Countdown";
import Line from "../Line";
import Button from "../Button";
import IconInfo from "../../../../public/assets/icons/IconInfo";
export default function RecordActionPanel(){
    return (
      // onClick={() => setRunning((prev) => !prev)}
      <>
        <div className="flex bottom-0 fixed rounded-t-[20px] bg-neutral-50 flex-col w-full px-5 pt-6 h-auto pb-12">
          {/* title */}
          <p className="text-title pb-5 text-neutral-800 font-semibold">Persuade Dimas</p>
          <div className="buttons  flex flex-col w-full gap-6 justify-center">
            <div className="flex gap-6 flex-row items-center justify-between">
              <Button width="w-fit" className="px-7 py-4" variant="info">
                <IconInfo></IconInfo>
              </Button>
              <AudioRecorder />
            </div>
            <Countdown number={30} />
            <Line></Line>
            <Button>Next</Button>
          </div>
        </div>
      </>
    );
}