import { GetStaticProps } from 'next';
import { FC } from 'react';
import { promises as fs } from 'fs';
import Link from 'next/link';

import MainLayout from '../components/MainLayout';
import { FOOTER_FILE, MENUS_FILE } from '../constants/file-paths';
import Menus from '../dtos/Menus.dto';
import Text from '../styled/Text';
import Button from '../styled/Button';
import CorneredBox from '../components/CorneredBox';
import Spacer from '../styled/Spacer';
import FooterDefinition from '../dtos/Footer.dto';

interface NotFoundProps {
  menus: Menus;
  footer: FooterDefinition;
}

const NotFound: FC<NotFoundProps> = ({ menus, footer }) => {
  return (
    <MainLayout menus={menus} footer={footer}>
      <CorneredBox
        bgColor="white"
        bgColorBack="secondary"
        paddingTop="70px"
        paddingBottom="70px"
      >
        <div className="container text-center">
          <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
            404
          </Text>
          <Text fontSize="lg" fontFamily="montserrat" weight="bold">
            Page not found!
          </Text>
          <Spacer direction="vertical" size={15} />
          <Link href="/">
            <a>
              <Button size="md" rounded>
                Go to Home
              </Button>
            </a>
          </Link>
        </div>
      </CorneredBox>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // fetch menus
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

export default NotFound;
