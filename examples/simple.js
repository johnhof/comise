'use strict';

let co = require('co');
let comise = require('../lib/comise');

co(function *() {
  console.log('Before Comise');
  let result = yield comise(function *() {
    console.log('In Comise');
    return '\nIt worked!';
  });
  console.log('After comise');
  console.log(result);

}).catch((err) => { console.log(err); });
