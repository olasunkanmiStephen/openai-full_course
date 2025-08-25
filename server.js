const { title } = require('process');
const readline = require('readline');
const { generateMeta } = require('./contollers/openaiController')




const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})



rl.question('Youtube Video Title: \n', generateMeta)