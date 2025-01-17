import { MdCode } from "react-icons/md";import { FiDatabase } from "react-icons/fi";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { RiRobot2Line } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";
export default function HeroSection() {
  return (
    <section className="flex gap-10 py-5 w-full">
      <div className="py-32 flex flex-col gap-10 w-1/2">
        <h1 className="font-bold text-7xl">
          Fullstack Developer with AI Expertise
        </h1>
        <p className="text-gray-500 text-2xl ">
          Crafting robust web applications and integrating cutting-edge AI
          solutions. Specializing in React, Node.js, and TensorFlow.js
          implementations.
        </p>
        <div className="flex gap-3 flex-wrap">
          <span className="flex items-center gap-1 text-sm bg-gray-200 w-fit p-1 px-3 rounded-2xl font-medium ">
            <MdCode size={18} />
            Frontend Development
          </span>
          <span className="flex items-center gap-1 text-sm bg-gray-200 w-fit p-1 px-3 rounded-2xl font-medium">
            <FiDatabase size={18} /> Backend Architecture
          </span>
          <span className="flex items-center gap-1 text-sm bg-gray-200 w-fit p-1 px-3 rounded-2xl font-medium">
            <HiDevicePhoneMobile size={18} />
            Mobile App Development
          </span>
          <span className="flex items-center gap-1 text-sm bg-gray-200 w-fit p-1 px-3 rounded-2xl font-medium">
            <RiRobot2Line size={18} />
            AI Integration
          </span>
        </div>
        <div className="flex gap-5 flex-wrap">
          <button className="bg-black text-white font-semibold p-2 px-6 flex items-center gap-2 rounded-lg">
            View Projects <BsArrowRight size={18} />
          </button>
          <button className="border border-black rounded-lg p-2 px-6 font-semibold">
            Get in Touch
          </button>
        </div>
      </div>
      <div className="py-36 ">
        <div className="shadow-lg p-5 px-10 rounded-xl gap-10 flex flex-col ">
          <h2 className="text-2xl font-bold">Why Work With Me?</h2>
          <div className="flex gap-5">
            <MdCode size={24} className="bg-gray-200 p-1 mt-2 rounded-lg" />
            <div>
              <h3 className="text-xl font-semibold">Full Stack Expertise</h3>
              <p className="text-gray-500 ">
                Develop end-to-end solutions with modern web technologies and
                best practices
              </p>
            </div>
          </div>
          <div className="flex gap-5 ">
            <FiDatabase size={24} className="bg-gray-200 p-1 mt-2 rounded-lg" />
            <div>
              <h3 className="text-xl font-semibold">Scalable Architecture</h3>
              <p className="text-gray-500 ">
                Design and implement robust, scalable backend systems to support
                your applications
              </p>
            </div>
          </div>
          <div className="flex gap-5">
            <HiDevicePhoneMobile size={24} className="bg-gray-200 p-1 mt-2 rounded-lg" />
            <div>
              <h3 className="text-xl font-semibold">Mobile Apps</h3>
              <p className="text-gray-500 ">
                Develop end-to-end solutions with modern Mobile technologies and
                best practices
              </p>
            </div>
          </div>
          <div className="flex gap-5">
            <RiRobot2Line size={24} className="bg-gray-200 p-1 mt-2 rounded-lg" />
            <div>
              <h3 className="text-xl font-semibold">AI-Powered Solutions</h3>
              <p className="text-gray-500 ">
              Integrate cutting-edge AI capabilities to enhance your web applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
