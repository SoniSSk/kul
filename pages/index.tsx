import { FC } from "react";
import { GetStaticProps } from "next";
import { promises as fs } from "fs";
import Link from "next/link";
import Head from "next/head";

import {
  CATEGORIES_FILE,
  MENUS_FILE,
  Home_File,
  FOOTER_FILE,
} from "../constants/file-paths";
import Menus from "../dtos/Menus.dto";
import MainLayout from "../components/MainLayout";
import CorneredBox from "../components/CorneredBox";
import Text from "../styled/Text";
import GetQouteSection from "../components/GetQouteSection";
import KeenSlider, { KeenSlide } from "../components/KeenSlider";
import ShadowCard from "../styled/ShadowCard";
import Spacer from "../styled/Spacer";
import Button from "../styled/Button";
import HomeCategoryBox from "../components/HomeCategoryBox";
import CircledText from "../styled/CircledText";
import FooterDefinition from "../dtos/Footer.dto";
import useResponsiveDevice from "../components/useResponsiveDevice";

const Home: FC<any> = ({ menus, HomePageData, footer }) => {
  const { isMobile } = useResponsiveDevice();
  const {
    page: { home_page },
  } = HomePageData;
  return (
    <MainLayout
      menus={menus}
      headerBgColorBack="skyBlue"
      isHome
      footer={footer}
    >
      <Head>
        <title>Home &#8211; EzyLegal</title>
      </Head>
      <CorneredBox
        bgColor="skyBlue"
        bgColorBack={isMobile ? "white" : "secondary"}
      >
        {isMobile ? <Spacer size={20} direction="vertical" /> : null}
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 py-md-6 py-2">
              <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
                {home_page.banner.content.title}
              </Text>
              <Spacer size={isMobile ? 5 : 20} direction="vertical" />
              <Text fontSize="lg" weight="semibold" color="gray-900">
                {home_page.banner.content.summary}
              </Text>
              <Spacer size={isMobile ? 20 : 10} direction="vertical" />
              <div>
                {home_page.banner.highlightedCategories.map(
                  (el: any, i: number) => (
                    <div key={i} className="text-center">
                      <Link href={`/category/${el.link}`}>
                        <a>
                          <Button
                            size="lg"
                            rounded
                            className="my-2"
                            variant="default"
                            style={{
                              width: "100%",
                              maxWidth: 400
                            }}
                          >
                            {el.name}
                          </Button>
                        </a>
                      </Link>
                      {/* <Spacer size={20} direction="horizontal" key={i + 1} /> */}
                    </div>
                  )
                )}
              </div>

              {isMobile ? <Spacer size={30} direction="vertical" /> : null}
            </div>
            <div className="col-12 col-md-6">
              <div className="banner_img_s1">
                <img src={home_page.banner.content.image?.sourceUrl} />
              </div>
            </div>
          </div>
        </div>
      </CorneredBox>
      <GetQouteSection bgColorBack="lightSkyBlue" />
      <CorneredBox
        bgColor="lightSkyBlue"
        bgColorBack="white"
        paddingTop="70px"
        paddingBottom="70px"
        className="home_matrix_customBg"
      >
        <div className="container">
          <div className="row">
            {home_page.businessMatrix.map((el: any, i: number) => (
              <div className="col-12 col-md-4 text-center" key={i}>
                <Text
                  fontFamily="montserrat"
                  weight="bold"
                  fontSize="xxxl"
                  className={isMobile ? "text-center mt-4" : ""}
                >
                  {el.counter} <br />
                  {el.heading}
                </Text>
                <Text fontSize="base" weight="semibold">
                  {el.content}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </CorneredBox>
      <section>
        <div className="container">
          <Spacer direction="vertical" size={50} />
          <div style={{ display: "grid", gap: "5.5rem" }}>
            {home_page.cardlist.map((category: any, i: number) => (
              <HomeCategoryBox key={i} category={category} />
            ))}
          </div>
          <Spacer direction="vertical" size={50} />
        </div>
      </section>
      <CorneredBox
        bgColor="skyBlue"
        bgColorBack="white"
        paddingTop="70px"
        paddingBottom="70px"
      >
        <div className="container">
          <div className="row">
            <div className={`col-12 ${isMobile ? "text-left" : "text-center"}`}>
              <Text fontSize="xxxl" fontFamily="montserrat" weight="bold" className="pb40">
                Why Choose Us
              </Text>
              <Spacer direction="vertical" size={20} />
            </div>
            {home_page.whyChooseUs.map((el: any, i: number) => (
              <div className="col-12 col-md-4" key={i}>
                <div className="row">
                  <div className="col-auto">
                    <CircledText fontSize="lg" weight="midbold">
                      {i + 1}
                    </CircledText>
                  </div>
                  <div className="col">
                    <Text fontSize="lg" weight="midbold">
                      {el.title}
                    </Text>
                    <Text fontSize="base" weight="semibold">
                      {el.description}
                    </Text>
                  </div>
                </div>
                {isMobile ? <Spacer size={20} direction="vertical" /> : null}
              </div>
            ))}
          </div>
        </div>
      </CorneredBox>
      <CorneredBox
        bgColor="white"
        bgColorBack="secondary"
        paddingBottom="70px"
        paddingTop="70px"
        className="home_testimonials"
      >
        <div className="container">
          <Text
            fontFamily="montserrat"
            fontSize="xxxl"
            className="text-center mb40"
            weight="bold"
          >
            {home_page.testimonialData.testimonialHeading}
          </Text>
          <Text className="text-center" fontSize="lg" weight="semibold">
            {home_page.testimonialData.testimonialSubHeading}
          </Text>
          <KeenSlider
            loop={true}
            slidesPerView={1}
            showArrows={true}
            spacing={20}
            slideTimer={10000}
            breakpoints={{
              "(min-width: 1200px)": {
                slidesPerView: 2,
              },
            }}
          >
            {home_page.testimonialData.testimonials.map(
              (el: any, i: number) => (
                <KeenSlide key={i}>
                  <ShadowCard>
                    <div className="d-flex align-items-center">
                      <img
                        src={el.profileImage?.sourceUrl}
                        alt="image"
                        className="testimonial_card_img"
                        // width="100"
                      />
                      <div className="ml-2">
                        <Text fontSize="lg" className="mb-0">{el.name}</Text>
                        <Text color="gray-500" fontSize="md" className="mb-0">
                          {el.designation}
                        </Text>
                      </div>
                    </div>
                    <Spacer direction="vertical" size={20} />
                    <Text color="black" fontSize="base" title={el.summary} style={{
                      minHeight: '200px',
                      pointerEvents: "none"
                    }}>
                      {/* {el.summary.substr(0, 300)}
                      {el.summary.length > 300 && "..."} */}
                      {el.summary}
                    </Text>
                    <Spacer direction="vertical" size={8} />
                  </ShadowCard>
                </KeenSlide>
              )
            )}
          </KeenSlider>
        </div>
      </CorneredBox>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // fetch menus
  const menuData = await fs.readFile(MENUS_FILE, { encoding: "utf-8" });
  const menus: Menus = JSON.parse(menuData);

  // fetch categories
  // const categoriesData = await fs.readFile(CATEGORIES_FILE, { encoding: 'utf-8' });
  // const categories: Category[] = JSON.parse(categoriesData);
  // Fetched Home page data
  const Homepage = await fs.readFile(Home_File, { encoding: "utf-8" });
  const HomePageData: any = JSON.parse(Homepage);

  const footerData = await fs.readFile(FOOTER_FILE, { encoding: "utf-8" });
  const footer: FooterDefinition = JSON.parse(footerData);

  return {
    props: {
      menus,
      HomePageData,
      footer,
    },
  };
};

export default Home;
