import { ChangeEvent, FC, useState, useEffect } from "react";

import Button from "../../styled/Button";
import Spacer from "../../styled/Spacer";
import {
  RazorpayCheckoutItem,
  RazorpayCheckoutWrapper,
} from "./RazorpayCheckout.styled";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { errorToast } from "../../utils/toasts";
import useResponsiveDevice from "../useResponsiveDevice";
import Text from "../../styled/Text";
import getEnvironmentVariables from "../../utils/environmentVariables";

const PAYMENT_OPTIONS = {
  GOOGLE_PAY: "GOOGLE_PAY",
  CREDIT_CARD: "CREDIT_CARD",
  NET_BANKING: "NET_BANKING",
  PAYTM: "PAYTM",
};

interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  offer_id: null;
  status: string;
  attempts: number;
  notes: any[];
  created_at: number;
}

interface Prefill {
  name?: string;
  email?: string;
  contact?: string;
}

interface Theme {
  hide_topbar?: boolean;
  color?: string;
  backdrop_color?: string;
}

interface Response {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckoutProps {
  razorpay_key: string | undefined | null;
  prefill?: Prefill | null;
  name?: string;
  description?: string;
  image?: any;
  notes?: any;
  theme?: Theme | null;
  handler(res: Response, orderData: any, isPaytm: boolean): void;
}

declare global {
  interface Window {
    Paytm: any;
  }
}

const RazorpayCheckout: FC<RazorpayCheckoutProps> = ({
  razorpay_key,
  handler,
  ...props
}) => {
  const { isMobile } = useResponsiveDevice();
  const [paymentOption, setPaymentOption] = useState(PAYMENT_OPTIONS.GOOGLE_PAY);
  const { PAYTM_MID, PAYTM_HOST } = getEnvironmentVariables();


  let orderData = useSelector((store: RootState) => store.currentOrders);
  useEffect(function (){
      const timerId = setTimeout(function (){
          window.alert("Session has expired. We will refresh the page");
          window.location.reload();
      }, 10*60*1000);
      return () => clearTimeout(timerId);
  }, []);

  orderData = orderData?.data?.createOrder;
  console.log(orderData);

  const paytmSelectHandler = (id: string, txnToken: string) => {
    const url = `${PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${PAYTM_MID}.js`;
    const scriptElement = document.createElement("script");
    scriptElement.async = true;
    scriptElement.type = "application/javascript";
    scriptElement.src = url;
    scriptElement.onload = () => {
      if (window.Paytm && window.Paytm.CheckoutJS) {
        const config = {
          flow: "DEFAULT",
          hidePaymodeLabel: true,
          data: {
            orderId: id,
            amount: orderData.amount,
            token: txnToken,
            tokenType: "TXN_TOKEN",
          },
          merchant: {
            mid: PAYTM_MID,
            redirect: false,
          },
          handler: {
            notifyMerchant: function (eventType: any, data: any) {
              console.log("notify merchant called", eventType, data);
            },
            transactionStatus: function (data: any) {
              console.log("payment status ", data);
              window.Paytm.CheckoutJS.close();
              if (data.STATUS === "TXN_SUCCESS") {
                data.TXN_TOKEN = txnToken;
                handler(data, orderData, true);
              } else {
                errorToast("Failed to make payment. " + data.RESPMSG);
              }
            },
          },
        };
        window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
          window.Paytm.CheckoutJS.init(config)
            .then(() => {
              window.Paytm.CheckoutJS.invoke();
            })
            .catch((error: any) => {
              console.log(error);
            });
        });
      }
    };

    scriptElement.onerror = (error) => {
      console.log("Failed to load script", error);
    };

