// // src/app/page.js
// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   useEffect(() => {
//     // Redirect to signup page when the main page loads
//     router.push("/signup");
//   }, [router]);

//   // Return a simple loading state while redirecting
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <h2 className="text-xl font-semibold">Redirecting to signup...</h2>
//         <div className="mt-4 flex justify-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/app/page.js
"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSignupClick = () => {
    router.push("/signup");
  };

  const handleAiTestingClick = () => {
    router.push("/ai-testing"); // Assuming you have a page at /ai-testing
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-6">Welcome!</h2>
        <div className="flex space-x-4">
          <button
            onClick={handleSignupClick}
            className="bg-primary-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
          <button
            onClick={handleAiTestingClick}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            AI Testing
          </button>
        </div>
      </div>
    </div>
  );
}