import { FC, useState, useRef, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";

import MenuItem from "../../dtos/MenuItem.dto";
import Button from "../../styled/Button";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";
import CorneredBox from "../CorneredBox";
import SlideSearchBox from "../SlideSearchBox";
import ActiveLink from "../ActiveLink";
import LoginPopup from "../LoginPopup";
import {
  NavLink,
  StyledNavDropdown,
  StyledNavbar,
  SignInDropdown,
  SignInDropdownElement,
  DropdownTogle,
} from "./Header.styled";
import DropDownContainer from "./DropDownContainer";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setLoggedInUser } from "../../redux/loggedInUser/loggedInUser.actions";
import shouldRedirectOnLogout from "../../utils/shouldRedirectOnLogout";

interface HeaderProps {
  headerMenu?: MenuItem[];
  bgColorBack?:
    | "primary"
    | "secondary"
    | "darkBlue"
    | "skyBlue"
    | "white"
    | "lightSkyBlue";
}

interface LoginModalControls {
  show: boolean;
  tabValue: string;
}

const DesktopHeader: FC<HeaderProps> = ({ headerMenu, bgColorBack }) => {
  const [isOpen, setIsOpen] = useState<LoginModalControls>({
    show: false,
    tabValue: "LOGIN",
  });

  const router = useRouter();
  const { asPath } = router;

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [hoverId, setHoverId] = useState<string>("");
  const dispatch = useDispatch();
  const loggedInUserData = useSelector(
    (store: RootState) => store.loggedInUser
  );
  const [showSignInDropdown, setShowSignInDropdown] = useState<boolean>(false);
  const handleClose = () => {
    setIsOpen({
      ...isOpen,
      show: false,
    });
  };
  const Signout_User = () => {
    localStorage.removeItem("ezyLegalUserData");
    dispatch(setLoggedInUser(null));
    if(shouldRedirectOnLogout(asPath))
      router.push("/");
  };

  const outsideClickListener = (ref: any) => {
    useEffect(() => {
      function handleOutsideClick(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSignInDropdown(false);
        }
      }

      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  outsideClickListener(wrapperRef);

  const setTab = (value: string) => {
    setIsOpen({
      ...isOpen,
      tabValue: value,
    });
  };

  return (
    <CorneredBox
      bgColor="white"
      bgColorBack={bgColorBack}
      innerClassName="header_top"
    >
      <StyledNavbar expand="lg">
        <div className="container d-flex">
          <Link href="/">
            <a>
              <Navbar.Brand style={{ width: "180px" }}>
                <img
                  src="/images/logo.svg"
                  alt="Logo"
                  width="180"
                  className="d-inline-block align-text-top"
                />
              </Navbar.Brand>
            </a>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* this is list item */}
            <Nav className="m-auto">
              {headerMenu?.map((menu: MenuItem) =>
                menu.children.length ? (
                  <StyledNavDropdown
                    key={menu.id}
                    title={
                      <Text inline weight="midbold" fontSize="md">
                        {menu.label}
                      </Text>
                    }
                    id={menu.id}
                    show={menu.id == hoverId && showDropdown && true}
                    onMouseEnter={() => {
                      setShowDropdown(true);
                      setHoverId(menu.id);
                    }}
                    onMouseLeave={() => {
                      setShowDropdown(false);
                      setHoverId("");
                    }}
                  >
                    <DropDownContainer
                      menu={menu}
                      handleClose={() => {
                        setTimeout(() => {
                          setShowDropdown(false);
                        }, 1000);
                      }}
                    />
                  </StyledNavDropdown>
                ) : (
                  <ActiveLink key={menu.id} href={menu.url}>
                    <a>
                      <NavLink fontSize="md" weight="midbold">
                        {menu.label}
                      </NavLink>
                    </a>
                  </ActiveLink>
                )
              )}
            </Nav>
            <div
              style={{
                display: "flex",
                width: "26%",
                gap: "1rem",
                justifyContent: "flex-end",
              }}
            >
              {/* <SlideSearchBox /> */}
              {!loggedInUserData?.name ? (
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <Button
                    size="md"
                    rounded
                    style={{
                      width: "150px",
                      fontSize: "16px",
                      fontWeight: 700,
                    }}
                    onClick={() => setShowSignInDropdown(true)}
                  >
                    Sign In
                  </Button>
                  <SignInDropdown
                    ref={wrapperRef}
                    className={showSignInDropdown ? "show py-3" : "hide py-3"}
                  >
                    <Text fontSize="md" color="gray-500" weight="midbold">
                      For Customers
                    </Text>
                    <SignInDropdownElement
                      className="colors"
                      onClick={() => {
                        setIsOpen({
                          show: true,
                          tabValue: "LOGIN",
                        });
                        setShowSignInDropdown(false);
                      }}
                    >
                      Login
                    </SignInDropdownElement>
                    <SignInDropdownElement
                      className="colors"
                      onClick={() => {
                        setIsOpen({
                          show: true,
                          tabValue: "REGISTER",
                        });
                        setShowSignInDropdown(false);
                      }}
                    >
                      Register
                    </SignInDropdownElement>
                    <Spacer direction="horizontal" size={10} />
                    <Text fontSize="md" color="gray-500" weight="bold">
                      For Lawyers & CA
                    </Text>
                    <SignInDropdownElement
                      className="colors"
                      onClick={() => router.push("/join-our-network")}
                    >
                      Login
                    </SignInDropdownElement>
                    <SignInDropdownElement
                      className="colors"
                      onClick={() => {
                        router.push({
                          pathname: "/join-our-network",
                          query: { register: true },
                        });
                      }}
                    >
                      Register
                    </SignInDropdownElement>
                  </SignInDropdown>
                </div>
              ) : (
                <Dropdown>
                  <DropdownTogle id="dropdown-basic">
                    {loggedInUserData?.name.split(" ")[0]}
                  </DropdownTogle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {
                      if(loggedInUserData?.user_type === "AGENT"){
                        const newPath = window.location.origin + "/expert/profile";
                        window.location.replace(newPath);
                      }else{
                        router.push("/profile");
                      }

                    }}>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      if(loggedInUserData?.user_type === "AGENT"){
                        const newPath = window.location.origin + "/expert/";
                        window.location.replace(newPath);
                      }else {
                        router.push("/dashboard");
                      }

                    }}>
                      {loggedInUserData?.user_type === "AGENT" ? "My Dashboard" : "My Account"}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => Signout_User()}>
                      Sign out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </Navbar.Collapse>
        </div>
      </StyledNavbar>
      {/* This is Login popup page  */}
      {isOpen && (
        <LoginPopup
          tabValue={isOpen.tabValue}
          show={isOpen.show}
          handleClose={handleClose}
          setTab={setTab}
        />
      )}
    </CorneredBox>
  );
};

export default DesktopHeader;
