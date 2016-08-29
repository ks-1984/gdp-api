'use strict';

var deferred = require('deferred');
var PriceDao = require('nodedb')('GDP', 'PriceDao');
var util = require('../helpers/util');

var priceDao = new PriceDao();

module.exports = {
    list: list,
    save: save,
    remove: remove
};

function list(){
    var df = deferred();

    priceDao.list().then(function(result){
        if(result && result.length > 0){
            df.resolve(result);
        }
        else{
            df.resolve([]);
        }
    }, function(){
        df.resolve([]);
    });

    return df.promise;
}

function save(object) {
    var df = deferred();
    priceDao.save(object).then(function(){
        df.resolve();
    }, function(){
        df.reject();
    });

    return df.promise;
}

function remove(id) {
    var df = deferred();
    priceDao.remove(id).then(function(){
        df.resolve();
    }, function(){
        df.reject();
    });

    return df.promise;
}
