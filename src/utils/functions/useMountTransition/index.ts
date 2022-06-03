import { useEffect, useState } from "react";

// This custom hook used to check if animation finished
const useMountTransition = (isMounted: boolean, unmountDelay: number) => {
  const [hasTransitioned, setHasTransitioned] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isMounted && !hasTransitioned) {
      setHasTransitioned(true);
    } else if (!isMounted && hasTransitioned) {
      timeoutId = setTimeout(() => setHasTransitioned(false), unmountDelay);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [unmountDelay, isMounted, hasTransitioned]);

  return hasTransitioned;
};

export default useMountTransition;
