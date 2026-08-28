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

const LETTER_GLITCH_MS = 220;
const LETTER_STAGGER_MS = 48;
const MOBILE_HOLD_MS = 2000;
const SCRAMBLE_CHARS = "!@#$%&*?/\\|<>";

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
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const isHoveredRef = useRef(false);
  const mobileSequenceActiveRef = useRef(false);
  const runGlitchToAltRef = useRef<() => void>(() => {});
  const runGlitchToPrimaryRef = useRef<() => void>(() => {});
  const [isTouchInteraction, setIsTouchInteraction] = useState(false);

  const primaryLetters = useMemo(() => primaryName.split(""), [primaryName]);
  const altLetters = useMemo(() => altName.split(""), [altName]);
  const isSettled = phase === "idle-primary" || phase === "idle-alt";

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
  }, []);

  const queueTimeout = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
  }, []);

  const getGlitchEndDelay = useCallback((letterCount: number) => {
    const lastIndex = Math.max(letterCount - 1, 0);
    return lastIndex * LETTER_STAGGER_MS + LETTER_GLITCH_MS;
  }, []);

  const flickerLetter = useCallback(
    (index: number, targetChar: string, delay: number) => {
      queueTimeout(() => {
        const interval = setInterval(() => {
          setLetters((current) => {
            const next = [...current];
            next[index] = scrambleChar();
            return next;
          });
        }, 35);
        intervalsRef.current.push(interval);

        queueTimeout(() => {
          clearInterval(interval);
          intervalsRef.current = intervalsRef.current.filter(
            (item) => item !== interval,
          );
          setLetters((current) => {
            const next = [...current];
            next[index] = targetChar;
            return next;
          });
        }, LETTER_GLITCH_MS);
      }, delay);
    },
    [queueTimeout],
  );

  const runGlitchToPrimary = useCallback(() => {
    clearTimers();
    setPhase("glitching-to-primary");

    primaryLetters.forEach((char, index) => {
      flickerLetter(index, char, index * LETTER_STAGGER_MS);
    });

    for (
      let index = altLetters.length;
      index < primaryLetters.length;
      index += 1
    ) {
      queueTimeout(() => {
        setVisibleCount(index + 1);
      }, index * LETTER_STAGGER_MS);
    }

    queueTimeout(() => {
      if (isHoveredRef.current) {
        runGlitchToAltRef.current();
        return;
      }
      setPhase("idle-primary");
    }, getGlitchEndDelay(primaryLetters.length));
  }, [
    altLetters.length,
    clearTimers,
    flickerLetter,
    getGlitchEndDelay,
    primaryLetters,
    queueTimeout,
  ]);

  const runGlitchToAlt = useCallback(() => {
    clearTimers();
    setPhase("glitching-to-alt");

    altLetters.forEach((char, index) => {
      flickerLetter(index, char, index * LETTER_STAGGER_MS);
    });

    for (
      let index = altLetters.length;
      index < primaryLetters.length;
      index += 1
    ) {
      queueTimeout(() => {
        setVisibleCount(
          primaryLetters.length - (index - altLetters.length + 1),
        );
      }, index * LETTER_STAGGER_MS);
    }

    queueTimeout(() => {
      if (!isHoveredRef.current) {
        runGlitchToPrimaryRef.current();
        return;
      }
      setPhase("idle-alt");
    }, getGlitchEndDelay(altLetters.length));
  }, [
    altLetters,
    clearTimers,
    flickerLetter,
    getGlitchEndDelay,
    primaryLetters.length,
    queueTimeout,
  ]);

  useEffect(() => {
    runGlitchToAltRef.current = runGlitchToAlt;
    runGlitchToPrimaryRef.current = runGlitchToPrimary;
  }, [runGlitchToAlt, runGlitchToPrimary]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const updateTouchInteraction = () => {
      setIsTouchInteraction(mediaQuery.matches);
    };

    updateTouchInteraction();
    mediaQuery.addEventListener("change", updateTouchInteraction);

    return () => {
      mediaQuery.removeEventListener("change", updateTouchInteraction);
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!introComplete || isTouchInteraction) return;

    isHoveredRef.current = true;

    if (reduceMotion) {
      setLetters(altLetters);
      setVisibleCount(altLetters.length);
      setPhase("idle-alt");
      return;
    }

    if (phase !== "idle-alt" && phase !== "glitching-to-alt") {
      runGlitchToAlt();
    }
  }, [altLetters, introComplete, isTouchInteraction, phase, reduceMotion, runGlitchToAlt]);

  const handleMouseLeave = useCallback(() => {
    if (!introComplete || isTouchInteraction) return;

    isHoveredRef.current = false;

    if (reduceMotion) {
      setLetters(primaryLetters);
      setVisibleCount(primaryLetters.length);
      setPhase("idle-primary");
      return;
    }

    if (phase !== "idle-primary" && phase !== "glitching-to-primary") {
      runGlitchToPrimary();
    }
  }, [introComplete, isTouchInteraction, phase, primaryLetters, reduceMotion, runGlitchToPrimary]);

  const handleMobileTap = useCallback(() => {
    if (!introComplete || !isTouchInteraction) return;
    if (mobileSequenceActiveRef.current) return;
    if (phase !== "idle-primary") return;

    mobileSequenceActiveRef.current = true;
    isHoveredRef.current = true;

    if (reduceMotion) {
      setLetters(altLetters);
      setVisibleCount(altLetters.length);
      setPhase("idle-alt");

      queueTimeout(() => {
        isHoveredRef.current = false;
        setLetters(primaryLetters);
        setVisibleCount(primaryLetters.length);
        setPhase("idle-primary");
        mobileSequenceActiveRef.current = false;
      }, MOBILE_HOLD_MS);
      return;
    }

    runGlitchToAlt();

    queueTimeout(() => {
      isHoveredRef.current = false;
      runGlitchToPrimaryRef.current();

      queueTimeout(() => {
        mobileSequenceActiveRef.current = false;
      }, getGlitchEndDelay(primaryLetters.length));
    }, getGlitchEndDelay(altLetters.length) + MOBILE_HOLD_MS);
  }, [
    altLetters,
    getGlitchEndDelay,
    introComplete,
    isTouchInteraction,
    phase,
    primaryLetters,
    queueTimeout,
    reduceMotion,
    runGlitchToAlt,
  ]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const letterUsesAltStyle = useCallback(
    (index: number, char: string) => {
      if (phase === "idle-alt") return index < altLetters.length;
      if (phase === "idle-primary") return false;
      if (phase === "glitching-to-alt") {
        return index < altLetters.length && char === altLetters[index];
      }
      return index < altLetters.length && char === altLetters[index];
    },
    [altLetters, phase],
  );

  const glitchClassName = useMemo(() => {
    const classes = ["glitch-name"];

    if (reduceMotion) {
      classes.push("glitch-name--reduced");
      return classes.join(" ");
    }

    if (isSettled) classes.push("glitch-name--settled");
    if (phase === "glitching-to-alt") classes.push("glitch-name--glitch-in");
    if (phase === "glitching-to-primary") {
      classes.push("glitch-name--glitch-out");
    }

    return classes.join(" ");
  }, [isSettled, phase, reduceMotion]);

  const renderSizer = () => (
    <span className="glitch-name__sizer" aria-hidden="true">
      <span className="glitch-name__sizer-primary glitch-name__stack">
        {primaryLetters.map((char, index) => (
          <span
            key={`sizer-primary-${index}`}
            className="glitch-name__sizer-char"
          >
            {char}
          </span>
        ))}
      </span>
      <span className="glitch-name__sizer-alt glitch-name__stack glitch-name__stack--alt font-thegora">
        {altLetters.map((char, index) => (
          <span key={`sizer-${index}`} className="glitch-name__sizer-alt-char">
            {char}
          </span>
        ))}
      </span>
    </span>
  );

  const renderLetterLayers = (char: string, useAltStyle: boolean) => (
    <>
      <span
        className={`glitch-name__layer glitch-name__layer--base ${
          useAltStyle ? "glitch-name__layer--alt" : ""
        }`}
      >
        {char}
      </span>
      {!reduceMotion && (
        <>
          <span
            className={`glitch-name__layer glitch-name__layer--cyan ${
              useAltStyle ? "glitch-name__layer--alt" : ""
            }`}
            aria-hidden="true"
          >
            {char}
          </span>
          <span
            className={`glitch-name__layer glitch-name__layer--red ${
              useAltStyle ? "glitch-name__layer--alt" : ""
            }`}
            aria-hidden="true"
          >
            {char}
          </span>
        </>
      )}
    </>
  );

  const visibleLetters = letters.slice(0, visibleCount);

  return (
    <span
      className={`${glitchClassName} select-none text-yellow-300 transition-colors duration-300 ${
        isTouchInteraction ? "cursor-pointer" : "cursor-default"
      }`}
      onMouseEnter={introComplete ? handleMouseEnter : undefined}
      onMouseLeave={introComplete ? handleMouseLeave : undefined}
      onClick={introComplete && isTouchInteraction ? handleMobileTap : undefined}
      onKeyDown={
        introComplete && isTouchInteraction
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleMobileTap();
              }
            }
          : undefined
      }
      tabIndex={introComplete && isTouchInteraction ? 0 : undefined}
      aria-label={
        phase === "idle-alt" || phase === "glitching-to-alt"
          ? altName
          : primaryName
      }
      role="text"
    >
      {renderSizer()}
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
                {renderLetterLayers(letter, false)}
              </motion.span>
            ))}
          </motion.span>
        ) : (
          <span
            className={`glitch-name__stack ${
              phase === "idle-alt" ? "glitch-name__stack--alt" : ""
            }`}
          >
            {visibleLetters.map((char, index) => {
              const useAltStyle = letterUsesAltStyle(index, char);

              return (
                <span
                  key={index}
                  className={`glitch-name__letter ${
                    useAltStyle ? "glitch-name__letter--alt" : ""
                  }`}
                  style={{ "--letter-index": index } as CSSProperties}
                >
                  {renderLetterLayers(char, useAltStyle)}
                </span>
              );
            })}
          </span>
        )}
      </span>
    </span>
  );
};

export default GlitchNameHeading;
