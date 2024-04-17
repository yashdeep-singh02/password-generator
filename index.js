#!/usr/bin/env node
const {Command} = require('commander');
const chalk = require('chalk');
// const chalk = import("chalk").then(m=>m.default);
const clipboardy = require('clipboardy');
const log = console.log;
const createPassword = require('./utils/createPassword');
const savePassword = require('./utils/savePassword');

const program = new Command();
program.version('1.0.0').description('Password Generator')

// program.command('generate')
// .action(()=>{
//     console.log('Generated')
// }).parse();


program
   .option('-l,--length <number>','length of password','8')
   .option('-s,--save','save password to password.txt')
   .option('-nn,--no-numbers','remove numbers')
   .option('-ns,--no-symbols','remove symbols')
   .parse();


// console.log(program.opts());

const {length, save, numbers, symbols} = program.opts();

//Get Generated password
const generatedPassword = createPassword(length, numbers, symbols);

//Save to file
if(save){
   savePassword(generatedPassword);
}
//Copy to clipboard
clipboardy.writeSync(generatedPassword);

//Output generated password
log(chalk.blue('Generated Password: ')+chalk.bold(generatedPassword));
log(chalk.yellow('Password copied to clipboard'));