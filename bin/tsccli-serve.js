#! /usr/bin/env node

var co = require('co');
var shell = require('shelljs');
var config = require('../config.json');
var prompt = require('co-prompt');
var program = require('commander');
var fs = require('fs');


var processAction = (environment) => {
    var host = program.host || '0.0.0.0',
        port = program.port || '5200',
        watch = program.watch !== undefined;
    shell.echo(`Starting server with host:${host} and port:${port}`);
    environment = environment || 'development';
    var command = 'node';
    if (watch) {
        shell.exec(`nodemon ./bin/www.js NODE_ENV=${environment} --host=${host} --port=${port}`);
    } else {
        shell.exec(`node ./bin/www.js NODE_ENV=${environment} --host=${host} --port=${port}`);
    }
}
program
    .usage('Creates a new project with the supplied project name')
    //.option('-h --host ', 'host to run server in. default to 0.0.0.0')
    .option('-p --port ', 'port to run server in. default to 5200')
    .option('-w --watch ', 'Watch for changes and update the server')
    .action(function (environment) {
        processAction(environment);
    })
    .parse(process.argv);