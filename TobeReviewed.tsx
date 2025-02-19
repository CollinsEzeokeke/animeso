"use client";
import { useScroll, motion } from "framer-motion";
import Image from "next/image";
export default function Home() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="bg-blue-500 mb-[100vh]">
      <motion.div
        // id="scroll"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "#ff0088",
        }}
      />
      <div className="h-[150vh] bg-red-400 mt-[150vh]" />
      <span className="absolute right-1 bottom-1 top-auto bg-white shadow-compass rounded-[8px] p-1">
        <span className="block group-hover:-rotate-3 transition-transform duration-300 ease-[cubic-bezier(0.18,0.89,0.32,1.27)]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.7574 11.0707V24H21.9645L15.3925 14.5176H15.2726V24H13.3218V11.0707H15.1274L21.7057 20.5656H21.8256V11.0707H23.7574Z"
              fill="black"
            ></path>
            <path
              d="M17.89 0.864349C17.6684 0.554155 17.2074 0.554155 16.9859 0.864349L15.2876 3.24187C15.025 3.60957 15.2878 4.12033 15.7397 4.12033H19.1362C19.588 4.12033 19.8509 3.60957 19.5882 3.24187L17.89 0.864349Z"
              fill="#EF4444"
            ></path>
            <path
              d="M34.2917 18.2649C34.5604 18.1882 34.5604 17.8075 34.2917 17.7307L32.0459 17.0891C31.691 16.9877 31.3377 17.2541 31.3377 17.6232L31.3377 18.3724C31.3377 18.7415 31.691 19.008 32.0459 18.9066L34.2917 18.2649Z"
              fill="#AFAFAF"
            ></path>
            <path
              d="M1.70825 18.2649C1.43963 18.1882 1.43963 17.8075 1.70825 17.7307L3.95415 17.0891C4.30905 16.9877 4.66233 17.2541 4.66233 17.6232L4.66233 18.3724C4.66233 18.7415 4.30905 19.008 3.95415 18.9066L1.70825 18.2649Z"
              fill="#AFAFAF"
            ></path>
            <path
              d="M26.3775 4.02503C26.4453 3.75402 26.1157 3.56368 25.9149 3.75794L24.2362 5.3821C23.971 5.63875 24.0251 6.07794 24.3448 6.26249L24.9936 6.63708C25.3132 6.82163 25.7206 6.64892 25.8103 6.29087L26.3775 4.02503Z"
              fill="#EBEBEB"
            ></path>
            <path
              d="M4.02991 9.62735C3.7589 9.55951 3.56856 9.88919 3.76282 10.09L5.38698 11.7686C5.64363 12.0339 6.08282 11.9798 6.26737 11.6601L6.64197 11.0113C6.82652 10.6916 6.6538 10.2842 6.29575 10.1946L4.02991 9.62735Z"
              fill="#EBEBEB"
            ></path>
            <path
              d="M32.2399 10.0809C32.4341 9.8801 32.2438 9.55042 31.9728 9.61826L29.7069 10.1855C29.3489 10.2751 29.1762 10.6825 29.3607 11.0022L29.7353 11.651C29.9199 11.9707 30.3591 12.0248 30.6157 11.7595L32.2399 10.0809Z"
              fill="#EBEBEB"
            ></path>
            <path
              d="M10.0809 3.76499C9.8801 3.57073 9.55042 3.76107 9.61826 4.03208L10.1855 6.29792C10.2751 6.65598 10.6825 6.82869 11.0022 6.64414L11.651 6.26954C11.9707 6.08499 12.0248 5.6458 11.7595 5.38915L10.0809 3.76499Z"
              fill="#EBEBEB"
            ></path>
            <path
              d="M10.0809 32.235C9.8801 32.4292 9.55042 32.2389 9.61826 31.9679L10.1855 29.702C10.2751 29.344 10.6825 29.1713 11.0022 29.3558L11.651 29.7304C11.9707 29.915 12.0248 30.3542 11.7595 30.6108L10.0809 32.235Z"
              fill="#EBEBEB"
            ></path>
            <path
              d="M32.2399 25.9191C32.4341 26.1199 32.2438 26.4496 31.9728 26.3817L29.7069 25.8145C29.3489 25.7248 29.1762 25.3174 29.3607 24.9978L29.7353 24.349C29.9199 24.0293 30.3591 23.9752 30.6157 24.2404L32.2399 25.9191Z"
              fill="#EBEBEB"
            ></path>
            <path
              d="M4.02991 26.3726C3.7589 26.4405 3.56856 26.1108 3.76282 25.91L5.38698 24.2313C5.64363 23.9661 6.08282 24.0202 6.26737 24.3399L6.64197 24.9887C6.82652 25.3083 6.6538 25.7158 6.29575 25.8054L4.02991 26.3726Z"
              fill="#EBEBEB"
            ></path>
            <path
              d="M26.3775 31.9749C26.4453 32.246 26.1157 32.4363 25.9149 32.242L24.2362 30.6179C23.971 30.3612 24.0251 29.922 24.3448 29.7375L24.9936 29.3629C25.3132 29.1783 25.7206 29.3511 25.8103 29.7091L26.3775 31.9749Z"
              fill="#EBEBEB"
            ></path>
            <path
              d="M17.74 34.8337C17.8167 35.1024 18.1974 35.1024 18.2741 34.8337L18.9158 32.5878C19.0172 32.2329 18.7507 31.8797 18.3816 31.8797L17.6325 31.8797C17.2634 31.8797 16.9969 32.2329 17.0983 32.5878L17.74 34.8337Z"
              fill="#AFAFAF"
            ></path>
          </svg>
        </span>
      </span>

      {/* adjfaijsdfk;jkdsfjk;jkdfljakdsjfkjdfkjk clock */}
      <svg
        className="size-[40px] md:size-[80px]"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M40 8.88726C36.286 6.09753 31.6694 4.44444 26.6667 4.44444C14.3937 4.44444 4.44444 14.3937 4.44444 26.6667C4.44444 31.6694 6.09753 36.286 8.88726 40C6.09753 43.714 4.44444 48.3306 4.44444 53.3333C4.44444 65.6063 14.3937 75.5556 26.6667 75.5556C31.6694 75.5556 36.286 73.9025 40 71.1127C43.714 73.9025 48.3306 75.5556 53.3333 75.5556C65.6063 75.5556 75.5556 65.6063 75.5556 53.3333C75.5556 48.3306 73.9025 43.714 71.1127 40C73.9025 36.286 75.5556 31.6694 75.5556 26.6667C75.5556 14.3937 65.6063 4.44444 53.3333 4.44444C48.3306 4.44444 43.714 6.09753 40 8.88726ZM40 24C36.4654 24 33.6 26.8654 33.6 30.4V49.6C33.6 53.1346 36.4654 56 40 56C43.5346 56 46.4 53.1346 46.4 49.6V30.4C46.4 26.8654 43.5346 24 40 24Z"
          fill="url(#paint0_linear_0_6)"
        ></path>
        <path
          d="M33.6 30.4C33.6 26.8654 36.4654 24 40 24C43.5346 24 46.4 26.8654 46.4 30.4V49.6C46.4 53.1346 43.5346 56 40 56C36.4654 56 33.6 53.1346 33.6 49.6V30.4Z"
          fill="url(#paint1_linear_0_6)"
        ></path>
        <path
          d="M40 6.3528C36.1718 3.83552 31.5879 2.37037 26.6667 2.37037C13.2482 2.37037 2.37037 13.2482 2.37037 26.6667C2.37037 31.5879 3.83552 36.1718 6.3528 40C3.83552 43.8282 2.37037 48.4121 2.37037 53.3333C2.37037 66.7518 13.2482 77.6296 26.6667 77.6296C31.5879 77.6296 36.1718 76.1645 40 73.6472C43.8282 76.1645 48.4121 77.6296 53.3333 77.6296C66.7518 77.6296 77.6296 66.7518 77.6296 53.3333C77.6296 48.4121 76.1645 43.8282 73.6472 40C76.1645 36.1718 77.6296 31.5879 77.6296 26.6667C77.6296 13.2482 66.7518 2.37037 53.3333 2.37037C48.4121 2.37037 43.8282 3.83552 40 6.3528Z"
          stroke="white"
          strokeOpacity="0.35"
          strokeWidth="4.14815"
        ></path>
        <path
          d="M57.0166 55.7126C57.559 55.1702 58.4384 55.1702 58.9808 55.7126L60.2902 57.022C60.8326 57.5644 60.8326 58.4438 60.2902 58.9862L58.9808 60.2957C58.4384 60.8381 57.559 60.8381 57.0166 60.2957L55.7071 58.9862C55.1648 58.4438 55.1648 57.5644 55.7071 57.022L57.0166 55.7126Z"
          fill="#DCDCDC"
        ></path>
        <path
          d="M55.7126 22.9825C55.1702 22.4401 55.1702 21.5607 55.7126 21.0183L57.022 19.7089C57.5644 19.1665 58.4438 19.1665 58.9862 19.7089L60.2957 21.0183C60.8381 21.5607 60.8381 22.4401 60.2957 22.9825L58.9862 24.292C58.4438 24.8344 57.5644 24.8344 57.022 24.292L55.7126 22.9825Z"
          fill="#DCDCDC"
        ></path>
        <path
          d="M21.0183 19.6883C21.5607 19.1459 22.4401 19.1459 22.9825 19.6883L24.292 20.9977C24.8344 21.5401 24.8344 22.4195 24.292 22.9619L22.9825 24.2714C22.4401 24.8137 21.5607 24.8138 21.0183 24.2714L19.7089 22.9619C19.1665 22.4195 19.1665 21.5401 19.7089 20.9977L21.0183 19.6883Z"
          fill="#DCDCDC"
        ></path>
        <path
          d="M19.6883 58.9808C19.1459 58.4384 19.1459 57.559 19.6883 57.0166L20.9977 55.7071C21.5401 55.1648 22.4195 55.1648 22.9619 55.7071L24.2714 57.0166C24.8137 57.559 24.8138 58.4384 24.2714 58.9808L22.9619 60.2902C22.4195 60.8326 21.5401 60.8326 20.9977 60.2902L19.6883 58.9808Z"
          fill="#DCDCDC"
        ></path>
        <path
          d="M60.8329 39.0751C60.8329 38.308 61.4547 37.6862 62.2218 37.6862H66.3885C67.1555 37.6862 67.7773 38.308 67.7773 39.0751V40.9269C67.7773 41.694 67.1555 42.3158 66.3885 42.3158H62.2218C61.4547 42.3158 60.8329 41.694 60.8329 40.9269V39.0751Z"
          fill="#F43F5E"
        ></path>
        <path
          d="M40.924 60.8329C41.6911 60.8329 42.3129 61.4547 42.3129 62.2218V66.3885C42.3129 67.1555 41.6911 67.7773 40.924 67.7773H39.0722C38.3051 67.7773 37.6833 67.1555 37.6833 66.3885V62.2218C37.6833 61.4547 38.3051 60.8329 39.0722 60.8329H40.924Z"
          fill="#F43F5E"
        ></path>
        <path
          d="M12.2218 39.0751C12.2218 38.308 12.8436 37.6862 13.6107 37.6862H17.7773C18.5444 37.6862 19.1662 38.308 19.1662 39.0751V40.9269C19.1662 41.694 18.5444 42.3158 17.7773 42.3158H13.6107C12.8436 42.3158 12.2218 41.694 12.2218 40.9269V39.0751Z"
          fill="#F43F5E"
        ></path>
        <path
          d="M40.924 12.2218C41.6911 12.2218 42.3129 12.8436 42.3129 13.6107V17.7773C42.3129 18.5444 41.6911 19.1662 40.924 19.1662H39.0722C38.3051 19.1662 37.6833 18.5444 37.6833 17.7773V13.6107C37.6833 12.8436 38.3051 12.2218 39.0722 12.2218L40.924 12.2218Z"
          fill="#F43F5E"
        ></path>
        <path
          d="M42.3144 26.1107C42.3144 24.8322 41.278 23.7959 39.9996 23.7959C38.7211 23.7959 37.6848 24.8322 37.6848 26.1107H42.3144ZM42.3144 39.9996V26.1107H37.6848V39.9996H42.3144Z"
          fill="#171717"
          transform="rotate(138, 40, 40)"
        ></path>
        <path
          d="M49.2588 42.0829C50.4094 42.0829 51.3422 41.1502 51.3422 39.9996C51.3422 38.849 50.4094 37.9162 49.2588 37.9162L49.2588 42.0829ZM39.9996 42.0829L49.2588 42.0829L49.2588 37.9162L39.9996 37.9162L39.9996 42.0829Z"
          fill="#F43F5E"
          transform="rotate(-30, 40, 40)"
        ></path>
        <circle fill="#171717" cx="40" cy="40" r="3.5"></circle>
        <defs>
          <linearGradient
            id="paint0_linear_0_6"
            x1="40"
            y1="4.44444"
            x2="40"
            y2="75.5556"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FEFEFE"></stop>
            <stop offset="1" stopColor="#FDF5EE"></stop>
          </linearGradient>
          <linearGradient
            id="paint1_linear_0_6"
            x1="40"
            y1="4.44444"
            x2="40"
            y2="75.5556"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FEFEFE"></stop>
            <stop offset="1" stopColor="#FDF5EE"></stop>
          </linearGradient>
        </defs>
      </svg>
      {/* this is the part for the bottom events side screen */}
      {/* <div className="gap-2 md:gap-5 items-center justify-center text-center whitespace-normal lg:whitespace-nowrap text-balance"><span className="opacity-50 inline-block align-middle">You got</span> <span className="inline-block align-middle w-[56px] h-[56px] md:w-[56px] md:h-[72px]"><div className="flex scale-[0.7] md:scale-[1] w-[56px] h-[72px] -mb-[16px] md:mt-0 md:mb-0 active:scale-100 transition-transform duration-300 ease-[cubic-bezier(0.18,0.89,0.32,1.27)] hover:scale-110 hover:-rotate-6 cursor-pointer"><div className="relative size-full outline-none appearance-none border-none" style="transform-style: preserve-3d; will-change: transform; transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);"><div class="absolute inset-0"><div class="bg-white rounded-sm rotate-[14deg] h-full w-full opacity-35 translate-x-[10%] -translate-y-[5%]"></div></div><div class="h-full bg-white rounded-sm p-[6px] box-border shadow-[1px_0px_2px_rgba(0,0,0,0.2),0_9px_18px_rgba(0,0,0,0.3)]" style="transform:translateZ(20px)"><div class="flex gap-[2px] items-center"><img src="/2024/images/avatar.png" alt="avatar" class="rounded-full size-3"><div class="flex-grow flex gap-[2px] flex-col"><div class="rounded-full bg-black opacity-25 h-[5px]"></div><div class="rounded-full bg-black opacity-10 h-[3px]"></div></div></div><div class="mt-[6px] flex flex-col gap-[3px]"><div class="rounded-[2px] bg-black opacity-15 h-[20px]"></div><div class="rounded-full bg-black opacity-10 h-[3px]"></div><div class="rounded-full bg-black opacity-10 h-[3px]"></div><div class="bg-white absolute inset-x-[6px] bottom-[4px] h-[8px] shadow-[0_0.5px_2px_rgba(0,0,0,0.1),0_1px_4px_rgba(0,0,0,0.15)] rounded-[2px]"></div></div></div><div class="js-tilt-glare" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; overflow: hidden; pointer-events: none; border-radius: inherit;"><div class="js-tilt-glare-inner" style="position: absolute; top: 50%; left: 50%; pointer-events: none; background-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%); transform: rotate(180deg) translate(-50%, -50%); transform-origin: 0% 0%; opacity: 0; width: 144px; height: 144px;"></div></div></div></div></span> <span class="inline-block align-middle">2<!-- --> emails</span> <span class="opacity-50 inline-block align-middle">and have</span> <br class="hidden lg:block"><span class="inline-block align-middle w-[96px] h-[56px] md:w-[136px] md:h-[74px]"><div class="flex scale-[0.7] md:scale-[1] w-[136px] h-[64px] -mb-[16px] md:mt-0 md:mb-0 md:active:scale-100 transition-transform duration-300 ease-[cubic-bezier(0.18,0.89,0.32,1.27)] md:hover:scale-110 hover:-rotate-6 cursor-pointer group"><div class="relative text-start outline-none appearance-none border-none size-full" style="transform-style: preserve-3d; will-change: transform; transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1);"><div class="absolute inset-0"><span class="flex size-full bg-white/80 opacity-50 rounded-sm scale-[0.9] group-hover:translate-y-[15%] translate-y-[10%] -rotate-6 transition-transform duration-300 ease-[cubic-bezier(0.18,0.89,0.32,1.27)]"></span></div><div class="size-full bg-white rounded-sm p-[6px] overflow-hidden box-border shadow-[1px_0px_2px_rgba(0,0,0,0.2),0_9px_18px_rgba(0,0,0,0.3)]" style="transform:translateZ(20px)"><div class="flex gap-[5px] h-full"><div class="h-full w-[4px] bg-purple-500 rounded-full"></div><div class="flex-grow flex gap-[4px] flex-col justify-between"><div class="flex flex-col gap-[2px]"><div class="text-purple-800 text-[13px] leading-[15px] weight-semibold">Feedback</div><div class="text-purple-500 text-[11px] leading-[13px] weight-medium">10:00</div></div><div class="flex items-center justify-between gap-[4px]"><div class="flex"><img class="rounded-full size-[22px] border-white border-2 0" alt="calendar preview" src="/2024/images/avatar.png"></div><svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_647_5910)"><path d="M6.10742 14.6445C5.45117 14.6445 4.94336 14.4785 4.58398 14.1465C4.22852 13.8145 4.05078 13.3301 4.05078 12.6934L4.05078 6.9043C4.05078 6.26758 4.23438 5.77344 4.60156 5.42188C4.96875 5.07031 5.4707 4.89453 6.10742 4.89453L12.2363 4.89453C12.8926 4.89453 13.3926 5.07031 13.7363 5.42188C14.0801 5.77344 14.252 6.26563 14.252 6.89844V12.6348C14.252 13.2715 14.0723 13.7656 13.7129 14.1172C13.3574 14.4688 12.8516 14.6445 12.1953 14.6445H6.10742ZM15.1484 11.7441V7.83594L17.0762 6.17773C17.209 6.06445 17.3418 5.97461 17.4746 5.9082C17.6113 5.83789 17.7461 5.80273 17.8789 5.80273C18.125 5.80273 18.3242 5.88281 18.4766 6.04297C18.6328 6.20313 18.7109 6.41602 18.7109 6.68164V12.9043C18.7109 13.1699 18.6328 13.3828 18.4766 13.543C18.3242 13.7031 18.125 13.7832 17.8789 13.7832C17.7461 13.7832 17.6113 13.748 17.4746 13.6777C17.3418 13.6074 17.209 13.5156 17.0762 13.4023L15.1484 11.7441Z" fill="#171717" fill-opacity="0.35"></path></g><defs><filter id="filter0_d_647_5910" x="-3" y="-2.5" width="28" height="28" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix><feOffset dy="1.5"></feOffset><feGaussianBlur stdDeviation="2"></feGaussianBlur><feComposite in2="hardAlpha" operator="out"></feComposite><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"></feColorMatrix><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_647_5910"></feBlend><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_647_5910" result="shape"></feBlend></filter></defs></svg></div></div></div></div><div class="js-tilt-glare" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; overflow: hidden; pointer-events: none; border-radius: inherit;"><div class="js-tilt-glare-inner" style="position: absolute; top: 50%; left: 50%; pointer-events: none; background-image: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%); transform: rotate(180deg) translate(-50%, -50%); transform-origin: 0% 0%; opacity: 0; width: 272px; height: 272px;"></div></div></div></div></span> <span class="inline-block align-middle">2<!-- --> meetings</span> <span class="opacity-50 inline-block align-middle">today.</span></div> */}
      <div className="gap-2 md:gap-5 items-center justify-center text-center whitespace-normal lg:whitespace-nowrap text-balance">
        <span className="opacity-50 inline-block align-middle">You got</span>

        <span className="inline-block align-middle w-[56px] h-[56px] md:w-[56px] md:h-[72px]">
          <div className="flex scale-[0.7] md:scale-[1] w-[56px] h-[72px] -mb-[16px] md:mt-0 md:mb-0 active:scale-100 transition-transform duration-300 ease-[cubic-bezier(0.18,0.89,0.32,1.27)] hover:scale-110 hover:-rotate-6 cursor-pointer">
            <div
              className="relative size-full outline-none appearance-none border-none"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
                transform:
                  "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
              }}
            >
              <div className="absolute inset-0">
                <div className="bg-white rounded-sm rotate-[14deg] h-full w-full opacity-35 translate-x-[10%] -translate-y-[5%]" />
              </div>
              <div
                className="h-full bg-white rounded-sm p-[6px] box-border shadow-[1px_0px_2px_rgba(0,0,0,0.2),0_9px_18px_rgba(0,0,0,0.3)]"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="flex gap-[2px] items-center">
                  {/* Replace with Next.js Image component if needed */}
                  <Image
                    src="/next.svg"
                    fill
                    alt="avatar"
                    className="rounded-full size-3"
                  />
                  <div className="flex-grow flex gap-[2px] flex-col">
                    <div className="rounded-full bg-black opacity-25 h-[5px]" />
                    <div className="rounded-full bg-black opacity-10 h-[3px]" />
                  </div>
                </div>
                <div className="mt-[6px] flex flex-col gap-[3px]">
                  <div className="rounded-[2px] bg-black opacity-15 h-[20px]" />
                  <div className="rounded-full bg-black opacity-10 h-[3px]" />
                  <div className="rounded-full bg-black opacity-10 h-[3px]" />
                  <div className="bg-white absolute inset-x-[6px] bottom-[4px] h-[8px] shadow-[0_0.5px_2px_rgba(0,0,0,0.1),0_1px_4px_rgba(0,0,0,0.15)] rounded-[2px]" />
                </div>
              </div>
            </div>
          </div>
        </span>

        <span className="inline-block align-middle">{2} emails</span>
        <span className="opacity-50 inline-block align-middle">and have</span>
        <br className="hidden lg:block" />

        <span className="inline-block align-middle w-[96px] h-[56px] md:w-[136px] md:h-[74px]">
          <div className="flex scale-[0.7] md:scale-[1] w-[136px] h-[64px] -mb-[16px] md:mt-0 md:mb-0 md:active:scale-100 transition-transform duration-300 ease-[cubic-bezier(0.18,0.89,0.32,1.27)] md:hover:scale-110 hover:-rotate-6 cursor-pointer group">
            <div
              className="relative text-start outline-none appearance-none border-none size-full"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
                transform:
                  "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
              }}
            >
              <div className="absolute inset-0">
                <span className="flex size-full bg-white/80 opacity-50 rounded-sm scale-[0.9] group-hover:translate-y-[15%] translate-y-[10%] -rotate-6 transition-transform duration-300 ease-[cubic-bezier(0.18,0.89,0.32,1.27)]" />
              </div>
              <div
                className="size-full bg-white rounded-sm p-[6px] overflow-hidden box-border shadow-[1px_0px_2px_rgba(0,0,0,0.2),0_9px_18px_rgba(0,0,0,0.3)]"
                style={{ transform: "translateZ(20px)" }}
              >
                <div className="flex gap-[5px] h-full">
                  <div className="h-full w-[4px] bg-purple-500 rounded-full" />
                  <div className="flex-grow flex gap-[4px] flex-col justify-between">
                    <div className="flex flex-col gap-[2px]">
                      <div className="text-purple-800 text-[13px] leading-[15px] weight-semibold">
                        Feedback
                      </div>
                      <div className="text-purple-500 text-[11px] leading-[13px] weight-medium">
                        10:00
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-[4px]">
                      <div className="flex">
                        <Image
                          className="rounded-full size-[22px] border-white border-2"
                          alt="calendar preview"
                          src="/next.svg"
                          fill
                        />
                      </div>
                      <svg
                        width="23"
                        height="21"
                        viewBox="0 0 23 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG paths remain the same */}
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>

        <span className="inline-block align-middle">{2} meetings</span>
        <span className="opacity-50 inline-block align-middle">today.</span>
      </div>

      {/* item card */}

      <div className="mt-[52px] -mb-9 w-[80%] self-center rounded-[20px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1)] p-1 gap-1 flex items-center">
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.61577 18.3477C3.04281 27.9501 8.74134 37.8202 18.3438 40.3931C27.9462 42.9661 37.8161 37.2676 40.3891 27.6652C42.962 18.0629 37.2636 8.19276 27.6612 5.61981C25.628 5.07501 23.5828 4.90106 21.5974 5.05648"
            stroke="#EBEBEB"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M23.0039 5C13.0627 5 5.00391 13.0589 5.00391 23.0001C5.00391 32.9412 13.0627 41 23.0039 41C32.9449 41 41.0039 32.9412 41.0039 23.0001C41.0039 20.8951 40.6426 18.8746 39.9786 16.9971"
            stroke="#FB923C"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Repeated rect elements with corrected attributes */}
          {[...Array(12)].map((_, i) => (
            <rect
              key={i}
              x="0.170754"
              y="-0.0457534"
              width="1.74999"
              height="3.24999"
              rx="0.874994"
              transform="matrix(-0.500004 0.866023 -0.866028 -0.499996 33.9821 28.1351)"
              fill="#D9D9D9"
              stroke="#D9D9D9"
              strokeWidth="0.25"
            />
          ))}
        </svg>

        <div className="flex-grow pl-1">
          <div className="text-[24px] leading-[24px] font-semibold">28:49s</div>
        </div>

        <div className="w-[1px] bg-gray-100 h-[32px]" />

        <svg
          width="48"
          height="48"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="16.332"
            y="14"
            width="9.33333"
            height="28"
            rx="2.33333"
            fill="#A3A3A3"
          />
          <rect
            x="30.332"
            y="14"
            width="9.33333"
            height="28"
            rx="2.33333"
            fill="#A3A3A3"
          />
        </svg>
      </div>

      {/* bottom of one card */}

      <div className="absolute bottom-7 left-[50%] -translate-x-[50%]">
        <svg
          width="508"
          height="80"
          viewBox="0 0 508 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_13_1474"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="508"
            height="80"
          >
            <rect
              width="508"
              height="80"
              fill="url(#paint0_linear_13_1474)"
            ></rect>
          </mask>
          <g mask="url(#mask0_13_1474)">
            <rect x="252" width="6" height="80" rx="3" fill="#FB923C"></rect>
            <rect
              x="222"
              y="48"
              width="6"
              height="32"
              rx="3"
              fill="#919191"
            ></rect>
            <rect
              x="192"
              y="48"
              width="6"
              height="32"
              rx="3"
              fill="#919191"
            ></rect>
            <rect
              x="162"
              y="48"
              width="6"
              height="32"
              rx="3"
              fill="#919191"
            ></rect>
            <rect
              x="132"
              y="24"
              width="6"
              height="56"
              rx="3"
              fill="#737373"
            ></rect>
            <rect
              x="102"
              y="48"
              width="6"
              height="32"
              rx="3"
              fill="#919191"
            ></rect>
            <rect
              x="72"
              y="48"
              width="6"
              height="32"
              rx="3"
              fill="#919191"
            ></rect>
            <rect
              x="42"
              y="48"
              width="6"
              height="32"
              rx="3"
              fill="#919191"
            ></rect>
            <rect
              x="12"
              y="24"
              width="6"
              height="56"
              rx="3"
              fill="#737373"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="32"
              rx="3"
              transform="matrix(-1 0 0 1 288 48)"
              fill="#CDCDCD"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="32"
              rx="3"
              transform="matrix(-1 0 0 1 318 48)"
              fill="#CDCDCD"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="32"
              rx="3"
              transform="matrix(-1 0 0 1 348 48)"
              fill="#CDCDCD"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="56"
              rx="3"
              transform="matrix(-1 0 0 1 378 24)"
              fill="#AFAFAF"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="32"
              rx="3"
              transform="matrix(-1 0 0 1 408 48)"
              fill="#CDCDCD"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="32"
              rx="3"
              transform="matrix(-1 0 0 1 438 48)"
              fill="#CDCDCD"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="32"
              rx="3"
              transform="matrix(-1 0 0 1 468 48)"
              fill="#CDCDCD"
            ></rect>
            <rect
              opacity="0.3"
              width="6"
              height="56"
              rx="3"
              transform="matrix(-1 0 0 1 498 24)"
              fill="#AFAFAF"
            ></rect>
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_13_1474"
              x1="508"
              y1="34"
              x2="-3.76617e-05"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D9D9D9" stopOpacity="0.5"></stop>
              <stop offset="0.497641" stopColor="#D9D9D9"></stop>
              <stop offset="1" stopColor="#D9D9D9" stopOpacity="0.1"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
