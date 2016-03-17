'use strict';

let mocha = require('mocha');
let assert = require('chai').assert;
let comise = require('../lib/comise');

const EXPECT = 'some value';
const ERR = 'Uh Oh';

describe('Vanilla function tests', () => {

  //
  // Standard promise wrap
  //
  describe('it should allow plain promises', () => {
    it('should resolve with value', (done) => {
      comise(function *() {
        return EXPECT;
      }).then((result) => {
        assert.equal(result, EXPECT);
        done();
      }).catch((err) => {
        assert.typeOf(err, 'undefined');
        done();
      });
    });

    it('should reject on error', (done) => {
      comise(function *() {
        throw Error('Uh Oh');
        return EXPECT;
      }).then((result) => {
        assert.equal(result, EXPECT);
        done();
      }).catch((err) => {
        assert(err.toString() == ('Error: ' + ERR));
        done();
      });
    });
  });

  //
  // Contextual promise wrap
  //
  describe('it should allow contextual promises', () => {
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

    it('should resolve with value', (done) => {
      let foo = new Foo();
      foo.succeed().then((result) => {
        assert.equal(result, EXPECT);
        done();
      }).catch((err) => {
        assert.typeOf(err, 'undefined');
        done();
      });
    });

    it('should reject on error', (done) => {
      let foo = new Foo();
      foo.fail().then((result) => {
        assert.equal(result, EXPECT);
        done();
      }).catch((err) => {
        assert(err.toString() == ('Error: ' + ERR));
        done();
      });
    });
  });
});
