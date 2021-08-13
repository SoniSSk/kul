import { FC } from "react";

import Product from "../../dtos/Product.dto";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";
import StarRating from "../StarRating";
import VariationItem from "./VariationItem";
import ProductFeature from "../../dtos/ProductFeature.dto";
import ProductCharacteristics from "../../dtos/ProductCharacteristics.dto";
import SocialLinksShare from "../SocialLinksShare/SocialLinksShare";
import { OnlyMediaLaptop, OnlySM } from "../../styled/Responsive";
import useResponsiveDevice from "../useResponsiveDevice";

interface VariableProductProps {
  product: Product;
}

const VariableProduct: FC<VariableProductProps> = ({ product }) => {
  const { isMobile } = useResponsiveDevice();
  return (
    <>
      <OnlyMediaLaptop>
        <SocialLinksShare />
      </OnlyMediaLaptop>
      <div className="row">
        <div className="col-12 col-md-10">
          <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
            {product.name}
          </Text>
          <Spacer direction="vertical" size={10} />
          <div
            className={`d-flex justify-content-lg-start ${
              isMobile ? "flex-column" : "align-items-center"
            }`}
          >
            <div className="d-flex align-items-center">
              <img
                src={
                  "https://ezylegal-assets.s3.ap-south-1.amazonaws.com/file_copy_24pxicon1.png"
                }
                alt={"copy"}
                width={20}
                height={20}
                className="mr-2"
              />
              <Text
                fontSize="md"
                weight="bold"
                color="secondary2"
                style={{
                  margin: "unset",
                }}
              >
                {product.category.slug === "documentation"
                  ? "5000+ Documents delivered"
                  : "900 + Registrations Delivered"}
              </Text>
            </div>
            <Spacer
              size={isMobile ? 10 : 20}
              direction={isMobile ? "vertical" : "horizontal"}
            />
            <div className="d-flex align-items-center">
              <img
                src={
                  "https://ezylegal-assets.s3.ap-south-1.amazonaws.com/stars_24pxicon2.png"
                }
                alt={"stars"}
                width={20}
                height={20}
                className="mr-2"
              />
              <Text
                fontSize="md"
                weight="bold"
                color="secondary2"
                style={{
                  margin: "unset",
                }}
              >
                {product.category.slug === "documentation"
                  ? "Trusted By 1000+ Businesses"
                  : "Trusted By 500+ Businesses"}
              </Text>
            </div>
          </div>
          <Spacer direction="vertical" size={14} />
          <Text
            as="div"
            dangerouslySetInnerHTML={{ __html: product.description || "" }}
            fontSize={"lg"}
            weight="400"
            color="secondary2"
          />
        </div>
      </div>
      <Spacer direction="vertical" size={10} />

      {product.product_addition?.productFeature?.map(
        (productFeature: ProductFeature) => {
          return (
            <div className={`d-flex align-items-start mb-1`}>
              <img
                width={24}
                src={productFeature.icon?.sourceUrl}
                alt={productFeature.icon?.title}
                className="mr-2"
              />
              <Text inline fontSize="md" weight="semibold" color="secondary2">
                {productFeature.description}
              </Text>
            </div>
          );
        }
      )}

      <Spacer direction="vertical" size={10} />

      <hr
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          border: 0,
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      />

      <div className="col col-md-9 mb-5">
        <div className="d-flex justify-content-between">
          {product.product_addition?.productCharacteristics?.map(
            (productCharacteristic: ProductCharacteristics) => {
              return (
                <div
                  className={`d-md-flex align-items-center ${
                    isMobile ? "mb-3 text-center" : ""
                  }`}
                >
                  <img
                    src={productCharacteristic.icon?.sourceUrl}
                    alt={productCharacteristic.icon?.title}
                    width={35}
                    className="mr-md-3 image-gray"
                  />
                  {isMobile && <Spacer direction="vertical" size={10} />}
                  <Text
                    inline
                    color="secondary2"
                    className="mb-0"
                    fontSize={isMobile ? "sm" : "base"}
                    weight="semibold"
                  >
                    {productCharacteristic.label}
                  </Text>
                </div>
              );
            }
          )}
        </div>
      </div>
      <OnlySM>
        {product.variations?.length ? (
          <div className="row mb-4">
            {product.variations?.map((variation, i) => (
              <VariationItem
                key={variation.id}
                category={product.category}
                variation={variation}
                className="mb-4"
                productName={product.name}
                isLast={
                  product.variations
                    ? i === product.variations.length - 1
                    : true
                }
              />
            ))}
          </div>
        ) : null}
      </OnlySM>
      <OnlyMediaLaptop>
        {product.variations?.length ? (
          <div className="row">
            {product.variations?.map((variation, i) => (
              <VariationItem
                key={variation.id}
                category={product.category}
                variation={variation}
                productName={product.name}
                isLast={
                  product.variations
                    ? i === product.variations.length - 1
                    : true
                }
              />
            ))}
          </div>
        ) : null}
      </OnlyMediaLaptop>
    </>
  );
};

export default VariableProduct;
