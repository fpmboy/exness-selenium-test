let merge = require('deepmerge');
let wdioConf = require('./wdio.conf.js');

exports.config = merge(wdioConf.config, {
    // url where to run test
    baseUrl: 'https://my.exness.com/',


    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 2,

    capabilities: [
        {
            browserName: 'chrome',
            acceptInsecureCerts: true,
            outputDir: './logs',
            specs: [
                './build/test/specs/grid.js',
                './build/test/specs/list.js'
            ],
        }
    ],
    services: ['chromedriver']

}, { clone: false })