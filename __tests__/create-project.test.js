'use strict';

const createProject = require('..');
const assert = require('assert').strict;

assert.strictEqual(createProject(), 'Hello from createProject');
console.info('createProject tests passed');
