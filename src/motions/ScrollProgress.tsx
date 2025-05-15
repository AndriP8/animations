import { motion, useScroll } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "#ff0088",
          zIndex: 100,
        }}
      />
      <svg
        className="-rotate-90 self-start sticky top-0"
        width="80"
        height="80"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          className="stroke-white stroke-[10%] fill-none"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          className="stroke-blue-500 stroke-[10%] fill-none"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
    </>
  );
}
