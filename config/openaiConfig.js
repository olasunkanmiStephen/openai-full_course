const {Configuration, OpenAiApi} = require('openai')
require('dotenv').config()


const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY
})

const openai = new OpenAiApi(configuration)

module.exports = openai;