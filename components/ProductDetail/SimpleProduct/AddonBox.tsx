import { sumBy } from "lodash";
import { FC, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Product from "../../../dtos/Product.dto";
import Upsell from "../../../dtos/Upsell.dto";
import { addItems } from "../../../redux/cart/cart.actions";
import Button from "../../../styled/Button";
import CrossedText from "../../../styled/CrossedText";
import Divider from "../../../styled/Divider";
import Spacer from "../../../styled/Spacer";
import Text from "../../../styled/Text";
import savePercentage from "../../../utils/savePercentage";
import CheckBox from "../../CheckBox";
import AddonItem from "./AddonItem";
import { AddonBoxWrapper } from "./SimpleProduct.styled";
import priceToInteger from "../../../utils/priceToInteger";
import { RootState } from "../../../redux/store";
import {
  currencySymbol,
  getNumericalRegularPrice,
  getNumericalSalePrice,
  getRegularPrice,
  getSalePrice,
} from "../../../utils/currencyConverter";
import useResponsiveDevice from "../../useResponsiveDevice";
import {AddedToCartContainer} from "../ProductDetail.styled";
import {useRouter} from "next/router";

interface AddonBoxProps {
  product: Product;
}

const AddonBox: FC<AddonBoxProps> = ({ product }) => {
  const { isMobile } = useResponsiveDevice();
  const [selected, setSelected] = useState<Array<Upsell>>([]);
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const geolocation = useSelector(
    (store: RootState) => store.location.geolocation
  );

  const cartItems = useSelector((store: RootState) => store.cart.items);

  useEffect(function (){
    if(cartItems.filter((cartItem: any) => product.id === cartItem.id).length > 0){
      console.log("Already added to cart", cartItems);
      setIsAdded(true);
    } else{
      setIsAdded(false);
    }
    console.log("Cart items is", cartItems);
  }, [cartItems]);

  const router = useRouter();

  useEffect(() => {
    setSelected([product as Upsell]);
  }, [product]);



  const prices = useMemo(() => {
    return {
      totalRegularPrice: sumBy(selected, (o) =>
        Number(getNumericalRegularPrice(geolocation, o))
      ),
      totalSalePrice: sumBy(selected, (o) =>
        Number(getNumericalSalePrice(geolocation, o))
      ),
    };
  }, [selected]);

  const totalSaving = useMemo(() => {
    return {
      totalSaving: Math.round(prices.totalRegularPrice - prices.totalSalePrice),
      totalSavingPer: savePercentage(
        prices.totalRegularPrice,
        prices.totalSalePrice
      ),
    };
  }, [prices]);

  const onBuyClick = () => {
    const selectedItems: Array<any> = selected.map((item: Upsell) => {
      return {
        ...item,
        otherRegularPrice: priceToInteger(item.otherRegularPrice),
        otherSalePrice: priceToInteger(item.otherSalePrice),
        regularPrice: priceToInteger(item.regularPrice),
        salePrice: priceToInteger(item.salePrice),
      };
    });

    dispatch(addItems(selectedItems));
  };

  return (
    <AddonBoxWrapper>
      <div className="d-flex flex-wrap ao-form-check">
        <CheckBox
          name={product.name}
          checked
          readOnly
          checkChanged={() => {}}
          docId={0}
        >
          <div
            className={isMobile ? "w-100 d-flex justify-content-between" : ""}
          >
            <Text fontSize="base" inline weight="bold">
              {product.name}
            </Text>
            <Spacer direction="horizontal" size={12} />
            <Text
              fontSize="base"
              inline
              weight="bold"
              color="korma"
              // className="ml-auto"
            >
              {getSalePrice(geolocation, product)}
            </Text>
          </div>
        </CheckBox>
        {product.regularPrice && (
          <div
            className={
              isMobile
                ? "w-100 d-flex justify-content-end align-items-center"
                : ""
            }
          >
            <Spacer direction="horizontal" size={12} />
            <CrossedText fontSize="sm" inline>
              {getRegularPrice(geolocation, product)}
            </CrossedText>
            <Spacer direction="horizontal" size={12} />
            <Text
              fontSize={isMobile ? "xs" : "sm"}
              weight="normal"
              inline
              className="text-bg-tinted"
            >
              {savePercentage(
                priceToInteger(getNumericalRegularPrice(geolocation, product)),
                priceToInteger(getNumericalSalePrice(geolocation, product))
              )}
              % off
            </Text>
          </div>
        )}
      </div>
      {product.upsell?.length ? (
        <div>
          <Divider margin="15px" color="black" />
          <Text fontSize={isMobile ? "md" : "base"} weight="bold">
            Additional services at attractive discount
          </Text>
          <Spacer direction="vertical" size={15} />
          {product.upsell?.map((addon) => (
            <AddonItem
              key={addon.id}
              addon={addon}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>
      ) : null}

      <Spacer direction="vertical" size={20} />
      <div className={isMobile ? "" : "d-flex align-items-center"}>
        <div className={isMobile ? "d-flex justify-content-between" : ""}>
          <Text weight="bold" inline>
            Total Price
          </Text>
          <Spacer direction="horizontal" size={12} />
          <Text weight="bold" color="korma" fontSize="xl" inline>
            {currencySymbol(geolocation)}
            {isNaN(prices.totalSalePrice)
              ? priceToInteger(
                  getNumericalSalePrice(geolocation, product.salePrice)
                )
              : prices.totalSalePrice}
            {geolocation === "in" ? "/-" : ""}
          </Text>
        </div>
        {totalSaving.totalSaving && (
          <>
            <div className={isMobile ? "text-right" : "ml-2"}>
              <Text color="gray" inline>
                Total Saving
              </Text>
              <Spacer direction="horizontal" size={12} />

              <Text color="gray" inline>
                {currencySymbol(geolocation)} {totalSaving.totalSaving} {geolocation === "in" ? "/-" : ""} (
                {totalSaving.totalSavingPer}% off)
              </Text>
            </div>
          </>
        )}
      </div>

      <Spacer direction="vertical" size={20} />
      {!isAdded ? <Button
          size="md"
          rounded
          onClick={onBuyClick}
          className={isMobile ? "btn-block" : ""}
      >
        Buy Service
        <img src="/icons/arrow-forward.svg" alt="Forward" width="18"/>
      </Button> : <AddedToCartContainer className="d-flex flex-column flex-md-row">
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

      </AddedToCartContainer>}
    </AddonBoxWrapper>
  );
};

export default AddonBox;
