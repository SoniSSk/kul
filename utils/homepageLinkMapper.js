"use strict";
exports.__esModule = true;
var openWhatsapp_1 = require("./openWhatsapp");
var homepageLinkMapper = function (homepageData) {
    var _a;
    (_a = homepageData.page.home_page.cardlist) === null || _a === void 0 ? void 0 : _a.forEach(function (cardItem) {
        var _a;
        // if(cardItem.button.link.toLowerCase().includes("whatsapp")){
        //     cardItem.button.link = getWhatsappLink();
        // }
        cardItem.button.link = "/category/" + cardItem.button.link;
        (_a = cardItem.links) === null || _a === void 0 ? void 0 : _a.forEach(function (productItem) {
            productItem.link = cardItem.button.link + "/product/" + productItem.link;
        });
        if (cardItem.subCard) {
            if (cardItem.subCard.button.link.toLowerCase().includes("whatsapp")) {
                cardItem.subCard.button.link = openWhatsapp_1.getWhatsappLink();
            }
            else
                cardItem.subCard.button.link = "/category/" + cardItem.subCard.button.link;
        }
    });
    return homepageData;
};
exports["default"] = homepageLinkMapper;
