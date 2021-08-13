import Link from "next/link";
import { FC, useLayoutEffect, useState } from "react";

import Button from "../../styled/Button";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";
import { Consultation, Consultation_Width } from "./HomeCatagory.styled";
import openWhatsapp, { getWhatsappLink } from "../../utils/openWhatsapp";
import { DeviceTypes } from "../../constants/deviceTypes";

const HomeCategoryBox: FC<any> = ({ category }) => {
  const className =
    category.direction == "Left"
      ? "col-12 col-md-6"
      : "col-12 col-md-6 order-md-1";

  const [device, setDevice] = useState(DeviceTypes.DESKTOP);

  useLayoutEffect(() => {
    const handleResize = () => {
      setDevice(
        window.innerWidth < 768 ? DeviceTypes.MOBILE : DeviceTypes.DESKTOP
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const isMobile = device === DeviceTypes.MOBILE;
  return (
    <div className="row">
      <div className={className}>
        {category.image && (
          <div className="banner_img_s1">
            <img
              src={category.image?.sourceUrl}
              alt={category.image?.title}
              height="490"
            />
          </div>
        )}
      </div>
      <div className="col-12 col-md-6">
        <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
          {category.heading}
        </Text>
        <Spacer direction="vertical" size={15} />
        <Text fontSize="lg" weight="semibold">
          {category.content}
        </Text>
        <Spacer direction="vertical" size={15} />
        {category.links?.map((product: any, i: number) => (
          <Link key={i} href={`${product.link}`}>
            <a>
              <Button
                color="black"
                backgroundColor="skyBlue"
                size="md"
                className="mb-3 mr-3"
                variant="category"
                rounded
              >
                {product.title}
              </Button>
            </a>
          </Link>
        ))}
        <Link href={`${category.button.link}`}>
          <a className="d-block">
            <Button size="md" className="mb-3 mr-3" variant="category" rounded style={{marginTop: 12}}>
              {category.button.title}
            </Button>
          </a>
        </Link>
        <Consultation>
          <Consultation_Width className={isMobile ? "w-100 text-center" : ""}>
            <Text fontSize="lg" fontFamily="manrope" weight="midbold">
              {category.subCard.title}
            </Text>
            <Text fontSize="md">{category.subCard.content} </Text>
          </Consultation_Width>
          <div className={`mt-3 mt-md-0 ${isMobile ? "w-100" : ""}`}>
            {category.subCard.button.link.toLowerCase().includes("whatsapp") ? (
              <a onClick={() => openWhatsapp(device)}>
                <a>
                  <Button
                    size="md"
                    className={`mb-3 mr-3 ${isMobile ? "btn-block" : ""}`}
                    rounded
                    variant="category"
                  >
                    {category.subCard.button.title}
                  </Button>
                </a>
              </a>
            ) : (
              <Link href={`${category.subCard.button.link}`}>
                <a>
                  <Button
                    size="md"
                    className={`mb-3 mr-3 ${isMobile ? "btn-block" : ""}`}
                    rounded
                    style={{ fontSize: "16px", fontWeight: 600 }}
                  >
                    {category.subCard.button.title}
                  </Button>
                </a>
              </Link>
            )}
          </div>
        </Consultation>
      </div>
    </div>
  );
};

export default HomeCategoryBox;
