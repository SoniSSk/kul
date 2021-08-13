import Link from "next/link";
import { FC } from "react";

import Category from "../../dtos/Category.dto";
import Product from "../../dtos/Product.dto";
import CrossedText from "../../styled/CrossedText";
import ShadowCard from "../../styled/ShadowCard";
import Spacer from "../../styled/Spacer";
import Text from "../../styled/Text";
import { ShortDescription } from "./CategoryProductBox.styled";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getRegularPrice, getSalePrice } from "../../utils/currencyConverter";

interface CategoryProductBoxProps {
  product: Product;
  category: Category;
}

const CategoryProductBox: FC<CategoryProductBoxProps> = ({
  product,
  category,
}) => {
  const geolocation = useSelector(
    (store: RootState) => store.location.geolocation
  );

  return (
    <div className="col-12 col-md-4 mb-4">
      <Link href={`/category/${category.slug}/product/${product.slug}`}>
        <a className="d-flex h-100 color-inherit">
          <ShadowCard className="w-100 d-flex flex-column justify-content-between">
            <div>
              <Text fontSize="lg" weight="bold">
                {product.name}
              </Text>
              <ShortDescription
                as="div"
                fontSize="md"
                weight="midbold"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                className="mh-auto"
              />
            </div>
            <div>
              <Text inline fontSize="base" weight="midbold">
                {getSalePrice(geolocation, product)}
              </Text>
              <Spacer direction="horizontal" size={8} />
              <CrossedText inline>
                {" "}
                {getRegularPrice(geolocation, product)}{" "}
              </CrossedText>
              <Text block fontSize="md" weight="midbold" color="primary">
                Learn More
              </Text>
            </div>
          </ShadowCard>
        </a>
      </Link>
    </div>
  );
};

export default CategoryProductBox;
