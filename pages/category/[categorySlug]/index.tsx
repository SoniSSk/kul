import { FC } from "react";
import { find } from "lodash";
import { GetStaticPaths, GetStaticProps } from "next";
import { promises as fs } from "fs";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";

import {
  CATEGORIES_FILE,
  FOOTER_FILE,
  MENUS_FILE,
} from "../../../constants/file-paths";
import Category from "../../../dtos/Category.dto";
import Menus from "../../../dtos/Menus.dto";
import MainLayout from "../../../components/MainLayout";
import CorneredBox from "../../../components/CorneredBox";
import Breadcrumb, { BreadcrumbItem } from "../../../components/Breadcrumb";
import Text from "../../../styled/Text";
import GetQouteSection from "../../../components/GetQouteSection";
import Spacer from "../../../styled/Spacer";
import CategoryProductBox from "../../../components/CategoryProductBox";
import BusinessOfferingsBox from "../../../components/BusinessOfferingsBox";
import WhyChooseUsBox from "../../../components/WhyChooseUsBox";
import FooterDefinition from "../../../dtos/Footer.dto";
import useResponsiveDevice from "../../../components/useResponsiveDevice";
import getWhyChooseUsData from "../../../utils/getWhyChooseUsData";

interface CategoryProps {
  category: Category;
  menus: Menus;
  categories: Category[];
  footer: FooterDefinition;
}

const CategoryPage: FC<CategoryProps> = ({
  category,
  menus,
  categories,
  footer,
}) => {
  const { isMobile } = useResponsiveDevice();
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: category.name,
      link: null,
    },
  ];

  // TODO Get data from CMS instead of hardcoding it
  const whyChooseUs = getWhyChooseUsData(category.slug);


  return (
    <MainLayout menus={menus} isHome footer={footer}>
      <Head>
        <title>{category.name} &#8211; EzyLegal</title>
      </Head>
      <CorneredBox
        bgColor="white"
        bgColorBack={isMobile ? "white" : "secondary"}
        paddingTop="20px"
        paddingBottom="70px"
      >
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />
          <Spacer direction="vertical" size={10} />
          <div className="row">
            <div className="col-12">
              <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
                {category.slug === "documentation" ? "Your customers expect excellence. Let your contracts speak it." :
                    "We can help you setup your Business for success"}
              </Text>
            </div>
          </div>
          <Spacer direction="vertical" size={20} />
          <div className="row">
            {category.products.map((product) => (
              <CategoryProductBox
                key={product.id}
                product={product}
                category={category}
              />
            ))}
          </div>
        </div>
      </CorneredBox>
      <GetQouteSection />
      <BusinessOfferingsBox categories={categories} />
      <CorneredBox
        bgColor="skyBlue"
        bgColorBack="darkBlue"
        paddingTop="70px"
        paddingBottom="70px"
      >
        <WhyChooseUsBox data={whyChooseUs} />
      </CorneredBox>
    </MainLayout>
  );
};

interface Params extends ParsedUrlQuery {
  categorySlug: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // fetch menus
  const menuData = await fs.readFile(MENUS_FILE, { encoding: "utf-8" });
  const menus: Menus = JSON.parse(menuData);

  // fetch categories
  const categorisData = await fs.readFile(CATEGORIES_FILE, {
    encoding: "utf-8",
  });
  const categories: Category[] = JSON.parse(categorisData);

  const category = find(
    categories,
    (category: Category) => category.slug === (params as Params).categorySlug
  );

  const footerData = await fs.readFile(FOOTER_FILE, { encoding: "utf-8" });
  const footer: FooterDefinition = JSON.parse(footerData);

  return {
    props: {
      category,
      menus,
      categories,
      footer,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // fetch categories
  const categoryData = await fs.readFile(CATEGORIES_FILE, {
    encoding: "utf-8",
  });
  const categories: Category[] = JSON.parse(categoryData);

  const paths = categories
    .filter((category: any) => category.slug !== "legal-consultation")
    .map((category: any) => ({
      params: { categorySlug: category.slug },
    }));

  return {
    paths,
    fallback: false,
  };
};

export default CategoryPage;
