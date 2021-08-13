import { FC } from 'react';

import Text from '../../styled/Text';
import Spacer from '../../styled/Spacer';
import CrossedText from '../../styled/CrossedText';
import savePercentage from '../../utils/savePercentage';
import {
  PaymentSummaryWrapper,
  StyledDivider,
} from './PaymentSummaryBox.styled';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {currencySymbol} from "../../utils/currencyConverter";

interface TotalSaving {
  totalSaving: number | null;
  totalSavingPer: number | null;
}

interface PaymentSummaryBoxProps {
  items: Array<any>;
  totalSaving: TotalSaving;
  subTotal: number | null;
  taxTotal: number | null;
  totalPrice: number | null;
}

const PaymentSummaryBox: FC<PaymentSummaryBoxProps> = ({
  items,
  totalSaving,
  subTotal,
  taxTotal,
  totalPrice,
}) => {

  const geolocation = useSelector((store: RootState) => store.location.geolocation);

  return (
    <>
      <PaymentSummaryWrapper>
        <Text fontSize="lg">Payment Summary</Text>
        <Spacer direction="vertical" size={20} />
        {items.map((item: any) => {
          return (
            <div key={item.id} className="row">
              <div className="col">
                <Text color="secondary">{item.name}</Text>
              </div>
              <div className="col text-right">
                <Text color="secondary">{currencySymbol(geolocation)} {item.salePrice}</Text>
                {item.regularPrice && (
                  <>
                    <Spacer direction="vertical" size={5} />
                    <CrossedText fontSize="xs" inline>
                      {currencySymbol(geolocation)} {item.regularPrice} /-
                    </CrossedText>
                    <Spacer direction="horizontal" size={8} />
                    <Text color="gray" fontSize="xs" inline>
                      (
                      {savePercentage(
                        Number(item.regularPrice),
                        Number(item.salePrice)
                      )}
                      % off)
                    </Text>
                  </>
                )}
              </div>
            </div>
          );
        })}
        <Spacer direction="vertical" size={25} />
        {subTotal ? (
          <div className="row">
            <div className="col">
              <Text color="secondary2">Sub Total</Text>
            </div>
            <div className="col text-right">
              <Text color="secondary2">{currencySymbol(geolocation)} {subTotal}</Text>
            </div>
          </div>
        ) : null}
        {taxTotal ? (
          <div className="row">
            <div className="col">
              <Text color="secondary2">{geolocation === "in" ? "GST@18%" : "Tax Total"}</Text>
            </div>
            <div className="col text-right">
              <Text color="secondary2">{currencySymbol(geolocation)} {taxTotal}</Text>
            </div>
          </div>
        ) : null}
        {totalSaving.totalSaving ? (
          <div className="row">
            <div className="col">
              <Text color="secondary2">Total Saving</Text>
            </div>
            <div className="col text-right">
              <Text color="secondary2">
                {currencySymbol(geolocation)} {totalSaving.totalSaving}/- ({totalSaving.totalSavingPer}
                % off)
              </Text>
            </div>
          </div>
        ) : null}
        <StyledDivider margin="15px" />
        {totalPrice ? (
          <div className="row">
            <div className="col">
              <Text>Total Price</Text>
            </div>
            <div className="col text-right">
              <Text fontSize="xl" color="brown" weight="bold">
                {currencySymbol(geolocation)} {totalPrice} {geolocation === "in" ? " /-" : ""}
              </Text>
            </div>
          </div>
        ) : null}
      </PaymentSummaryWrapper>
      <Spacer direction="vertical" size={22} />
      <div className="text-center">
      </div>
    </>
  );
};

export default PaymentSummaryBox;
