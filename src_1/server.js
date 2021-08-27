const express = require('express');
const ejs = require('ejs');
const path = require('path');
const { response } = require('express');
const app = express();
const pdf = require('html-pdf');

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

app.get('/', (req, res) => {
  
  const filePath = path.join(__dirname, "print.ejs");
  ejs.renderFile(filePath, { passengers, }, (err, data) => {
    if(err) {
      console.log(err)
      return res.send('Erro na leitura do arquivo');
    }

    const options = {
      height: "11.25in",
      width: "8.5in",
      header: {
        height: "20mm"
      },
      footer: {
        height: "20mm"
      }
    }

    pdf.create(data, options).toFile("report.pdf", (err, data) => {
      if(err) {
        console.log(err)
        return res.send('Erro ao gerar o PDF');
      }
      return res.send("Arquivo gerado com sucesso!");
    });
  });


});

app.listen(3333, () => {
  console.log("O servidor está rodando!");
});