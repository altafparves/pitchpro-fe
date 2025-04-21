"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { signupUser, clearError } from "@/redux/features/auth/authSlice";
import Textfield from "../components/Textfield";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(false);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLoginSubmit = () => {
    setShowWelcome(true);
  };

  const handleStartClick = () => {
    router.push("/dashboard"); 
  };

  return (
    <>
      {/* Login Form - hidden when showWelcome is true */}
      <div className={`w-full min-h-screen bg-neutral-50 px-7 flex-col justify-between items-center pb-12 pt-14 ${showWelcome ? "hidden" : "flex"}`}>
        {/* top */}
        <div className="flex flex-col w-full gap-10">
          <button onClick={() => router.back()} className="flex flex-row gap-2 items-center p-2 pl-0 text-body text-neutral-300 font-semibold text">
            <FontAwesomeIcon icon={faArrowLeft} className="w-[29px] h-[29px]" />
            Back
          </button>
          <div className="form w-full flex flex-col items-center">
            <Textfield label="Email" placeholder="pionirgacor@gmail.com" />
            <Textfield label="Password" placeholder="******" type="password" />
            <p className="text-label text-neutral-900 font-[500] w-full text-center">
              Does not have an account?{" "}
              <button onClick={handleLoginClick} className="text-[#5CAAFF]">
                Create here
              </button>
            </p>
          </div>
        </div>
        <Button onClick={handleLoginSubmit}>Login</Button>
      </div>

      {/* Welcome Screen - hidden when showWelcome is false */}
      <div className={`w-full min-h-screen bg-neutral-50 px-7 flex-col justify-between items-center pb-12 pt-14 ${showWelcome ? "flex" : "hidden"}`}>
        <div className="flex flex-col w-full gap-2">
          <p className="text-neutral-900 font-semibold text-title text-center">Finish</p>
          <p className="text-neutral-900 font-normal text-title text-center">Let's get start our journey!</p>
        </div>
        <Image src="/assets/illustrations/login1.svg" height={288} width={288} alt="Welcome Illustration" />
        <Button onClick={handleStartClick}>Start</Button>
      </div>
    </>
  );
}