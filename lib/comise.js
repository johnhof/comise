'use strict';

let co = require('co');

// Yep. thats it.

module.exports = function (func, ctx) {
  return new Promise(function (resolve, reject) {
    co(function *() {
      let result = ctx ? yield func.call(ctx) : yield func;
      resolve(result);
    }).catch((e) => {
      reject(e);
    });
  });
};
