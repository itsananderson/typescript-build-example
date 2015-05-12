/// <reference path='..\harness\harness.ts' />

var test: Function = require("../src/test");

console.log(test);

var assert = require("assert");
describe("hot-code-push", function() {
    it("passes basic tests", function() {
        assert(true, "True should be true");
    });

    it("passes async tests", function(done) {
        setTimeout(function() {
            assert(true, "True should still be true");
            done();
        }, 100);
    });

    it("can call an included function", function() {
        assert.equal(test(), "bar123", "Return from test() should be 'bar123'");
    });
});
