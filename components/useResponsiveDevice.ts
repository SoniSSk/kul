import React from "react";
import { DeviceTypes } from "../constants/deviceTypes";
export default function useResponsiveDevice() {
  const [device, setDevice] = React.useState(DeviceTypes.DESKTOP);

  React.useLayoutEffect(() => {
    const handleResize = () => {
      setDevice(
        window.innerWidth < 768 ? DeviceTypes.MOBILE : DeviceTypes.DESKTOP
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return {
    isMobile: device === DeviceTypes.MOBILE,
    isDesktop: device === DeviceTypes.DESKTOP,
  };
}
