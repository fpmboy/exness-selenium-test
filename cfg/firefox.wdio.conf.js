let merge = require('deepmerge');
let wdioConf = require('./wdio.conf.js');

exports.config = merge(wdioConf.config, {
    // url where to run test
    baseUrl: 'https://my.exness.com/',
    //
    // list of files to run
    specs: [
        './build/test/specs/firefox.main.js'
    ],
    //
    capabilities: [
        {
            maxInstances: 1,
            browserName: 'firefox'
        }
    ],
    services: ['geckodriver'],
    //
    // OPTIONAL: Arguments passed to geckdriver executable.
    // Note: Do not specify port here, use `port` config option instead.
    // Check geckodriver --help for all options. Example:
    // ['--log=debug', '--binary=/var/ff50/firefox']
    // Default: empty array
    geckoDriverArgs: ['--log=info'],

    // OPTIONAL: Location of geckodriver logs.
    // Must be a directory if using maxInstances > 1.
    // Could be a file name or a directory if maxInstances == 1.
    // Logs are saved as `GeckoDriver-{portname}.txt`
    // Logs are not stored if this option is not set.
    // Default: not set
    geckoDriverLogs: './logs',

    // OPTIONAL: Launch geckodriver once for all specs if true.
    // Launch geckodriver for each spec separately if false.
    // Must be set to false if maxInstances > 1.
    // Default: false
    geckoDriverPersistent: false,

    // OPTIONAL: Use a random port for launching geckodriver.
    // Must be set to true if maxInstances > 1.
    // Set it to false to use the `port` config option.
    // Default: true
    geckoDriverRandomPort: true,

}, { clone: false })