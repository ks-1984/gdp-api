'use strict';

var deferred = require('deferred');
var SaleDao = require('nodedb')('GDP', 'SaleDao');
var util = require('../helpers/util');

var saleDao = new SaleDao();

module.exports = {
    list: list,
    save: save,
    remove: remove
};

function list(){
    var df = deferred();
    
    saleDao.list().then(function(result){
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
    saleDao.save(object).then(function(){
        df.resolve();
    }, function(){
        df.reject();
    });
    
    return df.promise;
}

function remove(id) {
    var df = deferred();
    saleDao.remove(id).then(function(){
        df.resolve();
    }, function(){
        df.reject();
    });

    return df.promise;
}
