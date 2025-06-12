import { animate } from "popmotion";
import React from "react";

const moved = (initialBox: any, finalBox: any) => {
  // we just mounted, so we don't have complete data yet
  if (!initialBox || !finalBox) return false;

  const xMoved = initialBox.x !== finalBox.x;
  const yMoved = initialBox.y !== finalBox.y;

  return xMoved || yMoved;
};

export default function Box() {
  const [toggle, setToggle] = React.useState(false);
  const squareRef = React.useRef<HTMLDivElement>(null);
  const initialPositionRef = React.useRef<DOMRect>(null);

  React.useLayoutEffect(() => {
    const box = squareRef.current?.getBoundingClientRect();
    if (moved(initialPositionRef.current, box)) {
      // get the difference in position
      const deltaX = initialPositionRef.current.x - box.x;
      const deltaY = initialPositionRef.current.y - box.y;

      // inverse the change using a transform
      squareRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      // animate back to the final position
      animate({
        from: 1,
        to: 0,
        duration: 2000,
        onUpdate: (progress) => {
          squareRef.current.style.transform = `translate(${
            deltaX * progress
          }px, ${deltaY * progress}px)`;
        },
      });
    }
    initialPositionRef.current = box;
  });

  return (
    <div className="w-full">
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
      <div
        className="flex w-full"
        style={{
          justifyContent: toggle ? "end" : "start",
        }}
      >
        <div
          id="motion"
          className="size-[200px] border border-blue-800 bg-blue-400"
          ref={squareRef}
        />
      </div>
    </div>
  );
}
