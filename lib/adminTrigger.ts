import { useEffect, useRef } from "react";

export function useAdminTrigger(onTrigger: () => void, timeoutMs = 1500) {
  const tapCountRef = useRef(0);
  const lastTapTimeRef = useRef(0);
  const resetTimerRef = useRef<number | null>(null);

  const reset = () => {
    tapCountRef.current = 0;
    lastTapTimeRef.current = 0;
  };

  const trigger = () => {
    const now = Date.now();

    if (now - lastTapTimeRef.current > timeoutMs) {
      tapCountRef.current = 0;
    }

    lastTapTimeRef.current = now;
    tapCountRef.current += 1;

    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      reset();
    }, timeoutMs);

    if (tapCountRef.current >= 4) {
      reset();
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
      onTrigger();
    }
  };

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  return { trigger };
}