    document.body.appendChild(scriptElement);
  };

  const onContinueClick = async () => {
    try {
      const order_id = orderData.razorpay_order_id;
      const amount = orderData.total_amount;
      const currency = orderData.currency;

      console.log("Order id", order_id, amount, currency);

      const options: any = {
        key: razorpay_key,
        amount: amount * 100,
        currency: currency,
        order_id: order_id,
        handler: function (response: any) {
          handler(response, orderData, false);
        },
        ...props,
      };

      if (paymentOption === PAYMENT_OPTIONS.NET_BANKING) {
        options.config = {
          display: {
            blocks: {
              netbanking: {
                name: "Pay via NetBanking",
                instruments: [
                  {
                    method: "netbanking",
                  },
                ],
              },
            },
            sequence: ["block.netbanking"],
            preferences: {
              show_default_blocks: false,
            },
          },
        };
      } else if (paymentOption === PAYMENT_OPTIONS.CREDIT_CARD) {
        options.config = {
          display: {
            blocks: {
              card: {
                name: "Pay via Cards",
                instruments: [
                  {
                    method: "card",
                  },
                ],
              },
            },
            sequence: ["block.card"],
            preferences: {
              show_default_blocks: false,
            },
          },
        };
      } else if (paymentOption === PAYMENT_OPTIONS.GOOGLE_PAY) {
        options.config = {
          display: {
            blocks: {
              upi: {
                name: "Pay Via UPI",
                instruments: [
                  {
                    method: "upi",
                    apps: ["google_pay"],
                    flows: ["qr", "intent", "collect"],
                  },
                ],
              },
            },
            sequence: ["block.upi"],
            preferences: {
              show_default_blocks: false,
            },
          },
        };
      }

      if (paymentOption === PAYMENT_OPTIONS.PAYTM) {
        paytmSelectHandler(
          orderData.paytm_order_id,
          orderData.paytm_transaction_token
        );
      } else {
        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.on("payment.failed", function (response: any) {
          errorToast("Failed to make payment. " + response.error.description);
        });
        paymentObject.open();
      }
    } catch (error) {
      console.log("Payment failed", error);
    }
  };

  const onOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentOption(e.target.value);
  };

  return (
    <>
      <RazorpayCheckoutWrapper>
        <RazorpayCheckoutItem>
          <input
            type="radio"
            name="payment-option"
            value={PAYMENT_OPTIONS.GOOGLE_PAY}
            checked={paymentOption === PAYMENT_OPTIONS.GOOGLE_PAY}
            onChange={onOptionChange}
          />
          <img src="/icons/google-pay.svg" width="150" alt="Google Pay" />
        </RazorpayCheckoutItem>
        <RazorpayCheckoutItem>
          <input
            type="radio"
            name="payment-option"
            value={PAYMENT_OPTIONS.PAYTM}
            checked={paymentOption === PAYMENT_OPTIONS.PAYTM}
            onChange={onOptionChange}
          />
          <img src="/icons/paytm.svg" width="90 " alt="Paytm" />
        </RazorpayCheckoutItem>
        <RazorpayCheckoutItem>
          <input
            type="radio"
            name="payment-option"
            value={PAYMENT_OPTIONS.CREDIT_CARD}
            checked={paymentOption === PAYMENT_OPTIONS.CREDIT_CARD}
            onChange={onOptionChange}
          />
          <div className="d-flex align-items-center">
            <img src="/icons/card.svg" height="38" alt="Credit Card" />
            <Text fontSize="base" weight="semibold" className="mb-0 ml-2">
              Credit/Debit card
            </Text>
          </div>
        </RazorpayCheckoutItem>
        <RazorpayCheckoutItem>
          <input
            type="radio"
            name="payment-option"
            value={PAYMENT_OPTIONS.NET_BANKING}
            checked={paymentOption === PAYMENT_OPTIONS.NET_BANKING}
            onChange={onOptionChange}
          />
          <div className="d-flex align-items-center">
            <img
              src="/icons/netbanking-icon.svg"
              height="38"
              alt="Net Banking"
            />
            <Text fontSize="base" weight="semibold" className="mb-0 ml-2">
              Net Banking
            </Text>
          </div>
        </RazorpayCheckoutItem>
      </RazorpayCheckoutWrapper>
      <Spacer direction="horizontal" size={20} />
      <div>
        <Button
          size="md"
          className={isMobile ? "btn-block" : ""}
          rounded
          onClick={onContinueClick}
          disabled={!paymentOption}
        >
          Continue{" "}
          <img src="/icons/arrow-forward.svg" alt="Continue" width="15" />
        </Button>
      </div>
    </>
  );
};

export default RazorpayCheckout;
