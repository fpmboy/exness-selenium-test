let merge = require('deepmerge');
let wdioConf = require('./wdio.conf.js');

exports.config = merge(wdioConf.config, {
    //
    //where to test aka env url
    baseUrl: 'https://my.exness.com/',
    //
    //tests to run
    specs: [
        './build/test/specs/main.js'
    ],
    //
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'chrome',
            acceptInsecureCerts: true,
        }
    ],
    //
    services: ['chromedriver'],

}, { clone: false })