import { useEffect, useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { motion, AnimatePresence } from "motion/react";

export default function SharedLayout() {
  const [activeGame, setActiveGame] = useState<(typeof GAMES)[number] | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null!);
  useOnClickOutside(ref, () => setActiveGame(null));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveGame(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <AnimatePresence>
        {activeGame ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute z-10 bg-[rgba(0,_0,_0,_0.2)]"
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {activeGame ? (
          <div className="absolute inset-0 grid place-items-center z-10">
            <motion.div
              layoutId={`card-${activeGame.title}`}
              className="flex h-[fit-content] w-[500px] cursor-pointer flex-col items-start gap-[16px] overflow-hidden bg-[white] p-[16px]"
              style={{ borderRadius: 12 }}
              ref={ref}
            >
              <div className="flex w-full items-center gap-[16px]">
                <motion.img
                  layoutId={`image-${activeGame.title}`}
                  height={56}
                  width={56}
                  alt=""
                  src={activeGame.image}
                  style={{ borderRadius: 12 }}
                />
                <div className="flex flex-grow items-center justify-between">
                  <div className="flex flex-col py-4 px-0">
                    <motion.h2
                      layoutId={`title-${activeGame.title}`}
                      className="game-title"
                    >
                      {activeGame.title}
                    </motion.h2>
                    <motion.p
                      layoutId={`description-${activeGame.title}`}
                      className="game-description"
                    >
                      {activeGame.description}
                    </motion.p>
                  </div>
                  <motion.button
                    layoutId={`button-${activeGame.title}`}
                    className="rounded-full bg-gray-300 py-1 px-3 text-blue-400"
                  >
                    Get
                  </motion.button>
                </div>
              </div>
              <motion.p
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="text-[14px] text-[#63635d]"
              >
                {activeGame.longDescription}
              </motion.p>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="relative flex w-full flex-col items-center my-12 mx-0">
        {GAMES.map((game) => (
          <motion.li
            layoutId={`card-${game.title}`}
            key={game.title}
            onClick={() => setActiveGame(game)}
            className="rounded-lg flex w-[386px] cursor-pointer items-center gap-4 p-0"
            style={{ borderRadius: 8 }}
          >
            <motion.img
              layoutId={`image-${game.title}`}
              height={56}
              width={56}
              alt=""
              src={game.image}
              style={{ borderRadius: 12 }}
            />
            <div className="flex grow items-center justify-between border-gray-300 border-b">
              <div className="flex flex-col py-4 px-0">
                <motion.h2
                  layoutId={`title-${game.title}`}
                  className="game-title"
                >
                  {game.title}
                </motion.h2>
                <motion.p
                  layoutId={`description-${game.title}`}
                  className="game-description"
                >
                  {game.description}
                </motion.p>
              </div>
              <motion.button
                layoutId={`button-${game.title}`}
                className="rounded-full bg-gray-300 py-1 px-3 text-blue-400"
              >
                Get
              </motion.button>
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

const GAMES = [
  {
    title: "The Oddysey",
    description: "Explore unknown galaxies.",
    longDescription:
      "Throughout their journey, players will encounter diverse alien races, each with their own unique cultures and technologies. Engage in thrilling space combat, negotiate complex diplomatic relations, and make critical decisions that affect the balance of power in the galaxy.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/space.png",
  },
  {
    title: "Angry Rabbits",
    description: "They are coming for you.",
    longDescription:
      "The rabbits are angry and they are coming for you. You have to defend yourself with your carrot gun. The game is not simple, you have to be fast and accurate to survive.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/rabbit.png",
  },
  {
    title: "Ghost town",
    description: "Find the ghosts.",
    longDescription:
      "You are in a ghost town and you have to find the ghosts. But be careful, they are dangerous.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/ghost.webp",
  },
  {
    title: "Pirates in the jungle",
    description: "Find the treasure.",
    longDescription:
      "You are a pirate and you have to find the treasure in the jungle. But be careful, there are traps and wild animals.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/pirate.png",
  },

  {
    title: "Lost in the mountains",
    description: "Find your way home.",
    longDescription:
      "You are lost in the mountains and you have to find your way home. But be careful, there are dangerous animals and you can get lost.",
    image:
      "https://animations-on-the-web-git-how-i-use-3066e1-emilkowalski-s-team.vercel.app/how-i-use-framer-motion/how-i-code-animations/boy.webp",
  },
];
