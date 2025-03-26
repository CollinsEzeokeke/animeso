"use client";
import { useState, useEffect } from "react";
import IconBox from "./IconBox";
import { format } from "date-fns";
import Image from "next/image";
import { useWindowSize } from "@uidotdev/usehooks";

export default function DailyStatus() {
  const [currentDay, setCurrentDay] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const {width, height} = useWindowSize()

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDay(format(now, "EEEE"));
      setCurrentTime(format(now, "h:mm a"));
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);
if (!width || !height) return "";
  return (
    <div className="w-full">
      <h1 className={`${width <= 1343 ? "text-5xl" : "text-6xl"} font-semibold tracking-wide mb-3 text-slate-50/85`}>
        Happy {currentDay}!
      </h1>
      <p className={`${width <= 1343 ? "text-5xl" : "text-6xl"} font-bold text-slate-100 flex items-center justify-center w-full`}>
        <span className={`text-slate-50/90 ${width <= 1343 ? "text-5xl" : "text-6xl"} `}> It&apos;s </span>
        <IconBox className="mx-0 h-28 w-28 flex justify-center items-center">
          {/* <Image
            src="/feature-pomodoro.webp"
            width={100}
            height={300}
            className="w-full h-full"
            alt="clock"
          /> */}
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
        </IconBox>
        <span className="">{currentTime}</span>
        <span className={`text-slate-50/90 pl-2 ${width <= 1343 ? "text-5xl" : "text-6xl"} ml-2`}> and</span>{" "}
        <IconBox className="mx-3">
          <Image
            src="/cloud-high.png"
            alt="cloud-image"
            width={70}
            height={70}
          />
        </IconBox>{" "}
        mostly clear
      </p>
    </div>
  );
}
