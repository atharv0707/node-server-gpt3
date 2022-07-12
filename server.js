const express = require('express')
require('dotenv').config();
const app = express()
const port = 3000
const { getTranslatedCode } = require('./utils/translateCode');

app.use(express.json());
app.post('/', async (req, res) => {
    const { code, newLanguageType, oldLanguageType } = req.body;
    const translate = await getTranslatedCode(code, newLanguageType, oldLanguageType);
    res.json(translate);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})