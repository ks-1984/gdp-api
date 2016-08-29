'use strict';

var httpResponse = require('../helpers/httpResponse');
var saleService = require('./SaleService');

module.exports = {
    listSale: listSale,
    saveSale: saveSale,
    removeSale: removeSale
};

function listSale(req, res, next){
    saleService.list().then(function(result){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result, null, 2));
    });
}

function saveSale(req, res, next){
    var obj = req.swagger.params.saleObject.value;
    
    saleService.save(obj).then(function(){
        res.end("Success");
    }, function(){
        httpResponse.resp500(res, next);
    });
}

function removeSale(req, res, next){
    var id = req.swagger.params.saleId.value;

    saleService.remove(id).then(function(){
        res.end("Success");
    }, function(){
        httpResponse.resp500(res, next);
    });
}
