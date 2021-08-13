import { FC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { promises as fs } from 'fs';
import { ParsedUrlQuery } from 'querystring';
import Head from 'next/head';

import {
  FOOTER_FILE,
  Home_File,
  JSON_PATH,
  MENUS_FILE,
  PRODUCTS_FILE,
  STILL_HAVE_A_QUESTION_FILE,
} from '../../../../../constants/file-paths';
import Product from '../../../../../dtos/Product.dto';
import Menus from '../../../../../dtos/Menus.dto';
import MainLayout from '../../../../../components/MainLayout';
import Text from '../../../../../styled/Text';
import GetQouteSection from '../../../../../components/GetQouteSection';
import CorneredBox from '../../../../../components/CorneredBox';
import ProductDetail from '../../../../../components/ProductDetail';
import HowWeWork from '../../../../../components/HowWeWork/HowWeWork';
import Breadcrumb, {
  BreadcrumbItem,
} from '../../../../../components/Breadcrumb';
import Spacer from '../../../../../styled/Spacer';
import WhyChooseUsBox from '../../../../../components/WhyChooseUsBox';
import FaqBox from '../../../../../components/FaqBox';
import RelatedProductBox from '../../../../../components/RelatedProductBox';
import ContentsBox from '../../../../../components/ContentsBox';
import productSectionsFilter from '../../../../../utils/productSectionsFilter';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../../../../../redux/cart/cart.actions';
import ProcessStepBox from '../../../../../components/ProcessStepBox';
import RelatedProduct from '../../../../../dtos/RelatedProduct.dto';
import StillHaveQuestion from '../../../../../components/StillHaveQuestions/StillHaveQuestions';
import StillHaveQuestions from '../../../../../dtos/StillHaveQuestions.dto';
import Reviews from '../../../../../components/Reviews/Reviews';
import FooterDefinition from '../../../../../dtos/Footer.dto';
import backendApi from "../../../../../api/backendApi";
import {GET_REVIEWS} from "../../../../../constants/queries/reviews";
import Review from "../../../../../dtos/Review.dto";
import Author from "../../../../../dtos/Author.dto";
import Replies from "../../../../../dtos/Replies.dto";
import WhyChooseUs from "../../../../../dtos/WhyChooseUs.dto";
import getWhyChooseUsData from "../../../../../utils/getWhyChooseUsData";

interface ProductProps {
  product: Product;
  menus: Menus;
  sections: Array<any>;
  categorySlug: string;
  footer: FooterDefinition;
}

const componentsMapper: any = {
  ContentsBox: ContentsBox,
  WhyChooseUsBox: WhyChooseUsBox,
  FaqBox: FaqBox,
  RelatedProductBox: RelatedProductBox,
  ProcessStepBox: ProcessStepBox,
  HowWeWork: HowWeWork,
  Reviews: Reviews,
  StillHaveQuestions: StillHaveQuestion,
};

const ProductPage: FC<ProductProps> = ({
  menus,
  product,
  sections,
  categorySlug,
  footer,
}) => {

  console.log('Product is', product);

  console.log('Menu is', menus);

  console.log('sections is', sections);

  const dispatch = useDispatch();

  useEffect(function (){
    dispatch(emptyCart());
  }, []);

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: 'Home',
      link: '/',
    },
    {
      label: product.category?.name || '',
      link: `/category/${categorySlug}`,
    },
    {
      label: product.name,
      link: null,
    },
  ];

  return (
    <MainLayout menus={menus} footer={footer}>
      <Head>
        <title>{product.name} &#8211; EzyLegal</title>
        {product.seo && (
          <>
            <meta name="robots" content={product.seo.robot} />
            <meta name="description" content={product.seo.description} />
            <meta name="keywords" content={product.seo.keywords} />
          </>
        )}
      </Head>
      <CorneredBox
        bgColor="white"
        bgColorBack="secondary"
        paddingTop="20px"
        paddingBottom="70px"
        mobileBg="white"
        className="mobile-bg-white"
      >
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />
          <Spacer direction="vertical" size={10} />
          <ProductDetail product={product} />
        </div>
      </CorneredBox>
      <GetQouteSection bgColorBack={'skyBlue'} />
      {sections.map((section, i) => {
        const Component = componentsMapper[section.component];
        return (
          <CorneredBox
            key={i}
            bgColor={section.bgColor}
            bgColorBack={section.bgColorBack}
            paddingTop="70px"
            paddingBottom="70px"
          >
            <Component data={section.data} />
          </CorneredBox>
        );
      })}
    </MainLayout>
  );
};

interface Params extends ParsedUrlQuery {
  categorySlug: string;
  productSlug: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // fetch menus
  const menuData = await fs.readFile(MENUS_FILE, { encoding: 'utf-8' });
  const menus: Menus = JSON.parse(menuData);

  try {
    const categorySlug = (params as Params).categorySlug;
    const productSlug = (params as Params).productSlug;
    const newProductData = await fs.readFile(
      `${JSON_PATH}/products/${productSlug}.json`,
      { encoding: 'utf-8' }
    );
    const newProduct: Product = JSON.parse(newProductData);
    const newRelatedProducts: RelatedProduct[] = newProduct.related
      ? newProduct.related
      : [];

    const product: Product = newProduct;

    const stillHaveQuestionsData = await fs.readFile(
      STILL_HAVE_A_QUESTION_FILE,
      { encoding: 'utf-8' }
    );
    const stillHaveQuestions: StillHaveQuestions = JSON.parse(
      stillHaveQuestionsData
    );

    const reviews = await backendApi.post("/", {
      query: GET_REVIEWS,
      variables: {
        slug: productSlug
      }
    });

    const allReviews: Review[] = reviews.data.data.getProductReview.map((reviewItem: any): Review => {
      return {
        id: reviewItem._id,
        content: reviewItem.feedback_text,
        date: reviewItem.updated_at,
        rating: reviewItem.start_rating,
        author: {
          name: (reviewItem.name === null || reviewItem.name === '') ? 'Anonymous User' : reviewItem.name
        }
      }
    })

    newProduct.reviews = allReviews;

    const whyChooseUs: WhyChooseUs[] = getWhyChooseUsData(categorySlug);
    newProduct.product_addition.whyChooseUs = whyChooseUs;

    const sections: any = productSectionsFilter(
      newProduct,
      newRelatedProducts,
      stillHaveQuestions
    );

    const footerData = await fs.readFile(FOOTER_FILE, { encoding: 'utf-8' });
    const footer: FooterDefinition = JSON.parse(footerData);

    return {
      props: {
        product,
        sections,
        menus,
        categorySlug,
        footer,
      },
    };
  } catch (e) {
    console.log("Here in error", e);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // fetch products

  const productsData = await fs.readFile(PRODUCTS_FILE, { encoding: 'utf-8' });
  const products: Product[] = JSON.parse(productsData);

  const paths = products.map((product: Product) => ({
    params: { productSlug: product.slug, categorySlug: product.category?.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default ProductPage;
