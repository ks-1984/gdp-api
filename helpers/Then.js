'use strict'

function Then(){};

Then.prototype.then = function(success, fail) {
    this.success = success;
    this.fail = fail;
}

module.exports = Then;