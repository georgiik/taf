### Example of simple tests
This example shows how to create Web-UI tests
#### Install dependencies
```
npm install
```
#### Run all tests
```
./node_modules/.bin/taf --tests ./tests
```
#### Run test suite
```
./node_modules/.bin/taf --tests ./tests/ --suite ./suites/threads.suite.js
```
#### Run tests through config
 ```
./node_modules/.bin/taf --config ./config.js 
 ```