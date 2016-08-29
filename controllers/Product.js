'use strict';

var httpResponse = require('../helpers/httpResponse');
var productService = require('./ProductService');

module.exports = {
    listProduct: listProduct,
    saveProduct: saveProduct,
    removeProduct: removeProduct
};

function listProduct(req, res, next){
    productService.list().then(function(result){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result, null, 2));
    });
}

function saveProduct(req, res, next){
    var obj = req.swagger.params.productObject.value;

    productService.save(obj).then(function(){
        res.end("Success");
    }, function(){
        httpResponse.resp500(res, next);
    });
}

function removeProduct(req, res, next){
    var id = req.swagger.params.productId.value;

    productService.remove(id).then(function(){
        res.end("Success");
    }, function(){
        httpResponse.resp500(res, next);
    });
}
