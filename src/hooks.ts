import React from "react";

export function useInterval(callback: Function, delay: number | null) {
  const savedCallback = React.useRef() as React.MutableRefObject<Function>;

  // Remember the latest function.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback, savedCallback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, savedCallback]);
}
