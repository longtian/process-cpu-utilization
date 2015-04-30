/**
 * Created by wyvernnot on 15-4-29.
 */

var pcu = require('../');
var assert = require('assert');

describe('Process-cpu-utilization', function () {
    it('should work', function (done) {
        pcu.get(['%cpu', '%mem'], function (err, data) {
            assert.equal(Object.keys(data).length, 2);
            assert.ok(data['%cpu']);
            done();
        });
    });
    it('should work for virtual memory size', function (done) {
        pcu.get(['vsize'], function (err, data) {
            done();
        });
    });
    it('should work for virtual memory size', function (done) {
        pcu.get(['vsize'], function (err, data) {
            done();
        });
    });

    it('should work for CPU', function (done) {
        pcu.cpu(function (err, percentage) {
            console.log(arguments);
            done();
        });
    });
});