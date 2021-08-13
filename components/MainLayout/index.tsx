import {FC, useEffect, useLayoutEffect, useState} from 'react';

import Menus from '../../dtos/Menus.dto';
import Footer from '../Footer/Footer';
import Header from '../Header';
import { DeviceTypes } from '../../constants/deviceTypes';
import FooterDefinition from "../../dtos/Footer.dto";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {setLocation} from "../../redux/location/location.actions";
import LoadingOverlay from "react-loading-overlay";
import {RootState} from "../../redux/store";
import {setLoadingState} from "../../redux/loader/loader.actions";
import {setLoggedInUser} from "../../redux/loggedInUser/loggedInUser.actions";

interface MainLayoutProps {
  menus: Menus;
  headerBgColorBack?:
    | 'primary'
    | 'secondary'
    | 'darkBlue'
    | 'skyBlue'
    | 'white'
    | 'lightSkyBlue';
  children: React.ReactNode;
  isHome?: boolean;
  footer: FooterDefinition
}

const MainLayout: FC<MainLayoutProps> = ({
  menus,
  headerBgColorBack,
  isHome,
  children,
    footer
}) => {
  const [device, setDevice] = useState(DeviceTypes.DESKTOP);

  const showLoader = useSelector((state: RootState) => state.loader);

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

  useEffect(function (){
      const userData = localStorage.getItem("ezyLegalUserData");
      if(userData === null){
          dispatch(setLoggedInUser(null));
      }
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoadingState(false));
    axios
        .get('https://ip2c.org/self')
        .then((res) => {
          if (res.data) {
            const data = String(res.data).toLowerCase().split(';');
            if (data.length) {
              console.log("Location is", data[1]);
              dispatch(setLocation(data[1]));
            }
          }
        })
        .catch(() => {
          console.log('Location does not detected');
        });
  }, []);

  return (
      <LoadingOverlay active={showLoader.showLoader} spinner text={"Please wait"}>
        <div
            className="d-flex flex-column justify-content-between"
            style={{
              minHeight: '100vh',
            }}
        >

          <Header
              headerMenu={menus.header}
              bgColorBack={headerBgColorBack}
              device={device}
          />
          {children}
          <Footer footer1Menu={menus.footer1} isHome={isHome} device={device} footer={footer}/>
        </div>
      </LoadingOverlay>

  );
};

export default MainLayout;
