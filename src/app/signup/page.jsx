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
export default function SignupPage() {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };
    return (
      <>
        <div className="w-full min-h-screen  bg-neutral-50 px-7 flex flex-col justify-between items-start pb-12  pt-14">
          {/* top */}
          <div className="flex flex-col w-full gap-10">
            <button onClick={() => router.back()} className="flex flex-row gap-2 items-center p-2 pl-0 text-body text-neutral-300 font-semibold text">
              <FontAwesomeIcon icon={faArrowLeft} className="w-[29px] h-[29px]" />
              Back
            </button>
            <div className="form w-full flex flex-col items-center">
              <Textfield label="Email" placeholder="pionirgacor@gmail.com" />
              <Textfield label="Name" placeholder="your name" />
              <Textfield label="Password" placeholder="******" />
              <Textfield label="Verify Password" placeholder="sdasd" />
              <p className="text-label text-neutral-900 font-[500] w-full text-center">
                Have an account?{" "}
                <button onClick={handleLoginClick} className="text-[#5CAAFF]">
                  Log in here
                </button>
              </p>
            </div>
          </div>
          <Button>Create Account</Button>
        </div>
      </>
    );
}