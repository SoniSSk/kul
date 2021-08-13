import { GetStaticProps } from 'next';
import { FC } from 'react';
import { promises as fs } from 'fs';
import Head from 'next/head';

import MainLayout from '../../components/MainLayout';
import { FOOTER_FILE, MENUS_FILE } from '../../constants/file-paths';
import Menus from '../../dtos/Menus.dto';
import CheckoutBox from '../../components/CheckoutBox';
import FooterDefinition from '../../dtos/Footer.dto';


interface CheckoutProps {
  menus: Menus;
  footer: FooterDefinition;
}

const Checkout: FC<CheckoutProps> = ({ menus, footer }) => {

  return (
    <MainLayout menus={menus} footer={footer}>
      <Head>
        <title>Checkout &#8211; EzyLegal</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>
      <CheckoutBox />
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const menuData = await fs.readFile(MENUS_FILE, { encoding: 'utf-8' });
  const menus: Menus = JSON.parse(menuData);
  const footerData = await fs.readFile(FOOTER_FILE, { encoding: 'utf-8' });
  const footer: FooterDefinition = JSON.parse(footerData);
  return {
    props: {
      menus,
      footer,
    },
  };
};

export default Checkout;
