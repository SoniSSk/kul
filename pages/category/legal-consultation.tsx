import Product from "../../dtos/Product.dto";
import Menus from "../../dtos/Menus.dto";
import FooterDefinition from "../../dtos/Footer.dto";
import StillHaveQuestion from "../../components/StillHaveQuestions/StillHaveQuestions";
import ProcessStepBox from "../../components/ProcessStepBox";
import FaqBox from "../../components/FaqBox";
import {
    FOOTER_FILE,
    LEGAL_CONSULTATION_FILE,
    MENUS_FILE,
    STILL_HAVE_A_QUESTION_FILE
} from "../../constants/file-paths";
import WhyChooseUsBox from "../../components/WhyChooseUsBox";
import {emptyCart} from "../../redux/cart/cart.actions";
import HowWeWork from "../../components/HowWeWork/HowWeWork";
import {GetStaticProps} from "next";
import CorneredBox from "../../components/CorneredBox";
import Head from 'next/head';
import ProductDetail from "../../components/ProductDetail";
import RelatedProductBox from "../../components/RelatedProductBox";
import MainLayout from "../../components/MainLayout";
import Reviews from "../../components/Reviews/Reviews";
import productSectionsFilter from "../../utils/productSectionsFilter";
import ContentsBox from "../../components/ContentsBox";
import {FC, useEffect} from "react";
import Spacer from "../../styled/Spacer";
import {useDispatch} from "react-redux";
import RelatedProduct from "../../dtos/RelatedProduct.dto";
import StillHaveQuestions from "../../dtos/StillHaveQuestions.dto";
import { promises as fs } from 'fs';
import Breadcrumb, {BreadcrumbItem} from "../../components/Breadcrumb";
import LegalConsultationPricing from "../../components/LegalConsultationPricing/LegalConsultationPricing";


interface LegalConsultationProps {
    product: Product;
    menus: Menus;
    sections: Array<any>;
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

const LegalConsultationPage: FC<LegalConsultationProps> = ({
                                           menus,
                                           product,
                                           sections,
                                           footer,
                                       }) => {

    console.log("Data here", product, sections);

    const breadcrumbItems: BreadcrumbItem[] = [
        {
            label: 'Home',
            link: '/',
        },
        {
            label: product.category?.name || '',
            link: null,
        }
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
                bgColorBack="skyBlue"
                paddingTop="20px"
                paddingBottom="70px"
            >
                <div className="container">
                    <Breadcrumb items={breadcrumbItems} />
                    <Spacer direction="vertical" size={10} />
                    <ProductDetail product={product} />
                </div>
            </CorneredBox>
            <LegalConsultationPricing productData={product} pricingDetails={product.getTalkTime}/>
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

export const getStaticProps: GetStaticProps = async () => {
    // fetch menus
    const menuData = await fs.readFile(MENUS_FILE, { encoding: 'utf-8' });
    const menus: Menus = JSON.parse(menuData);

    try {
        const legalConsultationData = await fs.readFile(LEGAL_CONSULTATION_FILE, { encoding: 'utf-8' });

        const legalConsultation: Product = JSON.parse(legalConsultationData);


        const newRelatedProducts: RelatedProduct[] = legalConsultation.related
            ? legalConsultation.related
            : [];

        const product: Product = legalConsultation;

        const stillHaveQuestionsData = await fs.readFile(
            STILL_HAVE_A_QUESTION_FILE,
            { encoding: 'utf-8' }
        );
        const stillHaveQuestions: StillHaveQuestions = JSON.parse(
            stillHaveQuestionsData
        );
        const sections: any = productSectionsFilter(
            legalConsultation,
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
                footer,
            },
        };
    } catch (e) {
        return {
            notFound: true,
        };
    }
};

export default LegalConsultationPage;
