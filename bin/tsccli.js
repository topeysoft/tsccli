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
var doCreateProject = (name) => {

    console.log('Project name is %s', name);
    shell.exit(0);
}
program
    .version('0.0.1')
    .command('init <projectName>', 'Initializes a new project')
    .option('-v, --version', 'Outputs the version number')
    
    // .action(function (projectName) {
    //     var tempName = 'hello-world';
    //     co(function* () {
    //         projectName = yield prompt(`Project name (${tempName}): `);
    //         if (!projectName || projectName.length < 1) {
    //             projectName = tempName;
    //         }
    //         doCreateProject(projectName);
    //     });
    // })
    .parse(process.argv);