/**
 * Created by wyvernnot on 15-4-29.
 */
var pcu = require('../');

var count = 1;
while (process.uptime() < 1) {
    count = 1 - count;
}

pcu.cpu(function (err, value) {
    console.log('CPU Usage of this process is %d %% across all processors', value);
});
pcu.get(['%cpu'], function (err, data) {
    console.log('CPU Usage of this process is %s %%', data['%cpu']);
});
pcu.get(['%mem'], function (err, data) {
    console.log('Memory Usage of this process is %s %%', data['%mem']);
});

pcu.ready(function () {
    console.log('Ready\n');
});