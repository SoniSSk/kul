import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { Accordion, Navbar } from "react-bootstrap";

import MenuItem from "../../dtos/MenuItem.dto";
import Text from "../../styled/Text";
import SlideDrawer from "../SlideDrawer";
import CorneredBox from "../CorneredBox";
import {
  CardBox,
  CardHeader,
  CardBody,
  LinkText,
  MenuButton,
} from "./Header.styled";
import LoginPopup from "../LoginPopup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setLoggedInUser } from "../../redux/loggedInUser/loggedInUser.actions";
import { useRouter } from "next/router";
import shouldRedirectOnLogout from "../../utils/shouldRedirectOnLogout";

interface AccordionItemProps {
  menu?: MenuItem[];
  depth: number;
}

const AccordionMenu: FC<AccordionItemProps> = ({ menu, depth }) => {
  const [activeKey, setActiveKey] = useState<string>("");
  depth++;

  if (!menu) return null;

  return (
    <Accordion activeKey={activeKey} onSelect={(i: any) => setActiveKey(i)}>
      {menu?.map((menu: MenuItem, i: number) =>
        menu.children.length ? (
          <CardBox key={i}>
            <CardHeader border={depth === 1}>
              <Accordion.Toggle as="span" eventKey={String(i)}>
                <div className="row">
                  <div className="col">
                    <Text as="a" fontSize={depth === 1 ? "lg" : "md"} block>
                      {menu.label}
                    </Text>
                  </div>
                  <div className="col-auto">
                    {activeKey === String(i) ? (
                      <img
                        src="/icons/keyboard_arrow_up.svg"
                        alt="Up"
                        width="12"
                      />
                    ) : (
                      <img
                        src="/icons/keyboard_arrow_down.svg"
                        alt="Down"
                        width="12"
                      />
                    )}
                  </div>
                </div>
              </Accordion.Toggle>
            </CardHeader>
            <Accordion.Collapse eventKey={String(i)}>
              <CardBody>
                <AccordionMenu menu={menu.children} depth={depth} />
              </CardBody>
            </Accordion.Collapse>
          </CardBox>
        ) : (
          <Link key={i} href={menu.url}>
            <LinkText fontSize={depth === 1 ? "lg" : "md"} as="a" block>
              {menu.label}
            </LinkText>
          </Link>
        )
      )}
    </Accordion>
  );
};

interface MobileHeaderProps {
  headerMenu?: MenuItem[];
  bgColorBack?:
    | "primary"
    | "secondary"
    | "darkBlue"
    | "skyBlue"
    | "white"
    | "lightSkyBlue";
}

const MobileLogin = () => {
  const [showModal, setShowModal] = useState({
    show: false,
    tabValue: "LOGIN",
  });

  const setTab = (tabValue: string) => {
    setShowModal({
      ...showModal,
      tabValue: tabValue,
    });
  };

  return (
    <>
      <a>
        <a>
          <LinkText>
            <Text color={"gray-500"}> For Customers </Text>
          </LinkText>
        </a>
      </a>

      <a
        onClick={() => {
          setShowModal({
            show: true,
            tabValue: "REGISTER",
          });
        }}
      >
        <a>
          <LinkText>Register Now</LinkText>
        </a>
      </a>
      <a
        onClick={() => {
          setShowModal({
            show: true,
            tabValue: "LOGIN",
          });
        }}
      >
        <a>
          <LinkText>Login</LinkText>
        </a>
      </a>

      <br />

      <a>
        <a>
          <LinkText>
            <Text color={"gray-500"}> For Lawyers & CA </Text>
          </LinkText>
        </a>
      </a>

      <a onClick={() => console.log("Clicked")}>
        <a>
          <LinkText>Register</LinkText>
        </a>
      </a>

      <a onClick={() => console.log("Clicked")}>
        <a>
          <LinkText>Login</LinkText>
        </a>
      </a>

      {showModal.show && (
        <LoginPopup
          tabValue={showModal.tabValue}
          show={showModal.show}
          handleClose={() => {
            setShowModal({
              show: false,
              tabValue: "LOGIN",
            });
          }}
          setTab={setTab}
          mobileView={true}
        />
      )}
    </>
  );
};

const UserInfo = ({ name }: { name: string }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { asPath } = router;
  return (
    <>
      <a>
        <a>
          <LinkText>
            <Text color={"gray-500"}> Hi, {name} </Text>
          </LinkText>
        </a>
      </a>

        <a onClick={() => {router.push("/profile")}}>
            <a>
                <LinkText>My Profile</LinkText>
            </a>
        </a>

      <a onClick={() => {router.push("/dashboard")}}>
        <a>
          <LinkText>My Account</LinkText>
        </a>
      </a>
      <a
        onClick={() => {
          localStorage.removeItem("ezyLegalUserData");
          dispatch(setLoggedInUser(null));
          if(shouldRedirectOnLogout(asPath))
            router.push("/");
        }}
      >
        <a>
          <LinkText> Logout </LinkText>
        </a>
      </a>
    </>
  );
};

const MobileHeader: FC<MobileHeaderProps> = ({ headerMenu, bgColorBack }) => {
  const [isOpen, setIsOpen] = useState(false);

  const nodeRef = useRef<any>();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (nodeRef.current && nodeRef.current.contains(e.target)) {
        // inside click
        return;
      }

      // outside click
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loggedInUserData = useSelector(
    (store: RootState) => store.loggedInUser
  );

  return (
    <CorneredBox bgColor="white" bgColorBack={bgColorBack}>
      <div className="container py-2">
        <div className="row align-items-center">
          <div className="col">
            <div className="d-flex align-items-center">
              <MenuButton className="mr-2" onClick={() => setIsOpen(!isOpen)}>
                <img src="/icons/menu_24px.svg" alt="Menu" width="35" />
              </MenuButton>
              <Link href="/">
                <Navbar.Brand>
                  <img
                    src="/images/logo.svg"
                    alt="Logo"
                    height="50"
                    className="d-inline-block align-text-top"
                  />
                </Navbar.Brand>
              </Link>
            </div>
          </div>
          {/* <div className="col-auto">
            <img src="/icons/search_24px.svg" alt="Search" width="22" />
          </div> */}
        </div>
      </div>

      <SlideDrawer nodeRef={nodeRef} isOpen={isOpen}>
        <div className="logo p-4">
          <img
            src="/images/logo.svg"
            alt="Logo"
            height="40"
            className="d-inline-block align-text-top"
          />
        </div>
        <AccordionMenu menu={headerMenu} depth={1} />
        <hr />
        {loggedInUserData?.name ? (
          <UserInfo name={loggedInUserData?.name} />
        ) : (
          <MobileLogin />
        )}
      </SlideDrawer>
    </CorneredBox>
  );
};

export default MobileHeader;
