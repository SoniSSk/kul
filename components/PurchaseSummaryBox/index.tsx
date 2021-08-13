import { useState, useMemo, useEffect } from "react";

import CorneredBox from "../CorneredBox";
import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";
import Alert from "../../styled/Alert";
import { StepWrapper } from "./PurchaseSummaryBox.styled";
import CircledText from "../../styled/CircledText";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { sumBy } from "lodash";
import savePercentage from "../../utils/savePercentage";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import OrderPlacedBox from "../OrderPlacedBox/OrderPlacedBox";
import actualPriceCalculator from "../../utils/actualPriceCalculator";
import { useRouter } from "next/router";
import { infoToast } from "../../utils/toasts";
import useResponsiveDevice from "../useResponsiveDevice";
const PurchaseSummaryBox = () => {
  const { isMobile } = useResponsiveDevice();
  const loggedInUser = useSelector((store: RootState) => store.loggedInUser);
  const [tab, setTab] = useState<string>("STEP1");

  const router = useRouter();

  useEffect(function () {
    if (!loggedInUser?._id) {
      router
        .push("/")
        .then(() =>
          infoToast(
            "You cannot access the purchase summary page without logging in"
          )
        );
    }
  }, []);

  return loggedInUser?._id ? (
    <CorneredBox
      bgColor="white"
      bgColorBack="secondary"
      paddingTop="20px"
      paddingBottom="70px"
    >
      <div className="container">
        <Alert>
          <Text fontSize="sm" color="white">
            Thanking you for buying a service with us
          </Text>
        </Alert>
        <Spacer direction="vertical" size={40} />
        <div className="row">
          <div className="col-12 col-md-8">
            {!isMobile ? (
              <StepWrapper>
                <div className="row">
                  <div className="col-auto">
                    <CircledText
                      inline
                      size="sm"
                      color="white"
                      backgroundColor="primary"
                    >
                      1
                    </CircledText>
                    <Spacer direction="horizontal" size={15} />
                    <Text inline color="primary">
                      Fill your Details
                    </Text>
                  </div>
                  {/* <div className="col-auto">
                  <Text inline>-----------</Text>
                </div> */}
                  {tab === "STEP2" ? (
                    <div className="colcol-auto">
                      <CircledText
                        inline
                        color="white"
                        size="sm"
                        backgroundColor="primary"
                      >
                        2
                      </CircledText>
                      <Spacer direction="horizontal" size={15} />
                      <Text inline color="primary">
                        Schedule a Call
                      </Text>
                    </div>
                  ) : (
                    <div className="colcol-auto">
                      <CircledText inline color="primary" size="sm">
                        2
                      </CircledText>
                      <Spacer direction="horizontal" size={15} />
                      <Text inline>Schedule a Call</Text>
                    </div>
                  )}
                </div>
              </StepWrapper>
            ) : null}
            <Spacer direction="vertical" size={40} />
            {tab === "STEP1" ? <Step1 setTab={setTab} /> : <Step2 />}
          </div>

          <div className="col-12 col-md-4">
            <OrderPlacedBox />
          </div>
        </div>
      </div>
    </CorneredBox>
  ) : null;
};

export default PurchaseSummaryBox;
