'use strict';

var httpResponse = require('../helpers/httpResponse');
var priceService = require('./PriceService');

module.exports = {
    listPrice: listPrice,
    savePrice: savePrice,
    removePrice: removePrice
};

function listPrice(req, res, next){
    priceService.list().then(function(result){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result, null, 2));
    });
}

function savePrice(req, res, next){
    var obj = req.swagger.params.priceObject.value;

    priceService.save(obj).then(function(){
        res.end("Success");
    }, function(){
        httpResponse.resp500(res, next);
    });
}

function removePrice(req, res, next){
    var id = req.swagger.params.priceId.value;

    priceService.remove(id).then(function(){
        res.end("Success");
    }, function(){
        httpResponse.resp500(res, next);
    });
}
