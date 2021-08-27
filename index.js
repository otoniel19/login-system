const fs = require('fs')
var path = "./src/banco.json"

var readlineSync = require('readline-sync');

var tipo = readlineSync.question("entrar ou registrar?: ")

if (tipo === "registrar") {

  var nome = readlineSync.question("seu nome: ")
  var idade = readlineSync.question("sua idade: ")
  var continuar = readlineSync.question("continuar? s / n: ")

  if (continuar === "s") {

    try {

      var obj = {
        name: nome,
        age: idade
      }

      const banco = JSON.parse(fs.readFileSync(path))
      fs.writeFileSync(path, JSON.stringify(obj))

      setTimeout(() => {
        console.log(banco);
      }, 3000)

    } catch (e) {
      if (e) {
        fs.writeFileSync(path, "{}")
      }
    }

  } else {
    console.log("Operação terminada...");
  }

} else if (tipo === "entrar") {
  try {

    const pegaDadosBanco = JSON.parse(fs.readFileSync(path))

    if (pegaDadosBanco.name && pegaDadosBanco.age) {

      var Lognome = readlineSync.question("seu nome: ")
      if (Lognome === pegaDadosBanco.name) {
        console.log("Ok")
      } else {
        console.log("Esse nome não existe!")
        while (Lognome != pegaDadosBanco.name) {
          Lognome = readlineSync.question("seu nome:")
        }
      }

      var Logidade = readlineSync.question("sua idade: ")
      if (Logidade === pegaDadosBanco.age) {
        console.log("Ok")
      } else {
        console.log("Idade Inválida!")
        while (Logidade != pegaDadosBanco.age) {
          Logidade = readlineSync.question("sua idade: ")
        }
      }

      console.log("Entrou com sucesso!")
      console.log(pegaDadosBanco)


    } else {
      console.log("Não a dados no banco!")
    }

  } catch (e) {
    if (e) {
      fs.writeFileSync(path, "{}")
    }
  }
}