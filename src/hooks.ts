import React from "react";

export function useInterval(callback: Function, msDelay: number | null) {
  const savedCallback = React.useRef() as React.MutableRefObject<Function>;

  // Remember the latest function.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback, savedCallback]);

  // Set up the interval.
  React.useEffect(() => {
    let id: number;

    function tick() {
      savedCallback.current();

      if (msDelay !== null) {
        id =
          msDelay < 16
            ? requestAnimationFrame(tick)
            : +setTimeout(tick, msDelay);
      }
    }

    if (msDelay !== null) {
      tick();
      return () => (msDelay < 16 ? cancelAnimationFrame(id) : clearTimeout(id));
    }
  }, [msDelay, savedCallback]);
}
