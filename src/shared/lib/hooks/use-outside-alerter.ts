import { RefObject, useEffect } from "react";

export const useOutsideAlerter = (
  ref: RefObject<HTMLElement>,
  onClose: () => void,
): void => {
  useEffect(() => {
    const onClick = (event: Event): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);
};
