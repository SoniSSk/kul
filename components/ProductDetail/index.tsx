import { FC } from 'react';

import Product, { ProductTypes } from '../../dtos/Product.dto';
import SimpleProduct from './SimpleProduct';
import VariableProduct from './VariableProduct';
import LegalConsultationProduct from "./LegalConsultationProduct";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: FC<ProductDetailProps> = ({ product }) => {
  if(product.slug === 'legal-consultation'){
    return <LegalConsultationProduct product={product}/>
  }
  switch (product.productTypes) {
    case ProductTypes.Variable:
      return <VariableProduct product={product} />;
    case ProductTypes.Simple:
      return <SimpleProduct product={product} />;
  }
};

export default ProductDetail;
