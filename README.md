# process-cpu-utilization
-----------------------------

The solution is based on `PS` command

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Linux Build][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
![Versions](https://david-dm.org/wyvernnot/process-cpu-utilization.svg)

## Sample Code

## `.cpu(err,value)`

```javascript
var pcu=require('process-cpu-utilization');
pcu.cpu(function(err,value){
 console.log('CPU Usage of this process is %d %% across all processors', value);
});
```

## `.get([Specifier Array],callback)`
 
```javascript
var pcu=require('process-cpu-utilization');
pcu.get(['%cpu'],function(err,data){
 console.log('CPU Usage of this process is %s %%',data['%cpu']);
});
```

## License
MIT

[npm-image]: https://img.shields.io/npm/v/process-cpu-utilization.svg
[npm-url]: https://npmjs.org/package/process-cpu-utilization
[downloads-url]: https://npmjs.org/package/process-cpu-utilization
[downloads-image]: https://img.shields.io/npm/dm/process-cpu-utilization.svg
[travis-image]: https://travis-ci.org/wyvernnot/process-cpu-utilization.svg
[travis-url]: https://travis-ci.org/wyvernnot/process-cpu-utilization
[coveralls-image]: https://img.shields.io/coveralls/wyvernnot/process-cpu-utilization/master.svg
[coveralls-url]: https://coveralls.io/r/wyvernnot/process-cpu-utilization?branch=master
