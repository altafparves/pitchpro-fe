"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Button from "../../components/Button";
import Textfield from "../../components/Textfield";
import { signupUser, clearError } from "@/redux/features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (form.password !== form.verifyPassword) {
      alert("Passwords do not match!");
      return;
    }

    const result = await dispatch(
      signupUser({
        username: form.username,
        email: form.email,
        password: form.password,
      })
    );

    if (signupUser.fulfilled.match(result)) {
      router.push("/auth/finish");
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-50 px-7 flex flex-col justify-between items-start pb-12 pt-14">
      <div className="flex flex-col w-full gap-10">
        <button onClick={() => router.back()} className="flex flex-row gap-2 items-center p-2 pl-0 text-body text-neutral-300 font-semibold">
          <FontAwesomeIcon icon={faArrowLeft} className="w-[29px] h-[29px]" />
          Back
        </button>
        <div className="form w-full flex flex-col items-center gap-6">
          <Textfield label="Email" name="email" value={form.email} onChange={handleChange} placeholder="pionirgacor@gmail.com" />
          <Textfield label="Name" name="username" value={form.username} onChange={handleChange} placeholder="your name" />
          <Textfield label="Password" name="password" value={form.password} onChange={handleChange} placeholder="******" type="password" />
          <Textfield label="Verify Password" name="verifyPassword" value={form.verifyPassword} onChange={handleChange} placeholder="******" type="password" />
          {error && <p className="text-red-500 text-sm">{error.message || error}</p>}
          <p className="text-label text-neutral-900 font-[550] w-full text-center">
            Have an account?{" "}
            <button onClick={() => router.push("/auth/login")} className="text-[#5CAAFF]">
              Log in here
            </button>
          </p>
        </div>
      </div>
      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create Account"}
      </Button>
    </div>
  );
}
