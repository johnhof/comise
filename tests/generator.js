'use strict';

let mocha = require('mocha');
let coMocha = require('co-mocha');
let assert = require('chai').assert;
let comise = require('../lib/comise');

const EXPECT = 'some value';
const ERR = 'Uh Oh';

describe('Generator function tests', () => {

  //
  // Standard promise wrap
  //
  describe('it should allow plain promises', () => {
    it('should resolve with value', function *() {
      let result = yield comise(function *() {
        return EXPECT;
      });

      assert.equal(result, EXPECT);
    });

    it('should reject on error', function *() {
      let error;
      try {
        yield comise(function *() {
          throw Error('Uh Oh');
          return EXPECT;
        });
      } catch (err) {
        error = err;
      }

      assert(error.toString() == ('Error: ' + ERR));
    });
  });

  //
  // Contextual promise wrap
  //
  describe('it should allow contextual promises', (done) => {
    class Foo {
      constructor () {
        this.val = EXPECT;
      }

      succeed() {
        return comise(function *() {
          return this.val;
        }, this);
      }

      fail() {
        return comise(function *() {
          throw Error('Uh Oh');
          return EXPECT;
        }, this);
      }
    }

    it('should resolve with value', function *() {
      let foo = new Foo();
      let result = yield foo.succeed();
      assert.equal(result, EXPECT);
    });

    it('should reject on error', function *() {
      let foo = new Foo();
      let error;
      try {
        yield foo.fail();
      } catch (err) {
        error = err;
      }

      assert(error.toString() == ('Error: ' + ERR));
    });
  });
});
