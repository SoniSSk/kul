import { FC, useState } from "react";

import Product from "../../../dtos/Product.dto";
import Spacer from "../../../styled/Spacer";
import Text from "../../../styled/Text";
import AddonBox from "./AddonBox";
import ProductFeature from "../../../dtos/ProductFeature.dto";
import ProductCharacteristics from "../../../dtos/ProductCharacteristics.dto";
import SocialLinksShare from "../../SocialLinksShare/SocialLinksShare";
import useResponsiveDevice from "../../useResponsiveDevice";

interface SimpleProductProps {
  product: Product;
}

const SimpleProduct: FC<SimpleProductProps> = ({ product }) => {
  const { isMobile } = useResponsiveDevice();
  return (
    <div className="row">
      {!isMobile && <SocialLinksShare />}
      <div className="col-12 col-md-7">
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

        <Spacer size={10} direction={"vertical"} />
        <Spacer direction="vertical" size={14} />
        <Text
          as="div"
          dangerouslySetInnerHTML={{ __html: product.description || "" }}
          fontSize="lg"
          weight="400"
          color="secondary2"
        ></Text>
        <Spacer direction="vertical" size={10} />
        {product.product_addition?.productFeature?.map(
          (productFeature: ProductFeature, index: number) => {
            return (
              <div className="d-flex align-items-start mb-1" key={index}>
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "1.5rem",
          }}
        >
          {product.product_addition?.productCharacteristics?.map(
            (productCharacteristic: ProductCharacteristics, index: number) => {
              return (
                <div
                  className={`d-md-flex align-items-center ${
                    isMobile ? "mb-3 text-center" : ""
                  }`}
                  key={index}
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
      <div className="col-12 col-md-5 mt-5 mt-md-0">
        <AddonBox product={product} />
      </div>
    </div>
  );
};

export default SimpleProduct;
