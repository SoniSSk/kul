import Link from 'next/link';
import { FC, useState } from 'react';

import Category from '../../dtos/Category.dto';
import Button from '../../styled/Button';
import Spacer from '../../styled/Spacer';
import Text from '../../styled/Text';
import { BusinessOfferingsWrapper } from './BusinessOfferingsBox.styled';
import TellUsPopup from '../TellUsPopup';

interface BusinessOfferingsBoxProps {
  categories: Category[] | null;
}

const BusinessOfferingsBox: FC<BusinessOfferingsBoxProps> = ({
  categories,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!categories || !categories.length) return null;
  const filteredCategories = categories.filter(
    (category) => category.products.length > 0
  );
  const classes = `col-12 ${
    filteredCategories.length === 2 ? 'col-md-6' : 'col-md-4'
  }`;
  return (
    <BusinessOfferingsWrapper>
      <div className="container">
        <Text fontSize="xxxl" fontFamily="montserrat" weight="bold">
          All business offerings
        </Text>
        <Spacer direction="vertical" size={20} />
        <div className="row">
          {filteredCategories
            .filter((category) => category.products.length > 0)
            .map((category) => (
              <div key={category.id} className={classes}>
                <Text fontSize="xxyl" weight="midbold">
                  {category.name}
                </Text>
                <Spacer direction="vertical" size={15} />
                {category.products.map((product) => (
                  <Link
                    key={product.id}
                    href={`/category/${category.slug}/product/${product.slug}`}
                  >
                    <a>
                      <Button
                        color="black"
                        size="sm"
                        className="mb-3 mr-3"
                        rounded
                        variant="offering"
                      >
                        {product.name}
                      </Button>
                    </a>
                  </Link>
                ))}
              </div>
            ))}
          <Spacer direction="vertical" size={30} />
        </div>
        <Spacer direction="vertical" size={30} />
        <Text fontSize="lg" weight="midbold">
          If you are not able to Find what you are looking for then
          <Button
            backgroundColor="white"
            size="xl"
            color="primary"
            onClick={handleShow}
          >
            Let us Know
          </Button>
        </Text>
      </div>
      {show? <TellUsPopup show={show} onHide={handleClose} size="lg"/> : null}
    </BusinessOfferingsWrapper>
  );
};

export default BusinessOfferingsBox;
