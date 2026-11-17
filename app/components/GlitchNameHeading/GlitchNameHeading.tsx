"use client";

import { motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { createHomeMotion } from "@/app/motion/homeMotion";

const LETTER_SCRAMBLE_MS = 160;
const LETTER_STAGGER_MS = 30;
const SCRAMBLE_TICK_MS = 40;
const TOUCH_HOLD_MS = 1800;
const SCRAMBLE_CHARS = "abcdefghkmnrstuxz/_";

type MotionConfig = ReturnType<typeof createHomeMotion>;

type Phase =
  | "idle-primary"
  | "glitching-to-alt"
  | "idle-alt"
  | "glitching-to-primary";

type GlitchNameHeadingProps = {
  primaryName: string;
  altName: string;
  motionConfig: MotionConfig;
  reduceMotion: boolean;
};

const scrambleChar = () =>
  SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

const getSequenceDuration = (letterCount: number) =>
  Math.max(letterCount - 1, 0) * LETTER_STAGGER_MS + LETTER_SCRAMBLE_MS;

const GlitchNameHeading = ({
  primaryName,
  altName,
  motionConfig,
  reduceMotion,
}: GlitchNameHeadingProps) => {
  const [introComplete, setIntroComplete] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle-primary");
  const [letters, setLetters] = useState<string[]>(() => primaryName.split(""));
  const [visibleCount, setVisibleCount] = useState(primaryName.length);
  const [isTouch, setIsTouch] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const isHoveredRef = useRef(false);
  const touchSequenceRef = useRef(false);
  const runToAltRef = useRef<() => void>(() => {});
  const runToPrimaryRef = useRef<() => void>(() => {});

  const primaryLetters = useMemo(() => primaryName.split(""), [primaryName]);
  const altLetters = useMemo(() => altName.split(""), [altName]);
  const isGlitching =
    phase === "glitching-to-alt" || phase === "glitching-to-primary";

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
  }, []);

  const queueTimeout = useCallback((fn: () => void, delay: number) => {
    timersRef.current.push(setTimeout(fn, delay));
  }, []);

  const scrambleLetter = useCallback(
    (index: number, targetChar: string, delay: number) => {
      queueTimeout(() => {
        const interval = setInterval(() => {
          setLetters((current) => {
            const next = [...current];
            next[index] = scrambleChar();
            return next;
          });
        }, SCRAMBLE_TICK_MS);
        intervalsRef.current.push(interval);

        queueTimeout(() => {
          clearInterval(interval);
          setLetters((current) => {
            const next = [...current];
            next[index] = targetChar;
            return next;
          });
        }, LETTER_SCRAMBLE_MS);
      }, delay);
    },
    [queueTimeout],
  );

  const runToPrimary = useCallback(() => {
    clearTimers();
    setPhase("glitching-to-primary");

    primaryLetters.forEach((char, index) => {
      scrambleLetter(index, char, index * LETTER_STAGGER_MS);
    });

    for (let index = altLetters.length; index < primaryLetters.length; index++) {
      queueTimeout(() => setVisibleCount(index + 1), index * LETTER_STAGGER_MS);
    }

    queueTimeout(() => {
      if (isHoveredRef.current) {
        runToAltRef.current();
        return;
      }
      setPhase("idle-primary");
    }, getSequenceDuration(primaryLetters.length));
  }, [altLetters.length, clearTimers, primaryLetters, queueTimeout, scrambleLetter]);

  const runToAlt = useCallback(() => {
    clearTimers();
    setPhase("glitching-to-alt");

    altLetters.forEach((char, index) => {
      scrambleLetter(index, char, index * LETTER_STAGGER_MS);
    });

    for (let index = altLetters.length; index < primaryLetters.length; index++) {
      queueTimeout(
        () =>
          setVisibleCount(
            primaryLetters.length - (index - altLetters.length + 1),
          ),
        index * LETTER_STAGGER_MS,
      );
    }

    queueTimeout(() => {
      if (!isHoveredRef.current) {
        runToPrimaryRef.current();
        return;
      }
      setPhase("idle-alt");
    }, getSequenceDuration(altLetters.length));
  }, [altLetters, clearTimers, primaryLetters.length, queueTimeout, scrambleLetter]);

  useEffect(() => {
    runToAltRef.current = runToAlt;
    runToPrimaryRef.current = runToPrimary;
  }, [runToAlt, runToPrimary]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const showInstantly = useCallback(
    (target: "alt" | "primary") => {
      const next = target === "alt" ? altLetters : primaryLetters;
      setLetters(next);
      setVisibleCount(next.length);
      setPhase(target === "alt" ? "idle-alt" : "idle-primary");
    },
    [altLetters, primaryLetters],
  );

  const handleMouseEnter = () => {
    if (!introComplete || isTouch) return;
    isHoveredRef.current = true;

    if (reduceMotion) {
      showInstantly("alt");
      return;
    }
    if (phase !== "idle-alt" && phase !== "glitching-to-alt") runToAlt();
  };

  const handleMouseLeave = () => {
    if (!introComplete || isTouch) return;
    isHoveredRef.current = false;

    if (reduceMotion) {
      showInstantly("primary");
      return;
    }
    if (phase !== "idle-primary" && phase !== "glitching-to-primary") {
      runToPrimary();
    }
  };

  const handleTap = () => {
    if (!introComplete || !isTouch) return;
    if (touchSequenceRef.current || phase !== "idle-primary") return;

    touchSequenceRef.current = true;
    isHoveredRef.current = true;

    if (reduceMotion) {
      showInstantly("alt");
      queueTimeout(() => {
        isHoveredRef.current = false;
        showInstantly("primary");
        touchSequenceRef.current = false;
      }, TOUCH_HOLD_MS);
      return;
    }

    runToAlt();
    queueTimeout(() => {
      isHoveredRef.current = false;
      runToPrimaryRef.current();
      queueTimeout(() => {
        touchSequenceRef.current = false;
      }, getSequenceDuration(primaryLetters.length));
    }, getSequenceDuration(altLetters.length) + TOUCH_HOLD_MS);
  };

  const usesAltStyle = (index: number, char: string) => {
    if (phase === "idle-alt") return index < altLetters.length;
    if (phase === "idle-primary") return false;
    return index < altLetters.length && char === altLetters[index];
  };

  const className = [
    "glitch-name select-none text-accent",
    isGlitching && !reduceMotion ? "glitch-name--glitching" : "",
    isTouch ? "cursor-pointer" : "cursor-default",
  ].join(" ");

  return (
    <>
      <span className="sr-only">{primaryName}</span>
      <span
        aria-hidden="true"
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTap}
      >
        <span className="glitch-name__sizer">
          <span className="glitch-name__stack">{primaryName}</span>
          <span className="glitch-name__stack glitch-name__stack--alt">
            {altLetters.map((char, index) => (
              <span key={index} className="glitch-name__letter--alt">
                {char}
              </span>
            ))}
          </span>
        </span>

        <span className="glitch-name__content">
          {!introComplete ? (
            <motion.span
              variants={motionConfig.nameContainer}
              initial="hidden"
              animate="visible"
              className="glitch-name__stack"
            >
              {primaryLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  variants={motionConfig.nameLetter}
                  onAnimationComplete={() => {
                    if (index === primaryLetters.length - 1) {
                      setIntroComplete(true);
                    }
                  }}
                  className="glitch-name__letter"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          ) : (
            <span
              className={`glitch-name__stack ${
                phase === "idle-alt" ? "glitch-name__stack--alt" : ""
              }`}
            >
              {letters.slice(0, visibleCount).map((char, index) => (
                <span
                  key={index}
                  className={`glitch-name__letter ${
                    usesAltStyle(index, char) ? "glitch-name__letter--alt" : ""
                  }`}
                  style={{ "--letter-index": index } as CSSProperties}
                >
                  {char}
                </span>
              ))}
            </span>
          )}
        </span>
      </span>
    </>
  );
};

export default GlitchNameHeading;
