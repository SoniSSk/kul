import { FC } from "react";

import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";
import CrossedText from "../../styled/CrossedText";
import savePercentage from "../../utils/savePercentage";
import { OrderSummaryWrapper, StyledDivider } from "./OrderPlacedBox.styled";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  currencySymbol,
  getNumericalRegularPrice,
  getNumericalSalePrice,
  getRegularPrice,
  getSalePrice,
} from "../../utils/currencyConverter";
import useResponsiveDevice from "../useResponsiveDevice";

const OrderPlacedBox: FC = () => {
  const { isMobile } = useResponsiveDevice();
  const orderData = useSelector((store: RootState) => store.currentOrders);
  const geolocation = useSelector(
    (store: RootState) => store.location.geolocation
  );

  const currentOrder = orderData?.data.createOrder;

  return (
    <>
      {isMobile ? <Spacer size={50} direction="vertical" /> : null}
      <OrderSummaryWrapper>
        <div className="d-flex flex-column justify-content-center align-items-center mb-5">
          <img
            src="https://i.ibb.co/SVZBVvQ/image-26tick.png"
            alt="image-26tick"
          />
          <div
            className={`d-md-flex flex-row justify-content-center align-items-center w-100 mt-3 ${
              isMobile ? "text-center" : ""
            }`}
          >
            <Text fontSize={"md"} weight={"bold"}>
              Your Order Id is
            </Text>
            {!isMobile && <Spacer size={10} direction={"horizontal"} />}
            <Text fontSize={"md"} color={"gray"}>
              {currentOrder._id}
            </Text>
          </div>
          <hr
            style={{
              width: "100%",
            }}
          />
        </div>
        <Text fontSize="lg">Product Summary</Text>
        <Spacer direction="vertical" size={20} />
        {currentOrder?.products.map((item: any) => {
          return (
            <div key={item.id} className="row">
              <div className="col">
                <Text color="secondary">{item.product_name}</Text>
              </div>
              <div className="col text-right">
                <Text color="secondary">{currencySymbol(geolocation)} {item.amount}</Text>
              </div>
            </div>
          );
        })}
        <Spacer direction="vertical" size={25} />
        {currentOrder?.subtotal ? (
          <div className="row">
            <div className="col">
              <Text color="secondary2">Sub Total</Text>
            </div>
            <div className="col text-right">
              <Text color="secondary2">
                {" "}
                {currencySymbol(geolocation)} {currentOrder.subtotal}{" "}
              </Text>
            </div>
          </div>
        ) : null}
        {currentOrder?.tax ? (
          <div className="row">
            <div className="col">
              <Text color="secondary2">
                {geolocation === "in" ? "GST@18%" : "Tax Total"}
              </Text>
            </div>
            <div className="col text-right">
              <Text color="secondary2">
                {currencySymbol(geolocation)} {currentOrder.tax}
              </Text>
            </div>
          </div>
        ) : null}
        {currentOrder?.discount ? (
          <div className="row">
            <div className="col">
              <Text color="secondary2">Total Saving</Text>
            </div>
            <div className="col text-right">
              <Text color="secondary2">
                {currencySymbol(geolocation)} {currentOrder.discount} {geolocation === "in" ? " /-" : ""}
              </Text>
            </div>
          </div>
        ) : null}
        <StyledDivider margin="15px" />
        {currentOrder?.total_amount ? (
          <div className="row">
            <div className="col">
              <Text>Total Price</Text>
            </div>
            <div className="col text-right">
              <Text fontSize="xl" color="brown" weight="bold">
                {currencySymbol(geolocation)} {currentOrder.total_amount} {geolocation === "in" ? " /-" : ""}
              </Text>
            </div>
          </div>
        ) : null}
        <div
          className="d-flex justify-content-end"
          style={{
            marginRight: "-30px",
          }}
        >
          <img
            src="https://i.ibb.co/YhKs6F9/image-27paid.png"
            alt="image-27paid"
          />
        </div>
      </OrderSummaryWrapper>
      <Spacer direction="vertical" size={22} />
      <div className="text-center">
        {/* <div className="d-flex align-items-center justify-content-center">
          <img src="/images/g-pay.png" alt="GPay" height="35" />
          <Spacer direction="horizontal" size={15} />
          <img src="/images/verified-visa.png" alt="Visa" height="35" />
          <Spacer direction="horizontal" size={15} />
          <img src="/images/mastercard.png" alt="Mastercard" height="35" />
          <Spacer direction="horizontal" size={15} />
          <img src="/images/paytm.png" alt="Paytm" height="35" />
        </div> */}
      </div>
    </>
  );
};

export default OrderPlacedBox;
