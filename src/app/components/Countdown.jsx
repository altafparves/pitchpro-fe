// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import PropTypes from "prop-types";

// const Countdown = ({ number = 60, running = true, className = "", ...props }) => {
//   const [seconds, setSeconds] = useState(parseInt(number, 10) || 0);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     if (running && seconds > 0 && !intervalRef.current) {
//       intervalRef.current = setInterval(() => {
//         setSeconds((prev) => prev - 1);
//       }, 1000);
//     }

//     if (!running && intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }

//     return () => {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     };
//   }, [running]);

//   useEffect(() => {
//     if (seconds <= 0 && intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//   }, [seconds]);

//   return (
//     <div
//       className={`py-3 flex rounded-full items-center justify-center text-body font-[550] w-full
//         bg-[#D6F5D6] shadow-[0px_2px_0px_0px_#ADEBAD] ${className}`}
//       {...props}
//     >
//       <p className="text-title font-[550] text-green-600">{seconds > 0 ? `${seconds}s remaining` : "Time's up!"}</p>
//     </div>
//   );
// };

// Countdown.propTypes = {
//   className: PropTypes.string,
//   number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   running: PropTypes.bool,
// };

// export default Countdown;
"use client";
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const Countdown = ({ number = 60, running = true, className = "", ...props }) => {
  const [seconds, setSeconds] = useState(parseInt(number, 10) || 0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running && seconds > 0 && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }

    if (!running && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [running]);

  useEffect(() => {
    if (seconds <= 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [seconds]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div
      className={`py-3 px-6 rounded-full items-center justify-center font-semibold text-[20px] w-full shadow-[0px_2px_0px_0px_#ADEBAD]
        bg-[#D6F5D6]  text-green-700 flex ${className}`}
      {...props}
    >
      <span className="text-title font-[550] text-green-600">{formatTime(seconds)}</span>
    </div>
  );
};

Countdown.propTypes = {
  className: PropTypes.string,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  running: PropTypes.bool,
};

export default Countdown;
