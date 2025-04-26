import TopBar from "@/app/components/TopBar";
import BasicLayout from "../components/BasicLayout";
import ProgressBar from "../components/ProgressBar";
import IconCancelGrey from "../../../public/assets/icons/ic_cancel_grey";
import Card from "../components/Card";
import CustomSlider from "../components/CustomSlider";
import ContentWrapper from "../components/ContentWrapper";
import OptionButton from "../components/Buttons/OptionBtn";
import Textfield from "../components/Textfield";
import Button from "../components/Button";
export default function PretestPage() {
  return (
    <>
      <BasicLayout className="bg-neutral-400">
        <TopBar bgColor="bg-neutral-50">
          <div className="flex  w-full flex-row gap-6 items-center">
            <button>
              <IconCancelGrey />
            </button>
            <ProgressBar progress={30} />
          </div>
        </TopBar>

        <ContentWrapper className="pt-[112px] min-h-screen   justify-between pb-12">
          <div className="w-full flex flex-col gap-6 mb-6">
            <Card borderColor="border-[#5CAAFF]" title="How anxious were you during this public speaking practice?">
              <CustomSlider></CustomSlider>
              <p className="text-caption-c1 w-full flex flex-row justify-between items-center text-neutral-900 font-semibold">
                Not Anxious
                <span>Very Anxious</span>
              </p>
            </Card>
            <Card borderColor="border-[#5CAAFF]" title="What made you anxious during this public speaking practice?">
              <div className="flex mt-5 flex-col items-start gap-4">
                <OptionButton label="The topic" />
                <OptionButton label="Feeling embarassed" />
                <OptionButton label="Lack of preparation" />
                <OptionButton label="Fear of negative evaluation" />
                <OptionButton label="The type of language used " />
                <Textfield className="mb-0" placeholder="Other"></Textfield>
              </div>
            </Card>
          </div>
          <Button>Next</Button>
        </ContentWrapper>
      </BasicLayout>
    </>
  );
}
