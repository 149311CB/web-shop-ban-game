import { useEffect, useRef } from "react";
import { animationInterval } from "../utils/animationInterval";

export const useAnimationFrame = (ms: any, callback: any) => {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const controller = new AbortController();
    animationInterval(ms, controller.signal, () => {
      callbackRef.current();
    });
    return () => controller.abort();
  }, [ms]);
};

// usage
// useAnimationFrame(1000, () => setVisible(x => !x))
