const express = require('express');
const ejs = require('ejs');
const path = require('path');
const { response } = require('express');
const pdf = require('html-pdf');
const puppeteer = require('puppeteer');
const app = express();

const passengers = [
  {
    name: 'Joyce',
    flightNumber: 12898,
    time: '18h00'
  }, {
    name: 'Leon',
    flightNumber: 12898,
    time: '18h00'
  }, {
    name: 'Evie',
    flightNumber: 12898,
    time: '18h00'
  }
]

app.get('/pdf', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3333/', {
    waitUntil: 'networkidle0'
  });

  const pdf = await page.pdf({
    printBackground: true,
    format: 'Letter',
    margin: {
      top: "20px",
      bottom: "40px",
      left: "20px",
      right: "20px"
    }
  });

  await browser.close();

  res.contentType("application/pdf");

  return res.send(pdf);
});

app.get('/', (req, res) => {
  
  const filePath = path.join(__dirname, "print.ejs");
  ejs.renderFile(filePath, { passengers, }, (err, data) => {
    if(err) {
      return res.send('Erro na leitura do arquivo');
    }
    return res.send(data);
  });


});

app.listen(3333, () => {
  console.log("O servidor está rodando!");
});