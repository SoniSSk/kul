import Product from "../dtos/Product.dto";
import RelatedProduct from "../dtos/RelatedProduct.dto";
import StillHaveQuestions from "../dtos/StillHaveQuestions.dto";

const LEGAL_CONSULTATION_SLUG = 'legal-consultation';

const productSectionsFilter = (product: Product, relatedProducts: Product[] | RelatedProduct[], stillHaveQuestions: StillHaveQuestions) => {
    const sections:Array<any> = [];

    if(product.product_addition.howWeWork?.content?.length){
        sections.push({
            component: "HowWeWork",
            data: product.product_addition.howWeWork
        });
    }

    if (product.product_addition.contents?.content?.length && product.slug !== LEGAL_CONSULTATION_SLUG) {
        sections.push({
            component: 'ContentsBox',
            data: product.product_addition.contents
        });
    }

    if (product.product_addition.benefits?.content?.length && product.slug !== LEGAL_CONSULTATION_SLUG) {
        sections.push({
            component: 'ContentsBox',
            data: product.product_addition.benefits
        });
    }

    if (product.product_addition.prerequisites?.content?.length && product.slug !== LEGAL_CONSULTATION_SLUG) {
        sections.push({
            component: 'ContentsBox',
            data: product.product_addition.prerequisites
        });
    }

    if (product.product_addition.processSteps?.length && product.slug !== LEGAL_CONSULTATION_SLUG) {
        sections.push({
            component: 'ProcessStepBox',
            data: product.product_addition.processSteps
        });
    }



    if (product.product_addition.deliverables?.content?.length && product.slug !== LEGAL_CONSULTATION_SLUG) {
        sections.push({
            component: 'ContentsBox',
            data: product.product_addition.deliverables
        });
    }

    if (product.product_addition.faqs?.length) {
        sections.push({
            component: 'FaqBox',
            data: product.product_addition.faqs
        });
    }


    if (product.product_addition.whyChooseUs?.length) {
        sections.push({
            component: 'WhyChooseUsBox',
            data: product.product_addition.whyChooseUs
        });
    }

    if(product.reviews){
        sections.push({
            component: 'Reviews',
            data: {
                reviews: product.reviews,
                averageRating: product.averageRating,
                slug: product.slug
            }
        })
    }

    sections.push({
        component: 'StillHaveQuestions',
        data: stillHaveQuestions
    });

    if (relatedProducts?.length) {
        sections.push({
            component: 'RelatedProductBox',
            data: relatedProducts
        });
    }

    let sectionColors: any;

    if(!(sections.length&1)){
        sectionColors = {
            '1': {
                bgColor: 'skyBlue',
                bgColorBack: 'white'
            },
            '0': {
                bgColor: 'white',
                bgColorBack: 'skyBlue'
            }
        };
    } else{
        sectionColors = {
            '0': {
                bgColor: 'skyBlue',
                bgColorBack: 'white'
            },
            '1': {
                bgColor: 'white',
                bgColorBack: 'skyBlue'
            }
        };
    }


    
    return sections.map((section, i) => {
        return { ...section, ...sectionColors[String(i % 2)]};
    });
};

export default productSectionsFilter;