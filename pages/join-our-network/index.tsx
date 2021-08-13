import { FC } from "react";
import { GetStaticProps } from "next";
import { promises as fs } from "fs";
import { withRouter } from "next/router";

import MainLayout from "../../components/MainLayout";
import Menus from "../../dtos/Menus.dto";
import { FOOTER_FILE, MENUS_FILE } from "../../constants/file-paths";

import CorneredBox from "../../components/CorneredBox";
import GetQouteSection from "../../components/GetQouteSection";
import JoinNetworkQuotes from "../../components/JoinNetworkQuotes";
//styles
import Spacer from "../../styled/Spacer";
import FaqBox from "../../components/FaqBox";
import Text from "../../styled/Text";
import KeenDotSlider from "../../components/KeenDotSlider";
import LoginRegister from "../../components/LoginRegister";
import SubmitButton from "../../styled/Button";
import JoinOurNetworkTable from "../../components/joinNetworktable";
import FooterDefinition from "../../dtos/Footer.dto";
import openWhatsapp from "../../utils/openWhatsapp";
import { DeviceTypes } from "../../constants/deviceTypes";
import useResponsiveDevice from "../../components/useResponsiveDevice";
import Button from "../../styled/Button";
interface JoinOurNetworkProps {
  menus: Menus;
  footer: FooterDefinition;
  device: DeviceTypes;
  router: any;
}

const quotes = [
  {
    title: "Grow your practice",
    description: "Join ezyLegal’s professional network and get unlimited access to legal assignments",
  },
  {
    title: "Convenience",
    description: "No scheduling meetings, no client follow-ups. Deliver legal service from the convenience of your home",
  },
  {
    title: "Simple & intutive workflow",
    description: "Be a part of a wonderful experience and see how simple and intuitive our platform is",
  },
];
const askQuestion = [
  {
    question: "Is ezyLegal a law firm?",
    answer: "No, ezyLegal is not a law firm. We are a technology platform that connects our network of \
      high-quality lawyers with customers who have legal consultation and documentation requirements.",
  },
  {
    question: "Why should I register with ezyLegal?",
    answer:
      "If you a Lawyer or a Chartered Accountant, then you should register with ezyLegal. It offers \
      the following benefits: \
      • Ease of delivering service: ezyLegal platform is easy to use and all client assignments \
        and communications happen through this platform. It ensures you deliver maximum in \
        shortest time. \
      • Growth in practice: ezyLegal has access to a wide network of Businesses and Individuals. \
        Getting additional assignments from ezyLegal will provide accelerated growth in your \
        practice. ",
  },
  {
    question: "How do I register?",
    answer: "Visit www.ezylegal.in/join-our-network and click Register. Just fill-in your name, Mobile \
            Number and email ID and you get registered. It’s that easy!",
  },
  {
    question: "Are there any charges for registration?",
    answer: "No, there is no cost for joining the platform. There is no subscription or annual fees. \
            It is and will always remain FREE.",
  },
  {
    question: "How can I update my profile?",
    answer: "Once you successfully register, Login to your Lawyer account and go to Account settings. \
            You will be able to update your profile details from here. Please update your profile with \
            the maximum details so that it helps us know your expertise and practice areas. ",
  },
  {
    question: "How will I get to know if I have been assigned any task?",
    answer: "You will be notified for every new tasks assigned to you via message and email. Also, every \
            time you login to your ezyLegal account, you will get notified of all activities that have taken \
            place since your last login.",
  },
  {
    question: "How will I get my Service fee?",
    answer: "After closure of the service delivery, we will make payment of your service fees directly to \
            your bank account registered with us.",
  },
  {
    question: "How can I delete my profile?",
    answer: "We will be sad to see you go. But at any point in time, for any reason, you wish to leave the \
            platform, you can send us an email at contact@ezylegal.in and we will deactivate your \
            account. ",
  },
];

const JoinOurNetwork: FC<JoinOurNetworkProps> = ({
  menus,
  footer,
  device,
  router,
}) => {
  const { isMobile } = useResponsiveDevice();
  console.log("Router is", router);
  return (
    <MainLayout menus={menus} isHome footer={footer}>
      <CorneredBox
        bgColor="white"
        bgColorBack="secondary"
        paddingTop="20px"
        paddingBottom="70px"
      >
        <div className="container">
          <Spacer direction="vertical" size={10} />
          <div className="row">
            <div className="col-md-8 col-12">
              <Text fontSize="base" center weight="bold" color="primary">
                <b>Inviting Lawyers, Charted Accountants & Company Secretaries</b>
              </Text>
              <Text fontSize="xxxl" center weight="bold">
                Join us in our Mission to make Legal
                <br /> services accessible
              </Text>
              {!isMobile && <KeenDotSlider />}
            </div>
            <div className="col-md-4 col-12 mt-3 mt-md-0">
              <LoginRegister
                register={router.query.register ? router.query.register : false}
              />
            </div>
          </div>

          {isMobile && (
            <>
              <Spacer direction="vertical" size={20} />
              <KeenDotSlider />
            </>
          )}

          <Spacer direction="vertical" size={isMobile ? 0 : 20} />
          <div className="row"></div>
        </div>
      </CorneredBox>
      <CorneredBox
        bgColor="secondary"
        paddingTop="35px"
        paddingBottom="35px"
        bgColorBack="white"
      >
        <JoinNetworkQuotes quotes={quotes} isMobile={isMobile} />
      </CorneredBox>
      <Spacer direction="vertical" size={60} />
      <div>
        <JoinOurNetworkTable />
      </div>
      <Spacer direction="vertical" size={80} />
      <div className="p-md-4 container">
        <Text fontSize="xxxl" center weight="bold" fontFamily="montserrat">
            If you can’t find your practice area, let us know
          <Spacer direction="vertical" size={40} />
          <Button
            size="md"
            rounded
            block={isMobile}
            className="py-2"
            onClick={() => {
              openWhatsapp(device);
            }}
          >
            Send Inquiry
          </Button>
          <Spacer direction="vertical" size={40} />
        </Text>
      </div>
      <CorneredBox
        bgColor="joinNetwork"
        bgColorBack="secondary"
        paddingTop="35px"
        paddingBottom="35px"
      >
        <Spacer direction="vertical" size={40} />
        <FaqBox data={askQuestion} />
        <Spacer direction="vertical" size={40} />
      </CorneredBox>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const menuData = await fs.readFile(MENUS_FILE, { encoding: "utf-8" });
  const menus: Menus = JSON.parse(menuData);

  const footerData = await fs.readFile(FOOTER_FILE, { encoding: "utf-8" });
  const footer: FooterDefinition = JSON.parse(footerData);

  return {
    props: {
      menus,
      footer,
    },
  };
};

export default withRouter(JoinOurNetwork);
