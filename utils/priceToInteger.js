"use strict";
exports.__esModule = true;
function priceToInteger(price) {
    if (price === null || price === undefined)
        return 0;
    return Number(price.replace(/[^0-9.-]+/g, ""));
}
exports["default"] = priceToInteger;
