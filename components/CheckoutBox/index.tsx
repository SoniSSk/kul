import { FC, useMemo, useState, useEffect } from "react";
import { Accordion, Card, Image } from "react-bootstrap";
import {useForm, Controller, set} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { sumBy } from "lodash";

import { RootState } from "../../redux/store";
import { getTaxes } from "../../redux/tax/tax.actions";
import savePercentage from "../../utils/savePercentage";
import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";
import Button from "../../styled/Button";
import RazorpayCheckout from "../RazorpayCheckout";
import RadioBox from "../RadioBox/index";
import PaymentSummaryBox from "../PaymentSummaryBox";
import {
  CheckoutWrapper,
  CardHeader,
  CheckoutCard,
  OffersList,
} from "./CheckoutBox.styled";
import {
  checkout,
  createNewOrder,
  updateAndCheckout,
  updateOrderPaymentStatus,
} from "../../redux/currentOrder/currentOrder.actions";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { errorToast, infoToast } from "../../utils/toasts";
import actualPriceCalculator from "../../utils/actualPriceCalculator";
import useResponsiveDevice from "../useResponsiveDevice";
import { Container } from "react-bootstrap";
import {setLoadingState} from "../../redux/loader/loader.actions";
import getEnvironmentVariables from "../../utils/environmentVariables";
import {getPrices, getSavings} from "../../utils/pricesAndSavingsCalculator";
import {emptyCart} from "../../redux/cart/cart.actions";

export interface CheckoutFormData {
  name: string;
  email: string;
  countryCode: string;
  mobile: string;
  type: string;
}


