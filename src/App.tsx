import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ScrollTriggered from "./motions/ScrollAnimations";
import ScrollProgress from "./motions/ScrollProgress";
import SharedLayout from "./motions/SharedLayout";

function App() {
  const [copied, setCopied] = useState(false);

  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="center-container">
      <ScrollProgress />
      <SharedLayout />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: 1,
          scale: 1,
          x: 100,
          transition: { type: "spring", duration: 0.5, bounce: 0.2 },
        }}
        className="size-12 rounded-xl bg-yellow-300"
      />
      <button
        aria-label="Copy code snippet"
        className="border rounded-lg border-gray-400 p-2"
        onClick={() => setCopied(!copied)}
      >
        <AnimatePresence mode="sync" initial={false}>
          {copied ? (
            <motion.span
              key="copy"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-copy-icon lucide-copy"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="checkmark"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check-icon lucide-check"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </button>
      <motion.ul
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 0.5 },
        }}
        exit={{
          scale: 0,
          transition: { duration: 10 },
        }}
        whileHover={{ scale: 1.5 }}
        whileTap={{ scale: 0.9 }}
        className="size-[100px] bg-pink-400 rounded-md"
      />
      <ScrollTriggered />
    </div>
  );
}

export default App;
