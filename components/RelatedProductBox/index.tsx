import Link from 'next/link';
import { FC } from 'react';

import Product from '../../dtos/Product.dto';
import CrossedText from '../../styled/CrossedText';
import Spacer from '../../styled/Spacer';
import Text from '../../styled/Text';
import CorneredBox from '../CorneredBox';
import KeenSlider, { KeenSlide } from '../KeenSlider';
import { ShortDescription } from './RelatedProductBox.styled';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {getRegularPrice, getSalePrice} from "../../utils/currencyConverter";
import {useRouter} from "next/router";

interface RelatedProductBoxProps {
  data: Product[];
}

const RelatedProductBox: FC<RelatedProductBoxProps> = ({ data }) => {
  if (!data || !data.length) return null;
  const geolocation = useSelector((store: RootState) => store.location.geolocation);
  const router = useRouter();
  console.log("Related products", data);
  return (
    <div className="container">
      <Text fontFamily="montserrat" fontSize="xxxl" weight="bold">
        Related Services
      </Text>
      <Spacer direction="vertical" size={20} />
      <div className="row">
        <div className="col">
          <KeenSlider
            loop={true}
            slidesPerView={1}
            showArrows={true}
            spacing={20}
            breakpoints={{
              '(min-width: 1200px)': {
                slidesPerView: 2,
              },
            }}
            slideTimer={2000}
          >
            {data.map((product) => (
              <KeenSlide key={product.id}>
                <div
                  style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    width: '100%',
                    height: '100%',
                    cursor: "pointer"
                  }}
                  onClick={() => router.push(`/category/${product.category?.slug}/product/${product.slug}`)}
                >
                  <Text fontSize="lg" weight="midbold">
                    {product.name}
                  </Text>
                  <Spacer direction="vertical" size={8} />
                  <ShortDescription
                    as="div"
                    fontSize="md"
                    weight="midbold"
                    dangerouslySetInnerHTML={{
                      __html: product.shortDescription,
                    }}
                  />
                  <Spacer direction="vertical" size={8} />
                  <Text inline fontSize="base" weight="midbold">
                      {getSalePrice(geolocation, product)}
                  </Text>
                  {product.regularPrice && (
                    <>
                      <Spacer direction="horizontal" size={8} />
                      <CrossedText inline>
                          {getRegularPrice(geolocation, product)}
                      </CrossedText>
                    </>
                  )}
                  <Spacer direction="vertical" size={8} />
                  <Link
                    href={`/category/${product.category?.slug}/product/${product.slug}`}
                  >
                    <a>
                      <Text
                        block
                        fontSize="md"
                        weight="midbold"
                        color="primary"
                      >
                        Learn More
                      </Text>
                    </a>
                  </Link>
                </div>
              </KeenSlide>
            ))}
          </KeenSlider>
        </div>
      </div>
    </div>
  );
};

export default RelatedProductBox;
