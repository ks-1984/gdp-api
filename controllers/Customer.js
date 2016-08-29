'use strict';

var httpResponse = require('../helpers/httpResponse');
var customerService = require('./CustomerService');

module.exports = {
    listCustomer: listCustomer,
    saveCustomer: saveCustomer,
    removeCustomer: removeCustomer
};

function listCustomer(req, res, next){
    customerService.list().then(function(result){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result, null, 2));
    });
}

function saveCustomer(req, res, next){
    var obj = req.swagger.params.customerObject.value;

    customerService.save(obj).then(function(){
        res.end("Success");
    }, function(){
        httpResponse.resp500(res, next);
    });
}

function removeCustomer(req, res, next){
    var id = req.swagger.params.customerId.value;

    customerService.remove(id).then(function(){
        res.end("Success");
    }, function(){
        httpResponse.resp500(res, next);
    });
}
