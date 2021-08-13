import { FC } from "react";
import Product from "../../dtos/Product.dto";
import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";
import ProductFeature from "../../dtos/ProductFeature.dto";
import ProductCharacteristics from "../../dtos/ProductCharacteristics.dto";
import AddonBox from "./SimpleProduct/AddonBox";
import KeenSlider, {KeenSlide} from "../KeenSlider";
import SocialLinksShare from "../SocialLinksShare/SocialLinksShare";

interface LegalConsultationProductProps{
    product: Product;
};

const LegalConsultationProduct: FC<LegalConsultationProductProps> = ({ product }) => {
    return(
        <div className="row">
            <SocialLinksShare />
            <div className="col-12 col-md-7">
                <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
                    {product.name}
                </Text>
                <Spacer direction="vertical" size={10} />
                <div className="d-flex align-items-center justify-content-lg-start">
                    <img
                        src={
                            "https://i.ibb.co/fNhX2XC/wifi-tethering-24pxonline.png"
                        }
                        alt={'copy'}
                        width={20}
                        className="mr-2"
                    />
                    <Text
                        fontSize="xs"
                        style={{
                            margin: 'unset',
                        }}
                    >
                        120 Lawyers online
                    </Text>
                    <Spacer size={20} direction={'horizontal'} />
                    <img
                        src={
                            "https://i.ibb.co/g9ZB0Rv/call-24pxcalls.png"
                        }
                        alt={'stars'}
                        width={20}
                        className="mr-2"
                    />
                    <Text
                        fontSize="xs"
                        style={{
                            margin: 'unset',
                        }}
                    >
                        8 Calls currently going on
                    </Text>
                </div>

                <Spacer size={10} direction={'vertical'} />
                <Spacer direction="vertical" size={14} />
                <Text
                    fontSize="lg"
                    as="div"
                    dangerouslySetInnerHTML={{ __html: product.description || '' }}
                    weight="normal"
                ></Text>
                <Spacer direction="vertical" size={10} />
                {product.product_addition?.productFeature?.map(
                    (productFeature: ProductFeature, index: number) => {
                        return (
                            <div className="mb-1" key={index}>
                                <img
                                    width={24}
                                    src={productFeature.icon?.sourceUrl}
                                    alt={productFeature.icon?.title}
                                    className="mr-2"
                                />
                                <Text inline fontSize="sm">
                                    {productFeature.description}
                                </Text>
                            </div>
                        );
                    }
                )}

                <Spacer direction="vertical" size={10} />

                <hr
                    style={{
                        marginTop: '1rem',
                        marginBottom: '1rem',
                        border: 0,
                        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                    }}
                />

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        gap: '1.5rem',
                    }}
                >
                    {product.product_addition?.productCharacteristics?.map(
                        (productCharacteristic: ProductCharacteristics, index: number) => {
                            return (
                                <div className="d-flex" key={index}>
                                    <img
                                        src={productCharacteristic.icon?.sourceUrl}
                                        alt={productCharacteristic.icon?.title}
                                        width={35}
                                        className="mr-2"
                                    />

                                    <Text inline color="secondary2" className="mb-0">
                                        {productCharacteristic.label}
                                    </Text>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
            <div className="col-12 col-md-4 mt-5 mt-md-0 ml-5">
                <KeenSlider
                    loop={true}
                    slidesPerView={1}
                    showArrows={false}
                    slideTimer={2000}
                >
                    {product.product_addition?.productBanner?.map((bannerItem: any, index) => {
                        return(
                          <KeenSlide key={`banner-${index}`}>
                              <div className="position-relative">
                                  <img src={bannerItem.image? bannerItem.image.sourceUrl : "https://i.ibb.co/qWHPqv0/Rectangle-37tensed.png"}
                                       width={270}
                                       height={400}
                                       alt="Banner" />
                                  <div style={{
                                      backgroundColor: "white",
                                      zIndex: 100,
                                      width: "270px",
                                      position: 'absolute',
                                      marginTop: "-200px",
                                      padding: "20px 50px 20px 20px",
                                      boxShadow: "-13px 10px 19px -1px rgba(0,0,0,0.29)"
                                  }} className="d-flex flex-column justify-content-center">
                                      <Text fontSize="xs" style={{
                                          backgroundColor: "#FEECC9",
                                          color: "#984F11",
                                          width: "auto"
                                      }}> {bannerItem.bannerTitle1.trim()} </Text>

                                      <Text fontSize="md"> {bannerItem.bannerTitle2} </Text>

                                      <Text fontSize="sm"> {bannerItem.bannerTitle3} </Text>
                                  </div>
                              </div>
                          </KeenSlide>
                        );
                    })}
                </KeenSlider>

            </div>
        </div>
    );
}

export default LegalConsultationProduct;