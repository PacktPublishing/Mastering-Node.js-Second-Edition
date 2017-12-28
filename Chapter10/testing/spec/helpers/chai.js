const chai = require('chai');
chai.config.includeStack = true;

global.sinon = require('sinon');
global.expect = chai.expect;
global.should = chai.should();
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;