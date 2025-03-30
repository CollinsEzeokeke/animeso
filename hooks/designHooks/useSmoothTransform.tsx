import { MotionValue, useSpring, useTransform } from "framer-motion";

export function useSmoothTransform(
  {
    value,
    springOptions,
    transformer,
  }: {
    value: MotionValue<number>;
    springOptions: { stiffness: number; damping: number };
    transformer: (value: number) => number;
  }
) {
  return useSpring(useTransform(value, transformer), springOptions);
}
