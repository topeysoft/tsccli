#! /usr/bin/env node

var co = require('co');
var shell = require('shelljs');
var config = require('../config.json');
var prompt = require('co-prompt');
var program = require('commander');
var fs = require('fs');

var logoutpout = 'c:\\tsccli_output.log';

if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}
var doCreateProject = (name) => {
    shell.echo(`Creating project ${name}`);
    shell.exec(`git clone ${config.source_repo} ${name}`);
    shell.echo(`Project created. Preparing...`);
    shell.cd(name);
    shell.exec(`rmdir .git /s /q`, {
        silent: true
    });
    var packageJsonString = shell.cat(`package.json`);
    var projectJson = JSON.parse(packageJsonString);
    projectJson.name = name;
    fs.writeFile(`./package.json`, JSON.stringify(projectJson), function (err) {
        if (err) {
            console.log(err);
         return  shell.echo('Unable to update project config');
        }
        shell.echo("Project config updated");
        shell.echo(`Installing dependencies...`);
        shell.exec(`npm install `, {
            silent: true
        });
        shell.exit(0);
    });

}

var processAction = (projectName) => {
    doCreateProject(projectName);
}
program
    .usage('Creates a new project with the supplied project name')
    .action(function (projectName) {
        processAction(projectName);
    })
    .parse(process.argv);