### Example of tests with properties
This example shows how to create Web-UI tests with properties
#### Install dependencies
```
npm install
```
#### Run all tests
```
./node_modules/.bin/taf --tests ./tests
```
#### Run tests through config
 ```
./node_modules/.bin/taf --config ./config.js 
 ```
#### Run suite of tests with 'valid' tag
 ```
 ./node_modules/.bin/taf --tests ./tests/ --suite ./suites/valid.suite.js
 ```
 
 #### Run suite of tests with 'Major' severity
  ```
  ./node_modules/.bin/taf --tests ./tests/ --suite ./suites/major.suite.js
  ```
