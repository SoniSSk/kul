import {FC, useState} from "react";
import Link from "next/link";
import Zendesk from "react-zendesk";

import MenuItem from "../../dtos/MenuItem.dto";
import {
  FloatingButton,
  Footer as StyledFooter,
  Footer2Menu,
  FooterMenu,
  FooterTop,
} from "./Footer.styled";
import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";
import Button from "../../styled/Button";
import Divider from "../../styled/Divider";
import {
  contactNumber,
  emailAddress,
} from "../../constants/contactInformation";
import { DeviceTypes } from "../../constants/deviceTypes";
import WhatsappFooterButton from "../WhatsappFooterButton/WhatsappFooterButton";
import FooterDefinition from "../../dtos/Footer.dto";
import useResponsiveDevice from "../useResponsiveDevice";
import {errorToast, successToast} from "../../utils/toasts";
import backendApi from "../../api/backendApi";
import {SUBSCRIBE_TO_NEWSLETER} from "../../constants/queries/user";

const ZENDESK_KEY = "cda34b4e-33b3-423c-9ced-053740ee0306";

interface FooterProps {
  footer1Menu?: MenuItem[];
  footer2Menu?: MenuItem[];
  isHome?: boolean;
  device: DeviceTypes;
  footer?: FooterDefinition;
}

const FooterJumpTop = () => {
  return (
    <div
      style={{
        position: "absolute",
        display: "grid",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        marginTop: "-70px",
        left: "50%",
        backgroundColor: "#396aeb",
        cursor: "pointer",
        alignContent: "center",
        gap: ".4rem",
        transform: "translateX(-50%)",
      }}
      className="d-flex flex-column justify-content-center align-items-center"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z"
          fill="white"
        />
      </svg>
      <Text weight="bold" color="white" className="mb-0">
        TOP
      </Text>
    </div>
  );
};

