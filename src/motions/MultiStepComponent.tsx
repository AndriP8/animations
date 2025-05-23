import { useMemo, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import useMeasure from "react-use-measure";

export default function MultiStepComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [ref, bounds] = useMeasure();

  const variants = {
    initial: (direction: number) => {
      return { x: `${110 * direction}%`, opacity: 0 };
    },
    active: { x: "0%", opacity: 1 },
    exit: (direction: number) => {
      return { x: `${-110 * direction}%`, opacity: 0 };
    },
  };
  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 className="font-semibold mb-2">This is step one</h2>
            <p>
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="font-semibold mb-flex space-y-2 flex-col gap-2 mt-5">
              <div
                className="rounded bg-gray-200 h-4 w-full animate-pulse"
                style={{ width: 256 }}
              />
              <div
                className="rounded bg-gray-200 h-4 w-full animate-pulse"
                style={{ width: 192 }}
              />
              <div className="rounded bg-gray-200 h-4 w-full animate-pulse" />
              <div
                className="rounded bg-gray-200 h-4 w-full animate-pulse"
                style={{ width: 384 }}
              />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="font-semibold mb-2">This is step two</h2>
            <p>
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="font-semibold mb-flex space-y-2 flex-col gap-2 mt-5">
              <div
                className="rounded bg-gray-200 h-4 w-full animate-pulse"
                style={{ width: 256 }}
              />
              <div
                className="rounded bg-gray-200 h-4 w-full animate-pulse"
                style={{ width: 192 }}
              />
              <div
                className="rounded bg-gray-200 h-4 w-full animate-pulse"
                style={{ width: 384 }}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="font-semibold mb-2">This is step three</h2>
            <p>
              Usually in this step we would explain why this thing exists and
              what it does. Also, we would show a button to go to the next step.
            </p>
            <div className="font-semibold mb-flex space-y-2 flex-col gap-2 mt-5">
              <div
                className="rounded bg-gray-200 h-4 w-full animate-pulse"
                style={{ width: 256 }}
              />
              <div
                className="rounded bg-gray-200 h-4 w-full animate-pulse"
                style={{ width: 192 }}
              />
              <div
                className="rounded bg-gray-200 h-4 w-full animate-pulse"
                style={{ width: 128 }}
              />
              <div
                className="rounded bg-gray-200 h-4 w-full animate-pulse"
                style={{ width: 224 }}
              />
              <div
                className="rounded bg-gray-200 h-4 w-full animate-pulse"
                style={{ width: 384 }}
              />
            </div>
          </>
        );
    }
  }, [currentStep]);

  return (
    <MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0 }}>
      <motion.div
        animate={{ height: bounds.height }}
        className="relative mx-auto overflow-hidden rounded-xl shadow-md"
      >
        <div className="p-6" ref={ref}>
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={currentStep}
              initial="initial"
              animate="active"
              exit="exit"
              variants={variants}
              custom={direction}
            >
              {content}
            </motion.div>
          </AnimatePresence>
          <motion.div layout className="flex justify-between mt-8">
            <button
              className="disabled:cursor-not-allowed disabled:opacity-50 h-8 w-[80px] rounded-full text-sm font-semibold text-gray-600 shadow-sm cursor-pointer"
              disabled={currentStep === 0}
              onClick={() => {
                if (currentStep === 0) {
                  return;
                }
                setDirection(1);
                setCurrentStep((prev) => prev - 1);
              }}
            >
              Back
            </button>
            <button
              className="disabled:cursor-not-allowed disabled:opacity-50 rounded-full text-sm font-semibold text-white h-8 w-[120px] overflow-hidden bg-gradient-to-r from-[#1994ff] to-[#157cff] shadow-md relative;"
              disabled={currentStep === 2}
              onClick={() => {
                if (currentStep === 2) {
                  setCurrentStep(0);
                  return;
                }
                setDirection(-1);
                setCurrentStep((prev) => prev + 1);
              }}
            >
              Continue
            </button>
          </motion.div>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
