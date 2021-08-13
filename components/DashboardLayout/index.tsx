import { FC, useLayoutEffect, useState } from 'react';

import Menus from '../../dtos/Menus.dto';
import DashboardFooter from '../DashboardFooter/DashboardFooter';
import Header from '../Header';
import { DeviceTypes } from '../../constants/deviceTypes';
import Footer from "../Footer/Footer";
interface DashboardLayoutProps {
  menus: Menus;
  headerBgColorBack?:
    | 'primary'
    | 'secondary'
    | 'darkBlue'
    | 'skyBlue'
    | 'white'
    | 'lightSkyBlue';
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  menus,
  headerBgColorBack,
  children,
}) => {
  const [device, setDevice] = useState(DeviceTypes.DESKTOP);

  useLayoutEffect(() => {
    const handleResize = () => {
      setDevice(
        window.innerWidth < 768 ? DeviceTypes.MOBILE : DeviceTypes.DESKTOP
      );
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <Header
        headerMenu={menus.header}
        bgColorBack={headerBgColorBack}
        device={device}
      />
      {children}
      <Footer device={device}  footer1Menu={[]} footer2Menu={[]} isHome={false}/>
    </>
  );
};

export default DashboardLayout;
