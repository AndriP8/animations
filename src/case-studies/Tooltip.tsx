import { AnimatePresence, motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const TooltipContent = ({ rect }: { rect: DOMRect }) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const { height, width } = ref.current?.getBoundingClientRect() || {};
    if (height) {
      setHeight(height);
    }
    if (width) {
      setWidth(width);
    }
  });
  let x = 0;
  let y = 0;
  const margin = 8;
  if (rect !== null && height && width) {
    x = rect.x + (rect.width - width) / 2;
    if (rect.y < height + margin) {
      y = rect.y + rect.height + margin;
    } else {
      y = rect.y - height - margin;
    }
  }

  console.log(y);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="border border-blue-500 w-[50px]"
        ref={ref}
        style={{
          position: "absolute",
          pointerEvents: "none",
          left: 0,
          top: 0,
          transform: `translate3d(${x}px, ${y}px, 0)`,
        }}
        key="tooltip"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis,
        ipsam!
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
};

export default function Tooltip() {
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  return (
    <div className="">
      <div
        className="relative border border-blue-500"
        ref={tooltipRef}
        onMouseEnter={() => {
          const rect = tooltipRef.current?.getBoundingClientRect();
          if (rect) {
            setTargetRect(rect);
          }
        }}
        onMouseLeave={() => setTargetRect(null)}
      >
        Tooltip trigger
      </div>
      {targetRect && <TooltipContent rect={targetRect} />}
    </div>
  );
}
