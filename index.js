/**
 * Created by wyvernnot on 15-4-29.
 */

var child_process = require('child_process');
var SPECIFIERS = {};
var _ready = false;
var _beforeReady = [];
var PID = process.pid;
var PROCESSOR_COUNT = require('os').cpus().length;

/**
 * get `ps` version
 *
 * @throw Error if ps command not found
 */
function gatherVersion() {
    child_process.exec('ps --version', function (err, data) {
        if (err) {
            throw new Error('Failed to get ps command version, is it installed ?');
        }
        module.exports.ps.version = data.trim();
        gatherSpecifiers();
    });
}

/**
 * fill in `ps` SPECIFIERS, so they can be used to check illegal specifier
 *
 * @throw Error if `ps L` meets error
 */
function gatherSpecifiers() {
    child_process.exec('ps L', function (err, data) {
        if (err) {
            throw new Error('Abort due to failure to get ps format specifiers');
        }

        var items = data.split('\n');
        items.forEach(function (item) {
            var tuple = item.trim().split(/\s+/);
            if (tuple.length === 2) {
                SPECIFIERS[tuple[0]] = tuple[1];
            }
        });
        module.exports.ps.SPECIFIERS = SPECIFIERS;
        _ready = true;
        _beforeReady.forEach(function (func) {
            func.call();
        });
    });
}


/**
 * leaves out those options not in SPECIFIERS
 *
 * @param {Array} list of specifiers
 * @returns {Array} list of trusted specifiers in lower case
 */
function escape(untrusted) {
    var trusted = [];
    untrusted.forEach(function (option) {
        option = option.toLowerCase();
        if (SPECIFIERS[option]) {
            trusted.push(option);
        } else {
            // FIXME: log a warning message
        }
    });
    return trusted;
}


/**
 * build the command string to be executed
 *
 * @param untrusted untrusted list of specifiers
 * @returns {string}
 */
function buildCommand(untrusted) {
    return 'ps -p ' + parseInt(PID, 10) + ' -o ' + escape(untrusted).join(',') + ' --no-headers';
}


/**
 * build the function, so it can be saved until the module is ready
 *
 * @param options {Array}
 * @param cb {Function}
 * @returns {Function}
 */
function buildFunction(options, cb) {
    return function () {
        require('child_process').exec(buildCommand(options), function (err, data) {
            cb(err, processResult(data, escape(options), cb));
        });
    }
}

/**
 * format the result into an object using specifier as the key
 *
 * @param data {String} row result from command execution
 * @param specifiers {Array} trusted specifiers
 * @returns {Object}
 */
function processResult(data, specifiers, cb) {
    var parts = data.trim().split(/\s+/);
    if (parts.length !== specifiers.length) {
        var error = new Error('PS command result mismatch');
        error.expected = specifiers.length;
        error.actual = parts.length;
        cb.call(error);
    }
    var result = {};
    for (var i = 0; i < specifiers.length; i++) {
        result[specifiers[i]] = parts[i];
    }
    return result;
}

/**
 *
 * @param options
 * @param cb
 */
function get(options, cb) {
    var command = buildFunction(options, cb);
    if (_ready) {
        command.call();
    } else {
        _beforeReady.push(command);
    }
}

gatherVersion();

module.exports = {
    ps: {
        version: 'N/A',
        SPECIFIERS: {}
    },
    get: get,
    ready: function (cb) {
        if (_ready) {
            cb.call();
        } else {
            _beforeReady.push(cb);
        }
    },
    cpu: function (cb) {
        get(['cp'], function (err, data) {
            if (err) {
                cb(err);
            }
            cb(null, parseInt(data['cp'], 10) / PROCESSOR_COUNT / 10);
        })
    }
}

