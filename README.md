# comise

[![Build Status](https://travis-ci.org/johnhof/comise.svg?branch=master)](https://travis-ci.org/johnhof/comise)

Promises + Co

# Usage

### Simple

```javascript
let co = require('co');
let comise = require('comise');

co(function *() {
  let result = yield comise(function *() {
    return 'It worked!';
  });

  console.log(result); // It worked!
});
```

### Context Binding

```javascript
'use strict';

let co = require('co');
let comise = require('../lib/comise');

class Foo {
  bar() {
    return comise(function *() {
      let work = yield this.work();
      return 'Did ' + work + ' Work';
    }, this);
  }

  work() {
    return comise(function *() {
      let i = 0;
      for (i = 0; i < 1000; i++) {}
      return i;
    }, this);
  }
}

co(function *() {
  let foo = new Foo();
  let result = yield foo.bar();
  console.log(result); // Did 1000 Work
}).catch((err) => { console.log(err); });
```
