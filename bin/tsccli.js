#! /usr/bin/env node

var co = require('co');
var shell = require('shelljs');
var config = require('../config.json');
var prompt = require('co-prompt');
var program = require('commander');


if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}
var packageJsonString = shell.cat(`package.json`);
    var projectJson = JSON.parse(packageJsonString);
program
    .version(projectJson.version)
    .command('init <projectName>', 'Initializes a new project')
    .command('serve <environment>', 'Starts the server')
    .option('-v, --version', 'output the version number')
    .parse(process.argv);