"use client";
// import { useScroll } from "framer-motion";
import { Flame } from "lucide-react";

export default function Hero() {
  //   const { scrollYProgress } = useScroll();
  return (
    <>
      <div className="h-full w-full bg-[#BCBCBC] overflow-x-hidden relative z-[10] flex justify-center">
        {/* Navigation Bar */}
        <nav className="bg-[#BCBCBC] w-full min-h-[9vh] flex justify-center items-center fixed top-0 overflow-hidden z-[20]">
          <a
            href="https://amie.so/changelog"
            target="_blank"
            className="rounded-3xl h-11 w-[12%] bg-[#999999] hover:bg-[#858585] flex items-center justify-center text-sm font-bold text-white font-sans top-7 fixed"
          >
            <Flame className="text-white -mt-1 size-4 font-black stroke-[4px] rotate-[15deg]" />
            <button className="p-1 font-sans">Last Update: Feb 12</button>
          </a>
          <div>
            <div className="fixed right-0 top-7 pr-6 md:pr-10 flex font-medium gap-6">
              <div className="text-base text-black">
                <a
                  href="https://calendar.amie.so/login"
                  className="hover:opacity transition-opacity"
                >
                  <span className="bg-gradient-to-br animate-backgroundAnimate from-black/60 to-black/30 inline-block text-transparent bg-clip-text">
                    Sign in
                  </span>
                </a>
              </div>
              <div className="text-base">
                <a
                  href="https://calendar.amie.so/login"
                  className="hover:opacity-80 transition-opacity bg-black text-white px-4 py-2 rounded-md"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </nav>
        <div className="flex justify-center fixed top-0 w-full h-screen z-10 bg-[#BFBFBF]">
          <div className="bg-[#333333]/40 fixed h-[100vh] w-[60vw] flex items-center justify-center shadow-xl ">
            <div className="flex flex-col h-[30%] bg-transparent w-4/5 items-center">
              <h1 className="text-gray-100/80 font-sans text-6xl font-[650] mb-2">
                Todos, email, calendar.
              </h1>

              <p className="font-sans font-semibold text-gray-400/70 text-6xl">
                All-in-done.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div
          className="bg-cover h-[20vh] bg-center fixed top-[9vh] z-50 w-[15vw] bg-no-repeat"
          style={{ backgroundImage: "url('/logo-shaded.png')" }}
        />
        <div className="bg-[#B6B6B6]/35 fixed top-[9vh] left-0 w-full h-screen z-[50] flex flex-col items-center justify-center" />
        <div></div>
      </div>
    </>
  );
}

// <>
//   <div className="h-[150vh] w-full bg-transparent overflow-x-hidden">
//     <nav className="bg-[#BFBFBF] w-full h-[10vh] flex justify-center items-center fixed top-0 overflow-hidden">
//       <div className="rounded-3xl h-10 w-[12%] bg-[#999999] hover:bg-[#858585] flex items-center justify-center p-2 text-sm font-bold text-white font-sans">
//         <Flame className="text-white -mt-1 size-4 font-black stroke-[4px]" />
//         <h2 className="p-1 font-sans">Last Update: Feb 12</h2>
//       </div>
//       <div>
//         <div className="fixed right-0 top-7 pr-6 md:pr-10 flex font-medium gap-6">
//           <div className="text-base text-black">
//             <a
//               href="https://calendar.amie.so/login"
//               className="hover:opacity transition-opacity"
//             >
//               <span className="bg-gradient-to-br animate-backgroundAnimate from-black/60 to-black/30 inline-block text-transparent bg-clip-text">
//                 Sign in
//               </span>
//             </a>
//           </div>
//           <div className="text-base">
//             <a
//               href="https://calendar.amie.so/login"
//               className="hover:opacity-80 transition-opacity bg-black text-white px-4 py-2 rounded-md"
//             >
//               Get started
//             </a>
//           </div>
//         </div>
//       </div>
//       {/* <div
//         className="bg-cover h-[20vh] bg-center  w-[15vw] bg-no-repeat"
//         style={{ backgroundImage: "url('/logo-shaded.png')" }}
//       /> */}
//     </nav>
//   </div>

//   <div className="bg-blue-500 absolute top-0 h-screen z-[50]" />
// </>
