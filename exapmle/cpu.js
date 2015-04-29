/**
 * Created by wyvernnot on 15-4-29.
 */
var pcu = require('../');
pcu.get(['%cpu'], function (err, data) {
    console.log('CPU Usage of this process is %s %%', data['%cpu']);
});
pcu.get(['%mem'], function (err, data) {
    console.log('Memory Usage of this process is %s %%', data['%mem']);
});