const CheckoutBox: FC = () => {
  const { isMobile } = useResponsiveDevice();
  const { APP_NAME, RAZORPAY_KEY_ID } = getEnvironmentVariables();

  const [activeKey, setActiveKey] = useState<string>("0");
  const [formData, setFormData] = useState<CheckoutFormData | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((store: RootState) => store.cart);
  const loggedInUser = useSelector((store: RootState) => store.loggedInUser);
  const tax = useSelector((store: RootState) => store.tax);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isUpdateRequested, setIsUpdateRequested] = useState<boolean>(false);
  const geolocation = useSelector(
    (store: RootState) => store.location.geolocation
  );

  const [cartItems, setCartItems] = useState<Array<any>>([]);

  useEffect(
    function () {
      if (cart.items.length === 0) {
        infoToast("Please select a product to proceed.");
        router.push("/");
      }
    },
    [cart]
  );

  useEffect(
    function () {
      if (loggedInUser && loggedInUser._id) {
        setIsLoggedIn(true);
        setFormData({
          name: loggedInUser.name,
          email: loggedInUser.email,
          countryCode: loggedInUser.country_code.toString(),
          type: loggedInUser.user_type,
          mobile: loggedInUser.mobile.toString(),
        });
      }
    },
    [loggedInUser]
  );

  useEffect(
    function () {
      if (isUpdateRequested) {
        setActiveKey("0");
      }
    },
    [isUpdateRequested]
  );

  useEffect(
      function () {
        /*
         * basePrice + rate * basePrice/100 = amount
         * basePrice * (100 + rate)/100 = amount
         * basePrice = floor(100*amount)/(100+rate)
         * */

        if (tax && cart.items.length) {
          setCartItems(actualPriceCalculator(cart.items, tax.rate, geolocation));
        }
      },
      [cart.items, tax]
  );


  useEffect(
    function () {
      if (formData !== null && cartItems && cartItems.length > 0) {
        console.log("Inside", cartItems);
        dispatch(setLoadingState(true));
        dispatch(
          createNewOrder(loggedInUser, cartItems, tax, () => {
            setActiveKey("1");
            dispatch(setLoadingState(false));
          })
        );
      }
    },
    [formData]
  );

  useEffect(() => {
    dispatch(getTaxes(geolocation || "in"));
  }, [geolocation]);


  const prices = useMemo(() => {
    return getPrices(cartItems);
  }, [cartItems, tax]);

  const totalSaving = useMemo(() => {
    return getSavings(prices);
  }, [prices]);

  const updateDetails = () => {
    setIsUpdateRequested(true);
  };

  const checkoutHandler = async (
    response: any,
    orderData: any,
    isPaytm: boolean
  ) => {
    console.log("Here response is", response);

    dispatch(setLoadingState(true));
    if (isPaytm) {
      const data = {
        order_id: orderData._id,
        payment_status: "COMPLETED",
        paytm_order_id: response.ORDERID,
        paytm_transaction_token: response.TXN_TOKEN,
      };

      dispatch(updateOrderPaymentStatus(data, () => {
        dispatch(emptyCart());
        router.replace("/purchase-summary").then(() => dispatch(setLoadingState(false)));
      }));

    } else {
      const data = {
        // orderCreationId: order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
        order_id: orderData._id,
        payment_status: "COMPLETED",
      };

      dispatch(updateOrderPaymentStatus(data, () => {
        router.replace("/purchase-summary").then(() => dispatch(setLoadingState(false)));
      }));
    }
  };

  return (
    <CheckoutWrapper>
      <div className="container">
        <div className="row" style={{
          flexDirection: isMobile ? "column-reverse" : "row"
        }}>
          <div className="col-12 col-md-8">
            <Accordion activeKey={activeKey}>
              <CheckoutCard>
                <CardHeader isSelected={activeKey === "0"}>
                  <Accordion.Toggle as="div" eventKey="0">
                    {activeKey === "0" ? (
                      <Text
                        fontFamily="montserrat"
                        fontSize="lg"
                        color="white"
                        weight="bold"
                      >
                        Fill your Contact Details
                      </Text>
                    ) : (
                      <div
                        className={`d-flex flex-column ${
                          isMobile ? "text-center" : ""
                        }`}
                      >
                        <Text
                          fontFamily="montserrat"
                          color="secondary"
                          weight="bold"
                        >
                          {formData?.name}
                        </Text>
                        <div
                          className={
                            !isMobile
                              ? "d-flex justify-content-between"
                              : "mb-3"
                          }
                        >
                          <div className="d-md-flex align-items-center">
                            <img
                              src="/icons/email_black.svg"
                              alt="Email"
                              width="20"
                            />
                            <Spacer direction="horizontal" size={10} />
                            <Text color="secondary" inline>
                              {formData?.email}
                            </Text>
                            <Spacer direction="horizontal" size={10} />
                            <img
                              src="/icons/phone_black.svg"
                              alt="Phone"
                              width="20"
                            />
                            <Spacer direction="horizontal" size={10} />
                            <Text color="secondary" inline>
                              {formData?.mobile}
                            </Text>
                          </div>

                          <div
                            className={`d-flex align-items-center ${
                              isMobile ? "justify-content-center mt-2" : ""
                            }`}
                          >
                            <img
                              src="https://i.ibb.co/XLZ9FPR/edit-24pxpencil.png"
                              alt="edit-24pxpencil"
                              height={20}
                            />
                            <a
                              style={{
                                color: "#396AE8",
                              }}
                              onClick={updateDetails}
                              className="ml-2"
                            >
                              Edit Details
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </Accordion.Toggle>
                </CardHeader>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {activeKey === "0" ? (
                      <CheckoutForm
                        formData={formData}
                        isUpdateRequested={isUpdateRequested}
                        setFormData={setFormData}
                        setActiveKey={setActiveKey}
                        loggedInUser={loggedInUser}
                        cart={cart}
                        tax={tax}
                        setIsUpdateRequested={setIsUpdateRequested}
                      />
                    ) : (
                      <></>
                    )}
                  </Card.Body>
                </Accordion.Collapse>
              </CheckoutCard>
              <Spacer direction="vertical" size={20} />
              <CheckoutCard>
                <CardHeader isSelected={activeKey === "1"}>
                  <Accordion.Toggle as="div" eventKey="1">
                    <Text
                      fontFamily="montserrat"
                      fontSize="lg"
                      color={activeKey === "1" ? "white" : "secondary"}
                      weight="bold"
                    >
                      Payment Options
                    </Text>
                  </Accordion.Toggle>
                </CardHeader>
                {/* TODO Need to bring in product which is selected for payment */}
                {/* {product.product_addition?.productCharacteristics?.map(
                  (productCharacteristic: ProductCharacteristics) => {
                    return (
                      <div className="d-flex">
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
                )} */}
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <RazorpayCheckout
                      razorpay_key={RAZORPAY_KEY_ID}
                      handler={checkoutHandler}
                      name={APP_NAME}
                      description="Payment for your order"
                      image={"/images/logo.svg"}
                      prefill={{
                        name: formData?.name,
                        contact: formData?.countryCode + " " + formData?.mobile,
                        email: formData?.email,
                      }}
                      theme={{ color: "#396AE8" }}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </CheckoutCard>
            </Accordion>
            <Container>
              <OffersList>
                <li>
                  <Image src="/icons/thumb_up_24px.svg " />
                  <Text weight="semibold" fontSize="base" color="secondary2">
                    100% Satisfaction <br />
                    Guaranteed
                  </Text>
                </li>
                <li>
                  <Image src="/icons/person_outline_24px.svg " />
                  <Text weight="semibold" fontSize="base" color="secondary2">
                    {" "}
                    Dedicated Lawyer <br />
                    available
                  </Text>
                </li>
                <li>
                  <Image src="/icons/bx_bx-run.svg " />
                  <Text weight="semibold" fontSize="base" color="secondary2">
                    {" "}
                    Fastest Delivery <br />
                    Lowest Price
                  </Text>
                </li>
                <li>
                  <Image src="/icons/watch_later_24px.svg " />
                  <Text weight="semibold" fontSize="base" color="secondary2">
                    {" "}
                    24x7 <br />
                    Customer Support
                  </Text>
                </li>
              </OffersList>
            </Container>
          </div>
          <div className="col-12 col-md-4">
            <PaymentSummaryBox
              items={cartItems}
              subTotal={prices.totalSalePrice}
              taxTotal={prices.taxTotal}
              totalSaving={totalSaving}
              totalPrice={prices.totalPrice}
            />
          </div>
        </div>
      </div>
    </CheckoutWrapper>
  );
};

export default CheckoutBox;
