import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";
import { ArrowRight } from 'lucide-react';
import Cards from "../Components/Cards";
import { ListChecks, Clock, CheckCircle } from "lucide-react";


// tools
import { useSidebar } from "../Tools/sidebarUtils";
import { useNavigation } from "../Tools/navigationUtils";

function Intro() {
  const {isOpen, openSidebar, closeSidebar} = useSidebar();
  const Icon1 = <ListChecks />;
  const Icon2 = <Clock />;
  const Icon3 = <CheckCircle />;
  const { goToSignup, goToLogin, } = useNavigation();
  return (
    <main className="relative bg-[#111827] w-screen h-screen overflow-x-hidden">
      <header >
        <NavBar className="fixed" OpenSidebar={openSidebar} />
      </header>

      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"
          onClick={closeSidebar}
        ></div>
      )}

      <section
        className={`SideBar fixed h-full w-[70%] max-w-[300px] shadow-lg top-0 left-0 transition-transform duration-300 z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar CloseSidebar={closeSidebar} />
      </section>

      <section className="SectionOne mx-auto max-w-[1200px] px-5 text-center">
        <h1 className="text-white mt-40 text-[1rem] md:text-[3rem] font-extrabold mb-4">
          Organize your tasks with <span className="text-blue-500 font-extrabold">TaskMaster</span>
        </h1>
        <p className="text-white text-[1rem] font-extrabold mb-4">
          The simple, efficient way to manage your daily tasks, projects, and goals all in one place.
        </p>
        <div className="flex justify-center gap-5 flex-wrap">
          <button onClick={goToSignup} className="flex items-center justify-center gap-2 text-[1rem] text-black  px-6 py-3 min-w-[130px] max-w-[200px] bg-[#1e3a8a] rounded-md hover:bg-blue-500 transition-all duration-300">
            Get Started <ArrowRight />
          </button>
          <button onClick={goToLogin} className="text-[1rem] text-white hover:text-black  px-6 py-3 min-w-[100px] max-w-[150px] border border-white rounded-md hover:bg-gray-500 transition-all duration-300">
            Login
          </button>
        </div>
      </section>

      <section className="SectionTwo-Cards mt-10 pb-10 bg-gradient-to-b from-gray-800 via-gray-600 to-gray-100">
        <div className="Title mb-10">
          <h1 className="text-[#0D0D0D] text-center text-[1rem] md:text-[3rem] font-extrabold">
            Powerful features to boost your productivity
          </h1>
        </div>
        <div className="container grid md:grid-cols-3 gap-10 max-w-[1200px] mx-auto px-5">
          <Cards
            title="Task Organization"
            description="Create, organize, and prioritize your tasks with an intuitive interface designed for efficiency."
            Icon={Icon1}
          />
          <Cards
            title="Time Management"
            description="Set due dates, reminders, and track your progress to stay on top of your deadlines."
            Icon={Icon2}
          />
          <Cards
            title="Goal Tracking"
            description="Set goals, break them down into manageable tasks, and track your progress over time."
            Icon={Icon3}
          />
        </div>
      </section>
      <section className="bg-[#111827] mt-5 p-10">
        <div className="Title">
          <h1 className="text-white text-center text-[1rem] md:text-[3rem] font-extrabold">Ready to get organized?</h1>
          <p className="text-white text-center text-[1rem]  mb-4">
          Join thousands of users who have transformed their productivity with TaskMaster.
        </p>
        </div>
        <div className="flex justify-center gap-5 flex-wrap">
          <button onClick={goToSignup} className="flex items-center justify-center gap-2 text-[1rem] text-black font-bold px-6 py-3 min-w-[130px] max-w-[200px] bg-[#1e3a8a] rounded-md hover:bg-blue-500 transition-all duration-300">
            Start For Free
          </button>
        </div>
      </section>
      <section className="bg-[#111827] mt-5 p-10 outline-1 outline-gray-500">
      <div className="links flex justify-center gap-5 flex-wrap">
      <p className="text-gray-300 text-[1rem] font-bold mb-4">
      © 2023 TaskMaster. All rights reserved.
      </p>

        <a href="#"className="text-gray-300 text-[1rem]  mb-4 hover:text-white">Privacy Policy</a>
        <a href="#"className="text-gray-300 text-[1rem]  mb-4 hover:text-white">Terms of Service</a>
        <a href="#"className="text-gray-300 text-[1rem]  mb-4 hover:text-white">Contact</a>
      </div>
      </section>
    </main>
  );
}

export default Intro;
