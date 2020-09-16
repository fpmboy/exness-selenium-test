# Exness selenium webUI assessment task

#### User Story:
As a user, I want to be able to archive a demo account and validate the account is archived.

#### Your task:
We would like to see your own tests which cover the user story mentioned above.

## Dependencies
- nodejs
- npm
- package.json
    * "@types/mocha" - typings for test runner mocha
    * "@wdio/cli" - wdio main engine https://webdriver.io/
    * "@wdio/local-runner" - local executor of tests
    * "@wdio/mocha-framework" - service to match mocha and wdio
    * "@wdio/spec-reporter" - console reporter generating results 
    * "@wdio/sync" - module to execute commands in synchronous way
    * "chromedriver" - driver to communicate with Chrome
    * "deepmerge" - module to merge json cfg files
    * "geckodriver" - driver to communicate with Firefox
    * "mocha" - main engine https://mochajs.org/
    * "ts-node" - service for typescript
    * "typescript" - framework implementing types in js
    * "wdio-chromedriver-service" - service to automatically start chromedriver
    * "wdio-geckodriver-service" - service to automatically start geckodriver

## Install process
System should have installed Google Chrome and Firefox. Also globally installed **nodejs** and **npm**
```
npm install
```
Was develop with
```
node -v
v12.18.2

npm -v
6.14.8
```

## Execute tests
Check **scripts** sections in *package.json*

To start tests type in console
```
npm run tests-chrome-prod
npm run tests-firefox-prod
npm run tests-parallel-prod
```

## Implemented features
### Your automation solution can include:

* #### logging
Parameter **outputDir** in *./cfg/wdio.conf.js* will log all WebDriver commands into files

* #### taking screenshot on failed tests;
Hook **afterTest** in *./cfg/wdio.conf.js* if error, save screenshot to ./screenshot folder

* #### generation human-readable report;
Parameter **reporters** in *./cfg/wdio.conf.js* implemented spec reporter

* #### generating random values for insignificant test data, for example, for new trading account;
Method **getAccountWithRandomName** in *./test/config/config.ts* for generating random postfix of account title

* #### WebDriver factory;
Implemented by default in wdio, according to specified capabilities in  *\*.conf.js* files 
global variable **$** will provide access to all available drivers e.g. Chrome, Firefox etc.

* #### encapsulation layers:
   - **test data**: f.e. creds for tests inside *./test/config/config.ts*
   - **logic of tests**: all logic inside *./test/specs/\*.ts*
   - **actions on web pages**: all interactions with browser happening inside *./test/object/\*.ts* and *./test/elements/\*.ts*
   - **layout**: all selectors for page elements or objects inside *./test/layout/desktop.ts*
    
* #### configurator:
   - run tests in parallel mode: execute command *npm run tests-parallel-prod*
   - ability to run tests for different browsers by configuring: 2 different configs created for firefox and chrome, execute commands *npm run tests-chrome-prod* or *npm run tests-firefox-prod* 
   - ability to run tests for different environments(urls) by configuring/by command-line: parameter **baseUrl** inside configs files, or run in console:
```
tsc && ./node_modules/.bin/wdio run cfg/chrome.wdio.conf.js --baseUrl 'https://dev-url.com/'
```
