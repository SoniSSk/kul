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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.fetchData = void 0;
var fs_1 = require("fs");
var lodash_1 = require("lodash");
var api_1 = require("./api");
var file_paths_1 = require("./constants/file-paths");
var graphql_1 = require("./constants/graphql");
var hierarchicalBuilder_1 = require("./utils/hierarchicalBuilder");
var homepageLinkMapper_1 = require("./utils/homepageLinkMapper");
var priceToInteger_1 = require("./utils/priceToInteger");
var productDataPreProcess_1 = require("./utils/productDataPreProcess");
var fetchData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var menuRes, menuData, menuRes2, homepageData, ProductCatagory, termsdata, footer, footerData, privacy, still_have_a_question, legalConsultationData, legalConsultation, productsCategoriesRes, productsCategoriesData, generateProductData, _i, productsCategoriesData_1, productCategory, _a, _b, product, products, blogsCatRes, blogsCat, _c, blogsCat_1, blogCategory, slug, blogCatData, blogPosts, blogRes, blogs, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 35, , 36]);
                // fetch menu
                console.log("Entered here");
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.MENU_QUERY })];
            case 1:
                menuRes = _d.sent();
                menuData = menuRes.data.data.menus.nodes.reduce(function (res, menu) {
                    res[menu.slug] = hierarchicalBuilder_1["default"](menu.menuItems.nodes);
                    return res;
                }, {});
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.MENUS_FILE, JSON.stringify(menuData))];
            case 2:
                _d.sent();
                console.log("Completed menus");
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.Home })];
            case 3:
                menuRes2 = _d.sent();
                homepageData = homepageLinkMapper_1["default"](menuRes2.data.data);
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.Home_File, JSON.stringify(homepageData))];
            case 4:
                _d.sent();
                console.log("Completed homepage");
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.Product_Catagory_Lists })];
            case 5:
                ProductCatagory = _d.sent();
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.Product_Catagory_List, JSON.stringify(ProductCatagory.data.data))];
            case 6:
                _d.sent();
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.Terms_Condition })];
            case 7:
                termsdata = _d.sent();
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.Terms_File, JSON.stringify(termsdata.data.data))];
            case 8:
                _d.sent();
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.FOOTER_QUERY })];
            case 9:
                footer = _d.sent();
                footerData = footer.data.data.page;
                footerData.footer_rightcontainer = {
                    sections: footerData.footer_rightcontainer.sections.sections,
                    secondSections: footerData.footer_rightcontainer.sections.secondSections
                };
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.FOOTER_FILE, JSON.stringify(footer.data.data.page))];
            case 10:
                _d.sent();
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.Privacy_Query })];
            case 11:
                privacy = _d.sent();
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.Privacy_File, JSON.stringify(privacy.data.data))];
            case 12:
                _d.sent();
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.STILL_HAVE_A_QUESTION_QUERY })];
            case 13:
                still_have_a_question = _d.sent();
                still_have_a_question = still_have_a_question.data.data.page.stillHaveAQuestion.content;
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.STILL_HAVE_A_QUESTION_FILE, JSON.stringify(still_have_a_question))];
            case 14:
                _d.sent();
                return [4 /*yield*/, api_1["default"].post('/', {
                        query: graphql_1.PRODUCT_DETAILS_QUERY,
                        variables: {
                            slug: "legal-consultation"
                        }
                    })];
            case 15:
                legalConsultationData = _d.sent();
                console.log("Brought legal consultation data");
                legalConsultation = legalConsultationData.data.data.product;
                legalConsultation = productDataPreProcess_1["default"](legalConsultation);
                legalConsultation.category = productDataPreProcess_1.legalConsultationCategory(legalConsultation);
                console.log("Completed legal consultation data");
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.LEGAL_CONSULTATION_FILE, JSON.stringify(legalConsultation))];
            case 16:
                _d.sent();
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.PRODUCT_CATEGORY_QUERY })];
            case 17:
                productsCategoriesRes = _d.sent();
                productsCategoriesData = productsCategoriesRes.data.data.productCategories.nodes
                    .filter(function (productsCategory) { return productsCategory.slug !== "uncategorized"; })
                    .map(function (productsCategory) {
                    productsCategory.products = productsCategory.products.nodes;
                    productsCategory.products = productsCategory.products.map(function (product) {
                        var _a;
                        // productTypes mapping
                        if (product.regularPrice)
                            product.regularPrice = "" + priceToInteger_1["default"](product.regularPrice);
                        if (product.salePrice)
                            product.salePrice = "" + priceToInteger_1["default"](product.salePrice);
                        product.productTypes = product.productTypes.nodes.length && product.productTypes.nodes[0].name;
                        // variations mapping
                        product.variations = product.variations && product.variations.nodes.map(function (item) {
                            item.regularPrice = "" + priceToInteger_1["default"](item.regularPrice);
                            item.salePrice = "" + priceToInteger_1["default"](item.salePrice);
                            item.description = item.description && item.description.split(/\r?\n/);
                            return item;
                        });
                        if (product.variations && ((_a = product.variations) === null || _a === void 0 ? void 0 : _a.length)) {
                            product.regularPrice = product.variations[0].regularPrice;
                            product.salePrice = product.variations[0].salePrice;
                        }
                        // Upsell product mapping
                        product.upsell = product.upsell && product.upsell.nodes;
                        product.upsell = product.upsell.map(function (upsell) {
                            if (upsell.otherRegularPrice)
                                upsell.otherRegularPrice = "" + priceToInteger_1["default"](upsell.otherRegularPrice);
                            if (upsell.otherSalePrice)
                                upsell.otherSalePrice = "" + priceToInteger_1["default"](upsell.otherSalePrice);
                            upsell.regularPrice = "" + priceToInteger_1["default"](upsell.regularPrice);
                            upsell.salePrice = "" + priceToInteger_1["default"](upsell.salePrice);
                            return upsell;
                        });
                        return product;
                    });
                    return productsCategory;
                });
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.CATEGORIES_FILE, JSON.stringify(productsCategoriesData))];
            case 18:
                _d.sent();
                //
                console.log("Completed Categories files");
                generateProductData = function (productCategory, product) { return __awaiter(void 0, void 0, void 0, function () {
                    var productId, productsDetails, productsData, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                productId = product.slug;
                                console.log("Generating for product ", productId);
                                return [4 /*yield*/, api_1["default"].post('/', {
                                        query: graphql_1.PRODUCT_DETAILS_QUERY,
                                        variables: {
                                            slug: productId
                                        }
                                    })];
                            case 1:
                                productsDetails = _a.sent();
                                productsData = productsDetails.data.data.product;
                                productsData.category = __assign(__assign({}, productCategory), { products: [] });
                                // productTypes mapping
                                productsData = productDataPreProcess_1["default"](productsData);
                                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.JSON_PATH + "/products/" + productId + ".json", JSON.stringify(productsData))];
                            case 2:
                                _a.sent();
                                console.log("Fetched data for product ", productId);
                                return [3 /*break*/, 4];
                            case 3:
                                error_2 = _a.sent();
                                console.log(error_2);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); };
                _i = 0, productsCategoriesData_1 = productsCategoriesData;
                _d.label = 19;
            case 19:
                if (!(_i < productsCategoriesData_1.length)) return [3 /*break*/, 24];
                productCategory = productsCategoriesData_1[_i];
                _a = 0, _b = productCategory.products;
                _d.label = 20;
            case 20:
                if (!(_a < _b.length)) return [3 /*break*/, 23];
                product = _b[_a];
                return [4 /*yield*/, generateProductData(productCategory, product)];
            case 21:
                _d.sent();
                _d.label = 22;
            case 22:
                _a++;
                return [3 /*break*/, 20];
            case 23:
                _i++;
                return [3 /*break*/, 19];
            case 24:
                products = lodash_1.flatMap(productsCategoriesData, function (_a) {
                    var products = _a.products, value = __rest(_a, ["products"]);
                    return products.map(function (product) { return (__assign(__assign({}, product), { category: value })); });
                });
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.PRODUCTS_FILE, JSON.stringify(products))];
            case 25:
                _d.sent();
                return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.BLOG_CATEGORY_QUERY })];
            case 26:
                blogsCatRes = _d.sent();
                blogsCat = blogsCatRes.data.data.categories.nodes;
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.BLOG_CATEGORIES_FILE, JSON.stringify(blogsCat))];
            case 27:
                _d.sent();
                _c = 0, blogsCat_1 = blogsCat;
                _d.label = 28;
            case 28:
                if (!(_c < blogsCat_1.length)) return [3 /*break*/, 32];
                blogCategory = blogsCat_1[_c];
                slug = blogCategory.slug;
                return [4 /*yield*/, api_1["default"].post("/", {
                        query: graphql_1.BLOG_POSTS_BY_CATEGORY,
                        variables: {
                            slug: slug
                        }
                    })];
            case 29:
                blogCatData = _d.sent();
                blogPosts = blogCatData.data.data.category.posts.edges.map(function (blogPost) {
                    return __assign(__assign({}, blogPost.node), { categories: blogPost.node.categories.edges.map(function (category) { return category.node; }), author: blogPost.node.author.node, featuredImage: blogPost.node.featuredImage.node, tags: blogPost.node.tags.edges.map(function (tag) { return tag.node; }) });
                });
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.BLOG_POST_BY_CATEGORIES_FILE + "/" + slug + ".json", JSON.stringify(blogPosts))];
            case 30:
                _d.sent();
                _d.label = 31;
            case 31:
                _c++;
                return [3 /*break*/, 28];
            case 32: return [4 /*yield*/, api_1["default"].post('/', { query: graphql_1.BLOG_QUERY })];
            case 33:
                blogRes = _d.sent();
                blogs = blogRes.data.data.posts.nodes.map(function (blog) {
                    blog.tags = blog.tags.nodes;
                    blog.categories = blog.categories.nodes;
                    blog.author = blog.author && blog.author.node;
                    blog.featuredImage = blog.featuredImage && blog.featuredImage.node;
                    return blog;
                });
                return [4 /*yield*/, fs_1.promises.writeFile(file_paths_1.BLOGS_FILE, JSON.stringify(blogs))];
            case 34:
                _d.sent();
                return [2 /*return*/, "Data fetched"];
            case 35:
                error_1 = _d.sent();
                throw error_1;
            case 36: return [2 /*return*/];
        }
    });
}); };
exports.fetchData = fetchData;
console.log("Staring fetch data");
exports.fetchData()
    .then(console.log)["catch"](console.log);
