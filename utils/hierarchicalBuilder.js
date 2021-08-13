"use strict";
exports.__esModule = true;
var lodash_1 = require("lodash");
var hierarchicalBuilder = function (items) {
    var nodes = {};
    var categoryNodes = items.filter(function (obj) {
        var id = obj["id"], parentId = obj["parentId"];
        nodes[id] = lodash_1.defaults(obj, nodes[id], { children: [] });
        parentId && (nodes[parentId] = (nodes[parentId] || { children: [] }))["children"].push(obj);
        return !parentId;
    });
    return categoryNodes.map(function (categoryNode) {
        if (categoryNode.linkRelationship === "blogs" || categoryNode.linkRelationship === "join-our-network")
            categoryNode.url = "/" + categoryNode.linkRelationship;
        else
            categoryNode.url = categoryNode.url = "/category/" + categoryNode.linkRelationship;
        if (categoryNode.children.length) {
            categoryNode.children.forEach(function (subChildNode) {
                if (subChildNode.children.length) {
                    subChildNode.children.forEach(function (productNode) {
                        productNode.url = categoryNode.url + "/product/" + productNode.linkRelationship;
                    });
                }
                if (subChildNode.linkRelationship !== null) {
                    subChildNode.url = categoryNode.url + "/product/" + subChildNode.linkRelationship;
                }
            });
        }
        return categoryNode;
    });
};
exports["default"] = hierarchicalBuilder;
