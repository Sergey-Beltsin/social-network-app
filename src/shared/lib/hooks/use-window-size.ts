import { useEffect, useState } from "react";
import { deviceWidths } from "@/shared/lib/constants/common";

type WindowSize = {
  width: number | null;
  height: number | null;
};

type WindowSizeRes = WindowSize & {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export const useWindowSize = (): WindowSizeRes => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: null,
    height: null,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    ...windowSize,
    isMobile: (windowSize.width || 0) < deviceWidths.tablet,
    isTablet:
      (windowSize.width || 0) < deviceWidths.desktop &&
      (windowSize.width || 0) >= deviceWidths.tablet,
    isDesktop:
      (windowSize.width || 0) >= deviceWidths.desktop &&
      (windowSize.width || 0) >= deviceWidths.desktop,
  };
};
