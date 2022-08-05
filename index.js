const express = require('express')
const { Translate } = require('@google-cloud/translate').v2;
process.env.GOOGLE_APPLICATION_CREDENTIALS = process.env.FILEURL
const app = express()
const port = 3000

app.use(express.static('public'))
app.use(express.json());

const translate = new Translate();

console.log(process.env.FILEURL)
app.post('/to/', (req, res) => {
  console.log(req.body)

  getText(req, res)
})

async function getText(req,res) {
  let [translations] = await translate.translate(req.body.data, { to: 'en' });
  translations = Array.isArray(translations) ? translations : [translations];
  console.log('Translations:');
  console.log(translations.length)

  translations.forEach((translation, i) => {
    res.send({ "data": `${translation}` })


  });
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
