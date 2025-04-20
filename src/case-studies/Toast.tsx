import React, { useState, useEffect } from "react";
import "./toast.css";

export default function Toaster() {
  const [toasts, setToasts] = useState(0);

  return (
    <div className="center-container h-screen">
      <div className="relative flex flex-col items-end p-6 h-full">
        <div
          className="absolute left-[50%] bottom-[80px] flex flex-col gap-(--gap) w-[356px] transform-[translateX(-50%)]"
          style={{ "--gap": "8px" } as React.CSSProperties}
        >
          {Array.from({ length: toasts }).map((_, i) => (
            <Toast key={i} index={toasts - (i + 1)} />
          ))}
        </div>
        <button
          className="relative inline-block mt-auto px-3 w-auto h-8 bg-[#fff] rounded-full shadow cursor-pointer"
          onClick={() => {
            setToasts(toasts + 1);
          }}
        >
          Add toast
        </button>
      </div>
    </div>
  );
}

function Toast({ index }: { index: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return (
    <div
      className="absolute bottom-0 transform-[translateY(100%)] opacity-[0] flex flex-col gap-2 px-3.5 py-3
      w-full rounded-xl shadow data-[mounted='true']:transform-[translateY(calc(var(--index)*(100%+var(--gap))*-1))] data-[mounted='true']:opacity-[1]"
      style={
        {
          "--index": index,
          transition: "opacity 400ms, transform 400ms",
        } as React.CSSProperties
      }
      data-mounted={mounted}
    >
      <span className="text-black">Event Created</span>
      <span className="text-black">Monday, January 3rd at 6:00pm</span>
    </div>
  );
}
