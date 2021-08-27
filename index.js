const fs = require('fs')

function starts() {

  var path = "./src/banco.json"

  var readlineSync = require('readline-sync');

  var tipo = readlineSync.question("entrar registrar ver dados ou sair?: ")

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

      } else {
        console.log("Não a dados no banco!")
      }

    } catch (e) {
      if (e) {
        fs.writeFileSync(path, "{}")
      }
    }
  } else if (tipo === "ver dados") {
    console.clear()
    const verDados = JSON.parse(fs.readFileSync(path))
    console.log("Seus dados são: \n")
    console.log(verDados)
    console.log("\n")
  } else if(tipo === "sair") {
    console.log("Obrigado por testar!")
  }

  var sair = readlineSync.question("deseja executar novamente? s / n: ")
 
  if (sair === "s") {
    starts()
  } else {
    console.log("Obrigado por testar!")
  }

}
starts()