const Footer: FC<FooterProps> = ({ footer1Menu, isHome, device, footer }) => {
  const { isMobile } = useResponsiveDevice();

  const [email, setEmail] = useState<string>("");
  const handleSubscribe = async () => {
      try{
          const res = await backendApi.post("/", {
              query: SUBSCRIBE_TO_NEWSLETER,
              variables: {
                  email: email
              }
          });
          if(res.data.errors?.length) throw new Error(res.data.errors[0].message);
          successToast("Successfully subscribed to newsletter")
      }catch (e) {
          errorToast(e.message);
      }
  }

  return (
    <>
      {isHome ? (
        <FooterTop>
          <FooterJumpTop />
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md">
                {/*<img src="/images/footer-logo.svg" alt="Logo" />*/}
                <Text fontSize="xxxl" color="white" weight="bold">
                  ezyLegal
                </Text>
              </div>
              <div className="col-12 col-md" />
              <div className="col-12 col-md-5">
                <Text
                  fontSize="lg"
                  fontFamily="montserrat"
                  color="white"
                  weight="bold"
                  className="mb-0"
                >
                  Get Useful tips and Product info
                </Text>
                <Spacer size={16} direction="vertical" />
                <div className="d-flex">
                  <input className="form-control"
                         placeholder="Your Email Id"
                         value={email} onChange={(event) => setEmail(event.target.value)}/>
                  <Spacer direction="horizontal" size={15} />
                  <Button size="md" cornered onClick={handleSubscribe}>
                    Signup
                  </Button>
                </div>
              </div>
            </div>
            <Divider color="white" margin="40px" />
            <div className="row">
              <div className="col-12 col-md-5">
                <Text color="white" fontSize="lg" weight="midbold">
                  {footer?.footer_leftcontainer?.about.heading}
                </Text>
                <Text color="white" fontSize="md" weight="semibold">
                  {footer?.footer_leftcontainer?.about.description}
                </Text>
                <Spacer size={20} direction="vertical" />
                {footer?.footer_rightcontainer?.sections?.sectionlinks
                  ?.length ? (
                  <FooterMenu>
                    {footer.footer_rightcontainer.sections.sectionlinks.map(
                      (menu) => (
                        <li key={`link-${menu.name}`}>
                          <Link href={menu.link}>
                            <a>
                              <Text
                                fontSize="md"
                                weight="midbold"
                                color="white"
                              >
                                {menu.name}
                              </Text>
                            </a>
                          </Link>
                        </li>
                      )
                    )}
                  </FooterMenu>
                ) : null}
              </div>
              <div className="col-12 col-md-7">
                <div className="row justify-content-between">
                  <div className="col-12 col-md-auto">
                    <Text color="white" fontSize="lg" weight="midbold">
                      {footer?.footer_rightcontainer.secondSections.heading}
                    </Text>
                    <Footer2Menu>
                      {footer?.footer_rightcontainer.secondSections.sectionlinks.map(
                        (item: any) => {
                          return (
                            <li>
                              <Link href={item.link}>
                                <a>
                                  <Text
                                    color="white"
                                    fontSize="md"
                                    weight="semibold"
                                  >
                                    {item.name}
                                  </Text>
                                </a>
                              </Link>
                            </li>
                          );
                        }
                      )}
                    </Footer2Menu>
                  </div>
                  <div className="col-12 col-md-auto">
                    <Text color="white" fontSize="lg" weight="midbold">
                      Socials
                    </Text>
                    <FooterMenu>
                      {footer?.footer_leftcontainer.social.map(
                        (social: any) => {
                          let iconSrc = "";
                          switch (social.name) {
                            case "Twitter":
                              iconSrc = "/icons/twitter.svg";
                              break;
                            case "LinkedIn":
                              iconSrc = "/icons/linkedin.svg";
                              break;
                            case "Instagram":
                              iconSrc = "/icons/instagram.svg";
                              break;
                            case "Facebook":
                              iconSrc = "/icons/facebook.svg";
                              break;
                          }
                          return (
                            <li>
                              <Link href={social.link}>
                                <a>
                                  <img
                                    src={iconSrc}
                                    width={20}
                                    height={20}
                                    alt={social.alttext}
                                  />
                                </a>
                              </Link>
                            </li>
                          );
                        }
                      )}
                    </FooterMenu>
                    <Spacer size={40} direction="vertical" />
                    <Text color="white" weight="midbold" fontSize="lg">
                      Contact Us
                    </Text>
                    <Link href={"mailto:" + emailAddress}>
                      <a>
                        <Text
                          color="white"
                          fontSize="md"
                          weight="semibold"
                          block
                        >
                          <img
                            src="/icons/email_24px.svg"
                            width="16"
                            alt="email"
                            className="mr-2"
                          />
                          {emailAddress}
                        </Text>
                      </a>
                    </Link>
                    <Link href={"tel:" + contactNumber}>
                      <a>
                        <Text
                          color="white"
                          fontSize="md"
                          block
                          weight="semibold"
                        >
                          <img
                            src="/icons/phone_24px.svg"
                            width="16"
                            alt="phone"
                            className="mr-2"
                          />
                          {contactNumber}
                        </Text>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FooterTop>
      ) : null}
      <StyledFooter>
        {!isHome ? <FooterJumpTop /> : null}
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8">
              <Text color="white" fontSize="md" weight="midbold">
                © 2021 Neo Online Ventures Pvt Ltd. All rights reserved.
              </Text>
              <Text color="white" fontSize="md" weight="midbold">
                ezyLegal is not a law firm, or a substitute for a lawyer or law
                firm. We are also not a "lawyer referral service". Use of this
                website will be at the sole risk of the user. Use of any service
                will not create any lawyer-client relationship.
                <Spacer direction="vertical" size={15} />
                ezyLegal will not be liable for any consequence of any action
                taken by the user relying on information or services provided
                under this website. In cases where the user has any legal
                issues, he/she in all cases must seek independent legal advice.
                <Spacer direction="vertical" size={15} />
                Use of our products and services are governed by our
                <Link href="/termsandconditions"> Terms of Use </Link> and
                <Link href="/privacy"> Privacy Policy </Link>.
              </Text>
            </div>
            <div
              className={
                isMobile
                  ? "d-flex flex-column p-3"
                  : "col-12 col-md-4 text-right"
              }
            >
              {!isHome ? (
                <>
                  <Link href={"mailto:" + emailAddress}>
                    <a href="" className="p-1">
                      <Text
                        color="white"
                        fontSize="sm"
                        weight="semibold"
                        inline
                      >
                        <img
                          src="/icons/email_24px.svg"
                          width="16"
                          alt="email"
                          className="mr-2"
                        />
                        {emailAddress}
                      </Text>
                    </a>
                  </Link>
                  <Spacer direction="horizontal" size={25} />
                  <Link href={"tel:" + contactNumber}>
                    <a className="p-1">
                      <Text
                        color="white"
                        fontSize="sm"
                        weight="semibold"
                        inline
                      >
                        <img
                          src="/icons/phone_24px.svg"
                          width="16"
                          alt="phone"
                          className="mr-2"
                        />
                        {contactNumber}
                      </Text>
                    </a>
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </StyledFooter>
      <WhatsappFooterButton device={device} />
    </>
  );
};

export default Footer;
