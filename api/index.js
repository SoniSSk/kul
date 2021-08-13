"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var BASE_URL = 'https://cms.ezylegal.in/graphql';
var api = axios_1["default"].create({
    baseURL: BASE_URL
});
exports["default"] = api;
