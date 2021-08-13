const savePercentage = (regularPrice: number, salePrice: number) =>
    Math.round((regularPrice - salePrice) / regularPrice * 100);

export default savePercentage;