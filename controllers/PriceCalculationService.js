'use strict';

var deferred = require('deferred');
var PriceDao = require('nodedb')('GDP', 'PriceDao');
var util = require('../helpers/util');

var priceDao = new PriceDao();

module.exports = {
    calculatePrice: calculatePrice
};

function calculatePrice(customer, products){
    var df = deferred();
    var originalPriceList = undefined;
    var priceList = undefined;
    var complete = 0;

    priceDao.findByType(priceDao.TYPE_ORIGINAL).then(function(result){
        if(result && result.length > 0){
            originalPriceList = [];

            for(var i = 0; i < result.length; i++){
                if(originalPriceList[result[i].productId] == undefined){
                    originalPriceList[result[i].productId] = result[i];
                }
                else{
                    var prevDate = new Date(originalPriceList[result[i].productId].createdDate);
                    var currentDate = new Date(result[i].createdDate);
                    var prevType = originalPriceList[result[i].productId].type;

                    if(currentDate.getTime() >= prevDate.getTime()){
                        originalPriceList[result[i].productId] = result[i];
                    }
                }
            }

            complete++;
            calculate(df, complete, originalPriceList, priceList, products);
        }
        else{
            complete++;
            calculate(df, complete, originalPriceList, priceList, products);
        }
    }, function(){
        complete++;
        calculate(df, complete, originalPriceList, priceList, products);
    });

    priceDao.findByCustomer(customer).then(function(result){
        if(result && result.length > 0){
            priceList = [];

            for(var i = 0; i < result.length; i++){
                if(result[i].type != priceDao.TYPE_ORIGINAL){
                    if(priceList[result[i].productId] == undefined){
                        priceList[result[i].productId] = result[i];
                    }
                    else{
                        var prevDate = new Date(priceList[result[i].productId].createdDate);
                        var currentDate = new Date(result[i].createdDate);
                        var prevType = priceList[result[i].productId].type;

                        if(currentDate.getTime() >= prevDate.getTime()){
                            priceList[result[i].productId] = result[i];
                        }
                    }
                }
            }

            complete++;
            calculate(df, complete, originalPriceList, priceList, products);
        }
        else{
            complete++;
            calculate(df, complete, originalPriceList, priceList, products);
        }
    }, function(){
        complete++;
        calculate(df, complete, originalPriceList, priceList, products);
    });

    return df.promise;
}

function calculate(df, complete, originalPriceList, priceList, products){
    if(complete >= 2){
        var price  = 0;

        if(priceList != undefined || originalPriceList != undefined){
            var productList = undefined;

            for(var i = 0; i < products.length; i++){
                if(i == 0){
                    productList = [];
                }

                if(productList[products[i]] == undefined){
                    productList[products[i]] = 1;
                }
                else{
                    productList[products[i]] += 1;
                }
            }

            if(productList != undefined){
                for (var product in productList) {
                    if (productList.hasOwnProperty(product)) {
                        var quantity = productList[product];

                        if(priceList[product] != undefined){
                            if(priceList[product].type == priceDao.TYPE_PRICE){
                                if(quantity >= priceList[product].quantity){
                                    price += priceList[product].price * quantity;
                                    quantity = 0;
                                }
                            }
                            else if(priceList[product].type == priceDao.TYPE_QUANTITY){
                                if(quantity >= priceList[product].quantity){
                                    price += priceList[product].price * parseInt(quantity / priceList[product].quantity);
                                    quantity %= priceList[product].quantity;
                                }
                            }
                        }

                        if(quantity > 0 && originalPriceList[product] != undefined){
                            price += originalPriceList[product].price * quantity;
                        }
                    }
                }

                df.resolve(price);
            }
            else{
                df.resolve(price);
            }
        }
        else{
            df.resolve(price);
        }
    }
}
