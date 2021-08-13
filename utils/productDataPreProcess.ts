import priceToInteger from "./priceToInteger";

const productDataPreProcess = (productsData: any) => {
    productsData.productTypes = productsData.productTypes.edges.length && productsData.productTypes.edges[0].node.name;
    if(productsData.regularPrice) productsData.regularPrice = `${priceToInteger(productsData.regularPrice)}`;
    if(productsData.salePrice) productsData.salePrice = `${priceToInteger(productsData.salePrice)}`;
    if(productsData.otherRegularPrice) productsData.otherRegularPrice = `${priceToInteger(productsData.otherRegularPrice)}`;
    if(productsData.otherSalePrice)  productsData.otherSalePrice = `${priceToInteger(productsData.otherSalePrice)}`;
    // variations mapping
    productsData.variations = productsData.variations && productsData.variations.edges.map((item: any) => {
        item = item.node;
        item.regularPrice = `${priceToInteger(item.regularPrice)}`;
        item.salePrice = `${priceToInteger(item.salePrice)}`;
        item.otherRegularPrice = `${priceToInteger(item.otherRegularPrice)}`;
        item.otherSalePrice = `${priceToInteger(item.otherSalePrice)}`;
        item.description = item.description && item.description.split(/\r?\n/);
        return item;
    });

    // Upsell product mapping
    productsData.upsell = productsData.upsell && productsData.upsell.edges.map((upsell: any) => upsell.node);

    productsData.upsell = productsData.upsell.map((upsell: any) => {
        if(upsell.otherRegularPrice) upsell.otherRegularPrice = `${priceToInteger(upsell.otherRegularPrice)}`;
        if(upsell.otherSalePrice) upsell.otherSalePrice = `${priceToInteger(upsell.otherSalePrice)}`;

        upsell.regularPrice = `${priceToInteger(upsell.regularPrice)}`;
        upsell.salePrice = `${priceToInteger(upsell.salePrice)}`;
        return upsell;
    });

    productsData.reviews = productsData.reviews && productsData.reviews.edges.map((productDataReview: any) => {
        return {
            ...productDataReview.node,
            author: productDataReview.node.author.node,
            replies: productDataReview.node.replies.edges.map((reply: any) => {
                return {
                    ...reply.node,
                    author: reply.node.author.node
                }
            })
        }
    });

    productsData.related = productsData.crossSell && productsData.crossSell.edges.map((relatedProduct: any) => {
        return {
            ...relatedProduct.node,
            productTypes: relatedProduct.node.productTypes.edges[0].node.name,
            regularPrice: relatedProduct.node.regularPrice ? `${priceToInteger(relatedProduct.node.regularPrice)}` :
                `${priceToInteger(relatedProduct.node.variations?.edges[0].node.regularPrice)}`,
            salePrice: relatedProduct.node.salePrice ? `${priceToInteger(relatedProduct.node.salePrice)}` :
                `${priceToInteger(relatedProduct.node.variations?.edges[0].node.salePrice)}`,
            otherRegularPrice: relatedProduct.node.otherRegularPrice ? `${priceToInteger(relatedProduct.node.otherRegularPrice)}` :
                `${priceToInteger(relatedProduct.node.variations?.edges[0].node.otherRegularPrice)}`,
            otherSalePrice: relatedProduct.node.otherSalePrice ? `${relatedProduct.node.otherSalePrice}` :
                `${priceToInteger(relatedProduct.node.variations?.edges[0].node.otherSalePrice)}`
        };
    });
    return productsData;
}

export const legalConsultationCategory = (legalConsultationData: any) => {
    return {
        count: null,
        id: legalConsultationData.id,
        name: legalConsultationData.name,
        description: legalConsultationData.description,
        slug: legalConsultationData.slug,
        link: legalConsultationData.link,
        image: null,
        products: []
    };
}

export default productDataPreProcess;