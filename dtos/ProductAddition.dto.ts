import Contents from "./Contents.dto";
import Faq from "./Faq.dto";
import ProcessStep from "./ProcessStep.dto";
import WhyChooseUs from "./WhyChooseUs.dto";
import ProductCharacteristics from "./ProductCharacteristics.dto";
import ProductFeature from "./ProductFeature.dto";
import ProductBanner from "./ProductBanner.dto";
import VerifiedExpertSection from "./VerifiedExpertSection.dto";

export default interface ProductAddition {
    benefits:      Contents;
    contents:      Contents;
    deliverables:  Contents;
    howWeWork?:     Contents;
    faqs:          Faq[] | null;
    prerequisites: Contents;
    processSteps:  ProcessStep[] | null;
    whyChooseUs:   WhyChooseUs[] | null;
    productCharacteristics: ProductCharacteristics[] | null;
    productFeature: ProductFeature[] | null;
    productBanner?: ProductBanner[];
    verifiedexpertsection?: VerifiedExpertSection | null;
}