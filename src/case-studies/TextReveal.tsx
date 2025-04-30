import { CSSProperties, useState } from "react";

export default function TextReveal() {
  const [reset, setReset] = useState(0);
  const WORD = "Animations";

  return (
    <div className="center-container">
      <div key={reset}>
        <h1 className="text-3xl font-bold overflow-hidden">
          {WORD.split("").map((char, index) => (
            <span
              key={char}
              className="inline-block animation-text-reveal"
              style={
                {
                  "--index": index,
                } as CSSProperties
              }
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
      {/* Use this button to replay your animation */}
      <button
        className="w-[200px] cursor-pointer rounded-lg p-2 mt-6 relative bg-white shadow"
        onClick={() => setReset(reset + 1)}
      >
        Replay animation
      </button>
    </div>
  );
}
