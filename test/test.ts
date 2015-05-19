var test: Function = require("../lib/test");
var test2: string = require("../lib/test2");

var assert = require("assert");
describe("hot-code-push", function() {
    it("passes basic tests", function() {
        assert(true, "True should be true");
    });

    it("passes async tests", function(done) {
        setTimeout(function() {
            assert(true, "True should still be true");
            done();
        }, 10);
    });

    it("can call an included function", function() {
        assert.equal(test(), "bar123", "Return from test() should be 'bar123'");
    });

    it("can check the value of test2.ts", function() {
        assert.equal(test2, "bar123", "Value of test2 should be 'bar123'");
    });

    it("can pass a number to test()", function() {
        assert.equal(test(1234), "bar1234", "Return from test(1234) should be 'bar1234'");
    });
});
