"use client";
import BasicLayout from "../BasicLayout"
import { Card } from "../Card";
import XpChip from "../XpChip";
import PaceChart from "../chart/PaceChart";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setNavigationDirection } from "@/app/utils/NavigationDirection";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedback } from "@/redux/features/feedback/feedbackSlice";
export default function PracticeFeedback({ onDone,id=1 }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, loading, error } = useSelector((state) => state.feedback);

  const handleQuit = () => {
        setNavigationDirection("backward");
      router.push("/story/1/1");  
  };

  useEffect(() => {
    if (id) {
      console.log("Fetching feedback with id:", id);
      dispatch(fetchFeedback(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (data) {
      console.log("Fetched feedback data:", data);
    }
  }, [data]);
  
    return (
      <>
        <BasicLayout className="bg-neutral-5\0 h-full overflow-auto px-5 py-14">
          <div className="flex flex-col items-center gap-6 pb-2">
            <p className="text-center text-title font-[600] text-neutral-900">Practice Feedback</p>
            <Card borderColor="#5CAAFF" shadow="#ADD5FF" title="Points">
              <XpChip></XpChip>
            </Card>
            <Card borderColor="#5CAAFF" shadow="#ADD5FF" title="Badge">
              <div className="w-full flex flex-col items-center">From Blank to Bold</div>
            </Card>
            <Card borderColor="#5CAAFF" shadow="#ADD5FF" title="Pace">
              <PaceChart></PaceChart>
              <div className="flex flex-col items-start gap-2 mt-1">
                <p className="text-label font-normal text-neutral-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis excepturi molestiae, numquam nostrum earum delectus.</p>
                <p className="text-label font-normal text-neutral-900">
                  {" "}
                  Tips ✌️
                  <span>
                    <ul>
                      <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, est.</li>
                    </ul>
                  </span>
                </p>
              </div>
            </Card>
            <Card borderColor="#5CAAFF" shadow="#ADD5FF" title="Intonation">
              <div className="flex flex-col items-start gap-2 mt-1">
                <p className="text-label font-normal text-neutral-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis excepturi molestiae, numquam nostrum earum delectus.</p>
                <p className="text-label font-normal text-neutral-900">
                  {" "}
                  Tips ✌️
                  <span>
                    <ul>
                      <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, est.</li>
                    </ul>
                  </span>
                </p>
              </div>
            </Card>
            <Card borderColor="#5CAAFF" shadow="#ADD5FF" title="Articulation">
              <div className="flex flex-col items-start gap-2 mt-1">
                <p className="text-label font-normal text-neutral-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis excepturi molestiae, numquam nostrum earum delectus.</p>
                <p className="text-label font-normal text-neutral-900">
                  {" "}
                  Tips ✌️
                  <span>
                    <ul>
                      <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, est.</li>
                    </ul>
                  </span>
                </p>
              </div>
            </Card>
            <Card borderColor="#5CAAFF" shadow="#ADD5FF" title="Word Choice">
              <div className="flex flex-col items-start gap-2 mt-1">
                <p className="text-label font-normal text-neutral-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis excepturi molestiae, numquam nostrum earum delectus.</p>
                <p className="text-label font-normal text-neutral-900">
                  {" "}
                  Tips ✌️
                  <span>
                    <ul>
                      <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, est.</li>
                    </ul>
                  </span>
                </p>
              </div>
            </Card>
            <div className="flex w-full flex-col gap-6 items-center">
              <Button variant="info">Check Voice Record</Button>
              <Button onClick={handleQuit} variant="info">Back To Home</Button>
              <Button onClick={onDone}>Next Story</Button>
            </div>
          </div>
        </BasicLayout>
      </>
    );
}