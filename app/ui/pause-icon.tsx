import { useState, useEffect } from "react";
import { PauseCircleIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

export default function PauseIcon({ isPaused } : { isPaused: boolean }) {
  const [visible, setVisible] = useState(isPaused);

  useEffect(() => {
    if (isPaused) {
      setVisible(true); // Prikazuje se kad je pauzirano
    }
  }, [isPaused]);

  return visible ? (
    <PauseCircleIcon
      className={clsx(
        "absolute top-1/2 left-45/100 text-white w-[60px] opacity-50",
        { "animate-popInOut": isPaused }
      )}
      onAnimationEnd={() => setVisible(false)}
    />
  ) : null;
}
