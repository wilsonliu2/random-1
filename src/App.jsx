import { Canvas, useFrame } from "@react-three/fiber";
import Scene from "./components/Scene";
import Button from "./components/Button";
import {
  useScroll,
  motion,
  useInView,
  useAnimate,
  useAnimation,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.5,
    },
  },
};

const gridSquareVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const svgIconVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(252, 211, 77, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(252, 211, 77, 1)",
  },
};

const App = () => {
  const { scrollYProgress: completionProgress } = useScroll();

  const containerRef = useRef(null);

  const isInView = useInView(containerRef, { once: true });
  const mainControls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const paragraphOneValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["-100%", "0%"],
  );

  const paragraphTwoValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "0%"],
  );

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);
  return (
    <>
      {/*<Button />*/}
      <div className="flex flex-col gap-10 overflow-x-hidden">
        {/*<Canvas>
          <Scene />
        </Canvas>*/}
        <motion.section
          variants={gridContainerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3 gap-10 p-10"
        >
          {/* Fade */}
          <motion.div
            variants={gridSquareVariants}
            className="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800"
          >
            <motion.div
              className="h-20 w-20 rounded-lg bg-stone-100"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            ></motion.div>
            <motion.div
              className="h-20 w-20 rounded-full bg-stone-100"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            ></motion.div>
          </motion.div>

          {/* Shape */}
          <motion.div
            variants={gridSquareVariants}
            className="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800"
          >
            <motion.div
              className="h-1/3 w-1/3 bg-rose-400 shadow-md"
              animate={{
                scale: [1, 2, 2, 1],
                rotate: [0, 90, 90, 0],
                borderRadius: ["10%", "10%", "50%", "10%"],
              }}
              transition={{
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1,
              }}
            ></motion.div>
          </motion.div>

          {/* Button */}
          <motion.div
            variants={gridSquareVariants}
            className="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#d1d5db",
                color: "black",
              }}
              transition={{ bounceDamping: 10, bounceStiffness: 600 }}
              className="w-1/2 rounded-lg bg-emerald-600 py-4 text-2xl font-light tracking-wide text-gray-100"
            >
              Click me
            </motion.button>
          </motion.div>

          {/* Drag */}
          <motion.div
            variants={gridSquareVariants}
            className="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800"
          >
            <motion.div
              className="h-1/3 w-1/3 cursor-grab rounded-3xl bg-orange-500"
              drag
              dragConstraints={{
                top: -125,
                right: 125,
                left: -125,
                bottom: 125,
              }}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
            ></motion.div>
          </motion.div>

          {/* Scroll */}
          <motion.div
            variants={gridSquareVariants}
            className="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800"
          >
            <motion.div className="aspect-square w-40 rounded-xl bg-gray-50/20">
              <motion.div
                className="w-full, h-full origin-bottom rounded-xl bg-gray-400"
                style={{ scaleY: completionProgress }}
              ></motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll */}
          <motion.div
            variants={gridSquareVariants}
            className="flex aspect-square items-center justify-center gap-10 rounded-lg bg-slate-800"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-1/2 stroke-amber-500 stroke-[0.5]"
            >
              <motion.path
                d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                variants={svgIconVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  default: {
                    duration: 2,
                    ease: "easeInOut",
                    delay: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1,
                  },
                  fill: {
                    duration: 2,
                    ease: "easeIn",
                    delay: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 1,
                  },
                }}
              />
            </motion.svg>
          </motion.div>
        </motion.section>

        <section className="mb-10 flex flex-col gap-10" ref={containerRef}>
          <motion.h1
            className="text-center text-5xl tracking-wide text-slate-100"
            animate={mainControls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 0.3 }}
          >
            Keep scrolling
          </motion.h1>
          <motion.p
            className="mx-auto w-1/2 text-4xl font-thin text-slate-100"
            style={{ translateX: paragraphOneValue }}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione,
            illo reiciendis. Quidem officia sint corporis aliquid velit quasi,
            quod assumenda!
          </motion.p>
          <motion.p
            className="mx-auto w-1/2 text-4xl font-thin text-slate-100"
            style={{ translateX: paragraphTwoValue }}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum,
            molestiae.
          </motion.p>
        </section>
      </div>
    </>
  );
};

export default App;
