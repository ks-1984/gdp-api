'use strict';

var deferred = require('deferred');
var ProductDao = require('nodedb')('GDP', 'ProductDao');
var util = require('../helpers/util');

var productDao = new ProductDao();

module.exports = {
    list: list,
    save: save,
    remove: remove
};

function list(){
    var df = deferred();

    productDao.list().then(function(result){
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
    productDao.save(object).then(function(){
        df.resolve();
    }, function(){
        df.reject();
    });

    return df.promise;
}

function remove(id) {
    var df = deferred();
    productDao.remove(id).then(function(){
        df.resolve();
    }, function(){
        df.reject();
    });

    return df.promise;
}
