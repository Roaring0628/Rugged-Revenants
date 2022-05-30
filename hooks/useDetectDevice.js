import { useEffect, useMemo, useState } from "react";
import { useMediaQueries } from "@react-hook/media-query";
import ScreenSize from "../constants/screenSize";
import isTouchScreen from "../helpers/isTouchScreen";

const defaultDeviceValues = {
  isXs: false,
  isSm: false,
  isMd: false,
  isLg: false,
  isXl: false,
  isXxl: false,
  isMobile: false,
  isTouchScreen: false,
};

export default function useDetectDevice() {
  const { sm, md, lg, xl, xxl } = ScreenSize;

  const { matchesAll: isXs } = useMediaQueries({
    screen: "screen",
    width: `(max-width: ${sm}px)`,
  });

  const { matchesAll: isSm } = useMediaQueries({
    screen: "screen",
    width: `(min-width: ${sm}px) and (max-width: ${md}px)`,
  });

  const { matchesAll: isMd } = useMediaQueries({
    screen: "screen",
    width: `(min-width: ${md}px) and (max-width: ${lg}px)`,
  });

  const { matchesAll: isLg } = useMediaQueries({
    screen: "screen",
    width: `(min-width: ${lg}px) and (max-width: ${xl}px)`,
  });

  const { matchesAll: isXl } = useMediaQueries({
    screen: "screen",
    width: `(min-width: ${xl}px) and (max-width: ${xxl}px)`,
  });

  const { matchesAll: isXxl } = useMediaQueries({
    screen: "screen",
    width: `(min-width: ${xxl}px)`,
  });

  const isMobile = useMemo(() => isXs || isSm || isMd, [isMd, isSm, isXs]);
  const isTouchScreenEnabled = useMemo(() => isTouchScreen(), []);

  // useMediaQueries hook returns wrong values during the SSR stage. That breaks
  // html layout. To avoid it media responses are wrapped inside the useEffect hook
  const [values, setValues] = useState(defaultDeviceValues);

  useEffect(() => {
    setValues({
      isXs,
      isSm,
      isMd,
      isLg,
      isXl,
      isXxl,
      isMobile,
      isTouchScreen: isTouchScreenEnabled,
    });
  }, [isXs, isSm, isMd, isLg, isXl, isXxl, isMobile, isTouchScreenEnabled]);

  return values;
}
