"use client";
import { useRouter } from "next/navigation";
import XpChip from "./components/XpChip";
import MenuButton from "./components/MenuButton";
export default function Home() {
  const router = useRouter();

  const handleSignupClick = () => {
    router.push("/signup-old");
  };
  const handleWelcomeClick = () => {
    router.push("/welcome");
  };

  const handleAiTestingClick = () => {
    router.push("/ai-testing");
  };

  return (
    <>
      <div className="bg-neutral-50 overflow-y-hidden w-full min-h-screen flex flex-col relative ">
        <div className="bg-neutral-50 h-[104px] flex items-end justify-end py-2 fixed w-full z-40 px-6">
          <XpChip></XpChip>
        </div>

        <div className="flex-1 bg-neutral-50 mt-[104px] overflow-y-auto px-6 pb-[104px] flex flex-col gap-8 ">
          <div className="w-full flex flex-col items-start gap-4 text-neutral-900">
            <p className="text-heading-h1 font-semibold">Story</p>
          </div>
          {/* story container */}
          <div className="w-full flex flex-col gap-8">
            {/* story */}
            <div className="w-full rounded-[20px] relative h-[384px] bg-[linear-gradient(to_bottom_right,#DAECFF,#7BB1EB)]">
              <div className="content absolute bottom-0 h-[40%] rounded-b-[20px] bg-[#EBF4FF] p-5 shadow-[0px_4px_0px_0px_#ADD5FF]">
                <p className="text-[#0A4585] font-[550] text-heading-h3 text-start">Final Year of Collage Student</p>
              </div>
            </div>
            {/* story 2 */}
            <div className="w-full rounded-[20px] relative h-[384px] bg-[linear-gradient(to_bottom_right,#E9D1EE,#E08CED)]">
              <div className="content absolute bottom-0 h-[40%] rounded-b-[20px] bg-[#EBD4F7] p-5 shadow-[0px_4px_0px_0px_#D6A5EE]">
                <p className="text-[#591D76] font-[550] text-heading-h3 text-start">Final Year of Collage Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}