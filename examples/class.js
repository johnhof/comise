'use strict';

let co = require('co');
let comise = require('../lib/comise');

class Foo {
  bar() {
    return comise(function *() {
      console.log('In Bar');
      let work = yield this.work();
      console.log('Done With Bar');
      return 'Did ' + work + ' Work';
    }, this);
  }

  work() {
    return comise(function *() {
      process.stdout.write('work.');
      let i = 0;
      for (i = 0; i < 1000; i++) {
        process.stdout.write('.');
      }

      console.log('done');
      return i;
    }, this);
  }
}

co(function *() {
  let foo = new Foo();
  let result = yield foo.bar();
  console.log(result);
}).catch((err) => { console.log(err); });
