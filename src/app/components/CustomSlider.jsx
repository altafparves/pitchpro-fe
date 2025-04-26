'use client';
import { useState } from "react";

export default function CustomSlider() {
  const [value, setValue] = useState(50);

  return (
    <div className="flex flex-col items-center w-full px-6">
      {/* Slider container */}
      <div className="relative w-full max-w-md">
        {/* Background Track */}
        <div className="h-10 rounded-full bg-gray-300 relative overflow-hidden">
          {/* Active Fill */}
          <div className="h-full bg-blue-500 absolute top-0 left-0 rounded-full" style={{ width: `${value}%` }}></div>
          {/* Thumb */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 bg-white border-4 border-blue-500 rounded-full"
            style={{
              left: `calc(${value}% - 20px)`,
              width: "40px",
              height: "40px",
            }}
          ></div>
        </div>

        {/* Invisible Input Range */}
        <input type="range" min="0" max="100" value={value} onChange={(e) => setValue(e.target.value)} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
      </div>
    </div>
  );
}

