import Link from "next/link";
import {FC, useEffect, useState} from "react";

import Variation from "../../dtos/Variation.dto";
import Button from "../../styled/Button";
import CrossedText from "../../styled/CrossedText";
import ShadowCard from "../../styled/ShadowCard";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";
import savePercentage from "../../utils/savePercentage";
import priceToInteger from "../../utils/priceToInteger";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../../redux/cart/cart.actions";
import Category from "../../dtos/Category.dto";
import { RootState } from "../../redux/store";
import {AddedToCartContainer} from "./ProductDetail.styled";
import {
  getNumericalRegularPrice,
  getNumericalSalePrice,
  getRegularPrice,
  getSalePrice,
} from "../../utils/currencyConverter";
import {useRouter} from "next/router";
interface VariationProps {
  variation: Variation;
  isLast: boolean;
  category: Category;
  className?: string;
  productName: string;
}

const VariationItem: FC<VariationProps> = ({
  variation,
  isLast,
  category,
  productName,
  className = "",
}) => {
  const dispatch = useDispatch();
  console.log("Product name", productName);
  const geolocation = useSelector(
    (store: RootState) => store.location.geolocation
  );
  const router = useRouter();
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const cartItems = useSelector((store: RootState) => store.cart.items);

  useEffect(function (){
    if(cartItems.filter((cartItem: any) => variation.id === cartItem.id).length > 0){
      console.log("Already added to cart", cartItems);
      setIsAdded(true);
    } else{
      setIsAdded(false);
    }
    console.log("Cart items is", cartItems);
  }, [cartItems]);

  return (
    <div
      className={`col-lg-4 col-md-6 d-flex mb-3 ${className}`}
      // style={{
      //   paddingRight: isLast ? '20px' : 'unset',
      //   paddingLeft: isLast ? '20px' : 'unset',
      // }}
    >
      <ShadowCard
        backgroundColor={isLast ? "skyBlue" : "lightYellow"}
        bordered
        className="d-flex flex-column justify-content-between"
      >
        <div>
          <Text fontSize="lg" weight="midbold">
            {variation.name.replace(productName + " -", "")}
          </Text>
          <Spacer size={20} direction={"vertical"} />
          {variation.description?.map((item: string) => (
            <div className="d-flex align-items-start pb-1">
              {item.toLowerCase().includes("no") ? (
                <img
                  width="20"
                  src="/icons/remove_circle_24px.svg"
                  alt="icon"
                />
              ) : (
                <img width="20" src="/icons/check_circle_24px.svg" alt="icon" />
              )}
              <div className="ml-2">
                <Text fontSize="md" weight="normal" inline>
                  {item}
                </Text>
              </div>
              <Spacer direction="vertical" size={10} />
            </div>
          ))}
        </div>
        <Spacer direction="vertical" size={10} />

        <div>
          <Text color="brown" fontSize="xxl" weight="midbold" inline>
            {getSalePrice(geolocation, variation)}
          </Text>
          {variation.regularPrice && (
            <>
              <Spacer direction="horizontal" size={8} />
              <CrossedText inline fontSize="base">
                {getRegularPrice(geolocation, variation)}
              </CrossedText>
              <Spacer direction="horizontal" size={8} />
              <Text inline className="text-bg-tinted2">
                {savePercentage(
                  priceToInteger(
                    getNumericalRegularPrice(geolocation, variation)
                  ),
                  priceToInteger(getNumericalSalePrice(geolocation, variation))
                )}
                % off
              </Text>
            </>
          )}
          <Spacer direction="vertical" size={10} />
          {!isAdded ? <Link href="/checkout">
            <a>
              <Button
                size="md"
                rounded
                onClick={() => {
                  const variationData = {
                    ...variation,
                    category: category,
                    price: priceToInteger(variation.price),
                    regularPrice: priceToInteger(variation.regularPrice),
                    salePrice: priceToInteger(variation.salePrice),
                    otherRegularPrice: priceToInteger(
                      variation.otherRegularPrice
                    ),
                    otherSalePrice: priceToInteger(variation.otherSalePrice),
                  };
                  dispatch(addItems([variationData]));
                }}
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                }}
              >
                Buy Service
                <img src="/icons/arrow-forward.svg" alt="Forward" width="18" />
              </Button>
            </a>
          </Link> : <AddedToCartContainer className="d-flex flex-column flex-md-row">
            <div className="d-flex">
              <img width="16" src="/icons/check_circle_24px.svg" alt="icon" style={{
                marginTop: "-8px"
              }}/>
              <Text fontSize="md" className="ml-2"> </Text>
            </div>

            <Button
                size="md"
                rounded
                onClick={() => {
                  router.push("/checkout");
                }}
                style={{
                  fontSize: "0.75em",
                  fontWeight: 700,
                }}
            >
              View Cart
              <img src="/icons/arrow-forward.svg" alt="Forward" width="18" />
            </Button>

          </AddedToCartContainer> }
        </div>
      </ShadowCard>
    </div>
  );
};

export default VariationItem;
