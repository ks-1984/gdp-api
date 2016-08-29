'use strict';

var deferred = require('deferred');
var CustomerDao = require('nodedb')('GDP', 'CustomerDao');
var util = require('../helpers/util');

var customerDao = new CustomerDao();

module.exports = {
    list: list,
    save: save,
    remove: remove
};

function list(){
    var df = deferred();

    customerDao.list().then(function(result){
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
    customerDao.save(object).then(function(){
        df.resolve();
    }, function(){
        df.reject();
    });

    return df.promise;
}

function remove(id) {
    var df = deferred();
    customerDao.remove(id).then(function(){
        df.resolve();
    }, function(){
        df.reject();
    });

    return df.promise;
}
