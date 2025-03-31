
// hooks/useSmoothTransform.ts
import { MotionValue, useSpring, useTransform } from "framer-motion";

export function useSmoothTransform(
  value: MotionValue<number>,  // Remove generic type parameter
  springOptions: { stiffness: number; damping: number },
  transformer: (value: number) => number
): MotionValue<number> {  // Explicit return type
  return useSpring(useTransform(value, transformer), springOptions);
}


// import { MotionValue, useSpring, useTransform } from "framer-motion";

// export function useSmoothTransform<T = number>(
//   value: MotionValue<T>,
//   springOptions: {
//     stiffness: number;
//     damping: number;
//   },
//   transformer: (value: T) => number
// ) {
//   return useSpring(useTransform(value, transformer), springOptions);
// }


// import { useSpring, useTransform } from "framer-motion";

// export function useSmoothTransform(value, springOptions, transformer) {
//   return useSpring(useTransform(value, transformer), springOptions);
// }




// import { MotionValue, useSpring, useTransform } from "framer-motion";

// export function useSmoothTransform(mouseX: MotionValue<number>, spring: { stiffness: number; damping: number; }, p0: (x: number) => number, {
//   value, springOptions, transformer,
// }: {
//   value: MotionValue<number>;
//   springOptions: { stiffness: number; damping: number; };
//   transformer: (value: number) => number;
// }) {
//   return useSpring(useTransform(value, transformer), springOptions);
// }
