import { FC } from 'react';

import MenuItem from '../../dtos/MenuItem.dto';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';
import { DeviceTypes } from '../../constants/deviceTypes';

interface HeaderProps {
  headerMenu?: MenuItem[];
  bgColorBack?:
    | 'primary'
    | 'secondary'
    | 'darkBlue'
    | 'skyBlue'
    | 'white'
    | 'lightSkyBlue';
  device: DeviceTypes;
}

const Header: FC<HeaderProps> = ({ headerMenu, bgColorBack, device }) => {
  switch (device) {
    case DeviceTypes.MOBILE:
      return <MobileHeader headerMenu={headerMenu} bgColorBack={bgColorBack} />;
    case DeviceTypes.DESKTOP:
      return (
        <DesktopHeader headerMenu={headerMenu} bgColorBack={bgColorBack} />
      );
    default:
      return null;
  }
};

export default Header;
