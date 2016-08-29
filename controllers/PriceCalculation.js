'use strict';

var priceCalculationService = require('./PriceCalculationService');

module.exports = {
    calculatePrice: calculatePrice
};

function calculatePrice(req, res, next){
    var obj = req.swagger.params.priceCalculationObject.value;

    priceCalculationService.calculatePrice(obj.customerName, obj.products).then(function(price){
        res.end(price.toString());
    });
}
