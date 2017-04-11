#! /usr/bin/env node

var co = require('co');
var shell = require('shelljs');
var config = require('../config.json');
var prompt = require('co-prompt');
var program = require('commander');
var fs = require('fs');
const username = require('username');

var logoutpout = 'c:\\tsccli_output.log';

if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}
var doCreateProject = (projectName, authorName) => {
    shell.echo(`Creating project ${projectName}`);
    shell.exec(`git clone ${config.source_repo} ${projectName}`);
    shell.echo(`Project created. Preparing...`);
    shell.cd(projectName);
    shell.exec(`rmdir .git /s /q`, {
        silent: true
    });
    var packageJsonString = shell.cat(`package.json`);
    var projectJson = JSON.parse(packageJsonString);
    projectJson.name = projectName;
    projectJson.author = authorName;
    packageJsonString = JSON.stringify(projectJson);
    fs.writeFile(`./package.json`, packageJsonString, function (err) {
        if (err) {
            console.log(err);
            return shell.echo('Unable to update project config');
        }
        shell.echo("Project config updated");
        shell.echo(`Installing dependencies...`);
        // shell.exec(`npm install `, {
        //     silent: true
        // });
        shell.echo(`All done!`);
        shell.echo(`Next, Run the commands "cd ${projectName} && tli serve" to get started.`);
        shell.exit(0);
    });

}
var getUserInput = (tempName, callback) => {
    co(function* () {
        var authorName = yield prompt(`Author (${tempName}): `);
        callback(authorName);
    });
}
var processAction = (projectName) => {
    username().then(username => {
        getUserInput(username, (authorName) => {
            if (!authorName || authorName.length < 1) {
                authorName = username;
            }
            doCreateProject(projectName, authorName);
        });
    }).catch(err => {
        getUserInput("<none>", (authorName) => {
            if (!authorName || authorName.length < 1) {
                authorName = "";
            }
            doCreateProject(projectName, authorName);
        });
    });

}
program
    .usage('Creates a new project with the supplied project name')
    .action(function (projectName) {
        processAction(projectName);
    })
    .parse(process.argv);