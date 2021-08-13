import { FC, useMemo } from "react";

import Upsell from "../../../dtos/Upsell.dto";
import CrossedText from "../../../styled/CrossedText";
import Spacer from "../../../styled/Spacer";
import Text from "../../../styled/Text";
import savePercentage from "../../../utils/savePercentage";
import CheckBox from "../../CheckBox";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  getNumericalRegularPrice,
  getNumericalSalePrice,
  getRegularPrice,
  getSalePrice,
} from "../../../utils/currencyConverter";
import useResponsiveDevice from "../../useResponsiveDevice";

interface AddonItemProps {
  addon: Upsell;
  selected: Upsell[];
  setSelected: Function;
}

const AddonItem: FC<AddonItemProps> = ({ addon, selected, setSelected }) => {
  const { isMobile } = useResponsiveDevice();
  const geolocation = useSelector(
    (store: RootState) => store.location.geolocation
  );
  const onCheckboxClick = (e: any) => {
    if (e.target.checked) {
      setSelected([...selected, addon]);
    } else {
      const filtered = selected.filter((item) => item.id !== addon.id);
      setSelected(filtered);
    }
  };

  const isSelected: boolean = useMemo(
    () => selected.findIndex((item) => item.id === addon.id) >= 0,
    [selected, addon]
  );

  return (
    <div className="d-flex flex-wrap ao-form-check mb-2">
      <CheckBox
        name={addon.name}
        checked={isSelected}
        checkChanged={onCheckboxClick}
      >
        <div
          className={
            isMobile
              ? "w-100 d-flex justify-content-between align-items-center"
              : ""
          }
        >
          <Text inline fontSize="base" weight="semibold">
            {addon.name}
          </Text>
          <Spacer direction="horizontal" size={12} />
          <Text fontSize="md" inline color="gray-900" weight="semibold">
            {getSalePrice(geolocation, addon)}
          </Text>
        </div>
      </CheckBox>
      {addon.regularPrice && (
        <div
          className={
            isMobile
              ? "w-100 d-flex justify-content-end align-items-center"
              : ""
          }
        >
          <Spacer direction="horizontal" size={12} />
          <CrossedText fontSize="sm" inline>
            {getRegularPrice(geolocation, addon)}
          </CrossedText>
          <Spacer direction="horizontal" size={12} />
          <Text
            fontSize={isMobile ? "xs" : "sm"}
            inline
            className="text-bg-tinted"
          >
            {savePercentage(
              Number(getNumericalRegularPrice(geolocation, addon)),
              Number(getNumericalSalePrice(geolocation, addon))
            )}
            % off
          </Text>
        </div>
      )}
    </div>
  );
};

export default AddonItem;
