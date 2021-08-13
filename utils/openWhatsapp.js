"use strict";
exports.__esModule = true;
exports.getWhatsappLink = void 0;
var contactInformation_1 = require("../constants/contactInformation");
var deviceTypes_1 = require("../constants/deviceTypes");
function getInternationalFormattedNum() {
    return contactInformation_1.contactNumber
        .replace("+", "")
        .replace("-", "")
        .split(" ")
        .join("");
}
function openWhatsapp(device) {
    var internationalFormattedNum = getInternationalFormattedNum();
    console.log(contactInformation_1.contactNumber, internationalFormattedNum);
    if (device === deviceTypes_1.DeviceTypes.DESKTOP)
        window.open("https://web.whatsapp.com/send?phone=" + internationalFormattedNum);
    else
        window.open("https://api.whatsapp.com/send?phone=" + internationalFormattedNum);
}
exports["default"] = openWhatsapp;
function getWhatsappLink() {
    var internationalFormattedNum = getInternationalFormattedNum();
    return "https://web.whatsapp.com/send?phone=" + internationalFormattedNum;
}
exports.getWhatsappLink = getWhatsappLink;
