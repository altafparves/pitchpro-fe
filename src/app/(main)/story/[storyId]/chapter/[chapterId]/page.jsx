import Button from "@/app/components/Button";
import BasicLayout from "@/app/components/BasicLayout";
import LocalVideoPlayer from "@/app/components/LocalVideoPlayer";
export default function ChapterPage() {
  return (
    <>
      <BasicLayout className="bg-primary-300">
        <LocalVideoPlayer autoPauseAt="0:10" />
        <div className="flex bottom-0 fixed rounded-t-[20px] bg-neutral-50 flex-col w-full px-5 pt-6 h-auto pb-12">
          {/* title */}
          <p className="text-title pb-5 text-neutral-800 font-semibold">What do you want?</p>
          <div className="buttons  flex flex-col w-full gap-6 justify-center">
            <Button variant="info" className="font-[500]">
              Practice With Friend
            </Button>
            <Button variant="info" className="font-[500]">
              Practice With Myself
            </Button>
            <div className="h-[1px] bg-[#C7C7C7] w-full"></div>
            <Button>Next</Button>
          </div>
        </div>
      </BasicLayout>
    </>
  );
}
