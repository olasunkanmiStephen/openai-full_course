const { title } = require('process');
const readline = require('readline');
const { generateMeta, generateImage } = require('./contollers/openaiController')




const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


rl.question('Describe your Youtube Thumbnails \n', generateImage)
rl.question('Youtube Video Title: \n', generateMeta)
