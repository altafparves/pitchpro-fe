// src/app/layout.js
import Navbar from "../components/navbar";

export const metadata = {
  title: "Main Layout",
};

export default function MainLayout({ children }) {
  return (

          <div className="flex flex-col  min-h-screen">
            <main className="flex-1 bg-neutral-50">{children}</main>
            <Navbar />
          </div>
  );
}
