const express = require('express')

const app = express();

const { generateMeta, generateImage, webSearch, fileSearch } = require('./contollers/openaiController')

app.listen(4000, () => console.log("listening for requests on port 4000"))


app.use(express.json())
app.use(express.static('public'))


app.post('/openai/meta', generateMeta)
app.post('/openai/image', generateImage)
app.post('/openai/websearch', webSearch)
app.post('/openai/filesearch', fileSearch)