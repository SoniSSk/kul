import {FC} from "react";
import CorneredBox from "../CorneredBox";
import Text from "../../styled/Text";
import SliderInput from "../SliderInput/SliderInput";
import Product from "../../dtos/Product.dto";

interface LegalConsultationPricingProps{
    pricingDetails: any;
    productData: Product;
}

const LegalConsultationPricing: FC<LegalConsultationPricingProps> = ({ productData, pricingDetails}) => {
    return(
        <CorneredBox
            bgColor="skyBlue"
            bgColorBack={"white"}
            paddingTop="35px"
            paddingBottom="35px"
        >
            <div className="container">
                <div className="row">
                    <Text fontFamily="montserrat" fontSize="xxxl" weight="bold">
                        {pricingDetails.heading}
                    </Text>
                </div>
                <div className="row">
                    <div className="col-6 col-md-6">
                        <div className="row">
                            <SliderInput data={productData}/>
                        </div>
                    </div>

                    <div className="col-6 col-md-6 d-flex justify-content-center">
                        <div className="d-flex flex-column justify-content-center align-items-center"
                             style={{
                                 backgroundColor: 'white',
                                 padding: "30px"
                             }}>

                            <img src={pricingDetails.contentBox.rightBox.image ? pricingDetails.contentBox.rightBox.image.sourceUrl :
                                "https://i.ibb.co/34J0Sb6/image-9rightbox.png"} alt="image-9rightbox" width={100} />

                            <Text className="mt-2" fontSize="lg" weight="bold"> {pricingDetails.contentBox.rightBox.title} </Text>

                            {pricingDetails.contentBox.rightBox.descriptionContent.map((content: any, index: number) => {
                                return(
                                    <Text key={`description-${index}`} fontSize="sm">
                                        {content.description}
                                    </Text>
                                );
                            })}

                            <div className="w-100 mt-lg-5">
                                {pricingDetails.contentBox.rightBox.termsConditions.map((termsAndConditions: any, index: number) => {
                                    return(
                                        <Text key={`tc-${index}`} fontSize="xs">
                                            {termsAndConditions.termsConditions}
                                        </Text>
                                    )
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </CorneredBox>
    )
}

export default LegalConsultationPricing;