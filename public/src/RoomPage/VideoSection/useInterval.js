import { useEffect, useRef } from 'react';

// Takes a function and an interval time, running the function at regular intervals
// Useful for polling.
export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    // Remember the lastest callback
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    // Call the callback every tick
    const tick = () => {
      savedCallback.current();
    }

    // Only setup tick if delay is not null
    if (delay != null) {
      // Set tick to run
      const id = setInterval(tick, delay);

      return () => {
        clearInterval(id);
      };
    }
  }, [callback, delay]);
}
