import { FC } from 'react';
import { DeviceTypes } from '../../constants/deviceTypes';
import { FloatingButton } from '../Footer/Footer.styled';
import openWhatsapp from '../../utils/openWhatsapp';

interface WhatsappFooterButtonProps {
  device: DeviceTypes;
}

const WhatsappFooterButton: FC<WhatsappFooterButtonProps> = ({ device }) => {
  return (
    <FloatingButton
      onClick={() => {
        openWhatsapp(device);
      }}
      style={{
        cursor: 'pointer',
      }}
    >
      <img src="/icons/whatsapp.svg" width="34" alt="whatsapp" />
    </FloatingButton>
  );
};

export default WhatsappFooterButton;
