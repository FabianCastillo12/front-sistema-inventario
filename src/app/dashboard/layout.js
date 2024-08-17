import NavbarTop from "@/components/navbarComponents/navbarTop";
import Navbar from "../../components/dashboardComponents/navbar";
import "../../styles/dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-1 w-full bg-[#171821]  ">
      <div className=" hidden lg:block fixed top-0 left-0 w-[5rem] bg-[#171821] h-screen border-r-[1px] border-white/10 z-[9001]">
        <Navbar />
      </div>

      <div className="w-full mt-20 lg:ml-[5rem] p-6 ">
        <main className=" ">
          <div className=" left-0 bg-[#171821] z-[9000] w-full top-0 fixed lg:w-[calc(100%-4rem)] lg:left-[5rem] p-4">
            <NavbarTop />
          </div>
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
}
