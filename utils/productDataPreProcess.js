"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.legalConsultationCategory = void 0;
var priceToInteger_1 = require("./priceToInteger");
var productDataPreProcess = function (productsData) {
    productsData.productTypes = productsData.productTypes.edges.length && productsData.productTypes.edges[0].node.name;
    if (productsData.regularPrice)
        productsData.regularPrice = "" + priceToInteger_1["default"](productsData.regularPrice);
    if (productsData.salePrice)
        productsData.salePrice = "" + priceToInteger_1["default"](productsData.salePrice);
    if (productsData.otherRegularPrice)
        productsData.otherRegularPrice = "" + priceToInteger_1["default"](productsData.otherRegularPrice);
    if (productsData.otherSalePrice)
        productsData.otherSalePrice = "" + priceToInteger_1["default"](productsData.otherSalePrice);
    // variations mapping
    productsData.variations = productsData.variations && productsData.variations.edges.map(function (item) {
        item = item.node;
        item.regularPrice = "" + priceToInteger_1["default"](item.regularPrice);
        item.salePrice = "" + priceToInteger_1["default"](item.salePrice);
        item.otherRegularPrice = "" + priceToInteger_1["default"](item.otherRegularPrice);
        item.otherSalePrice = "" + priceToInteger_1["default"](item.otherSalePrice);
        item.description = item.description && item.description.split(/\r?\n/);
        return item;
    });
    // Upsell product mapping
    productsData.upsell = productsData.upsell && productsData.upsell.edges.map(function (upsell) { return upsell.node; });
    productsData.upsell = productsData.upsell.map(function (upsell) {
        if (upsell.otherRegularPrice)
            upsell.otherRegularPrice = "" + priceToInteger_1["default"](upsell.otherRegularPrice);
        if (upsell.otherSalePrice)
            upsell.otherSalePrice = "" + priceToInteger_1["default"](upsell.otherSalePrice);
        upsell.regularPrice = "" + priceToInteger_1["default"](upsell.regularPrice);
        upsell.salePrice = "" + priceToInteger_1["default"](upsell.salePrice);
        return upsell;
    });
    productsData.reviews = productsData.reviews && productsData.reviews.edges.map(function (productDataReview) {
        return __assign(__assign({}, productDataReview.node), { author: productDataReview.node.author.node, replies: productDataReview.node.replies.edges.map(function (reply) {
                return __assign(__assign({}, reply.node), { author: reply.node.author.node });
            }) });
    });
    productsData.related = productsData.crossSell && productsData.crossSell.edges.map(function (relatedProduct) {
        var _a, _b, _c, _d;
        return __assign(__assign({}, relatedProduct.node), { productTypes: relatedProduct.node.productTypes.edges[0].node.name, regularPrice: relatedProduct.node.regularPrice ? "" + priceToInteger_1["default"](relatedProduct.node.regularPrice) :
                "" + priceToInteger_1["default"]((_a = relatedProduct.node.variations) === null || _a === void 0 ? void 0 : _a.edges[0].node.regularPrice), salePrice: relatedProduct.node.salePrice ? "" + priceToInteger_1["default"](relatedProduct.node.salePrice) :
                "" + priceToInteger_1["default"]((_b = relatedProduct.node.variations) === null || _b === void 0 ? void 0 : _b.edges[0].node.salePrice), otherRegularPrice: relatedProduct.node.otherRegularPrice ? "" + priceToInteger_1["default"](relatedProduct.node.otherRegularPrice) :
                "" + priceToInteger_1["default"]((_c = relatedProduct.node.variations) === null || _c === void 0 ? void 0 : _c.edges[0].node.otherRegularPrice), otherSalePrice: relatedProduct.node.otherSalePrice ? "" + relatedProduct.node.otherSalePrice :
                "" + priceToInteger_1["default"]((_d = relatedProduct.node.variations) === null || _d === void 0 ? void 0 : _d.edges[0].node.otherSalePrice) });
    });
    return productsData;
};
var legalConsultationCategory = function (legalConsultationData) {
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
};
exports.legalConsultationCategory = legalConsultationCategory;
exports["default"] = productDataPreProcess;
