//Array de palavras que vocês devem utilizar! Caso queiram adicionar mais alguma palavra, fiquem à vontade. 

const BancoDePalavras = ["TERMO","CASAL","LIVRO","PEDRA","PORTA","CARRO","AVIAO","NORTE","SULCO","VERDE","PRETO","BRISA","FORTE","DORES","MENTE","CORPO","TEMPO","SABER","PODER","FALAR","ANDAR","COMER","VIVER","OLHAR","DIZER","LEVES","GRAVE","CLARO","TERRA","PLANO","LINHA","PONTO","FORMA","IDEIA","VALOR","SOMAR","SUBIR","JOGAR","CRIAR","AMIGO","FELIZ","RISOS","CHUVA","SOLAR","VENTO","NUVEM","PEDAL","FONTE","CAMPO","LIMPO","SUAVE","MAGIA","SONHO","LOUCO","CERTO","ERRAR","NIVEL","FRASE", "PENIS", "TEXTO","CONTA","CALMA","LONGE","PERTO","ENTRE","ANTES","TARDE","NOITE","HORAS","FIRME","FRACO","RAPTO","LENTO","NOVOS","VELHO","JOVEM","UNICO","CHEIO","VAZIO","ALTOS","BAIXO","LARGO","FINOS","ABRIR","FECHO","SAIDA","RODAR","GIRAR","PARAR","MEXER","TOCAR","OUVIR","PENSO","AGORA","NUNCA","CERCA","PORTO","PRAIA","ILHAS","PEDIR","PEGAR","SOLTO","BUSCA","ACHAR","PERDA","TENTE", "ERROS", "SABIA", "BOING", "METAL", "GALOS", "LONGE", "RITMO"];

//Quantatidade de tentativas que o usuário terá
let tentativas = 6;

//Gera um número aleatório entre 0 e 110 (quantidade atual que tem no banco de palavras - 1)
const numeroAleatorio = Math.floor(Math.random() * BancoDePalavras.length);

//Seleciona qual será a palavra escolhida para ser advinhada durante o jogo a partir do numero aleatório
const palavraDoJogo = BancoDePalavras[numeroAleatorio];
console.log(palavraDoJogo);

//Pega o endereço id da grid em que as letras ficarão
const grid = document.querySelector("#grid");

/**
 * Exibe uma mensagem para o usuário indicando se ele perdeu ou ganhou o jogo
 * @param {string} texto - Conteúdo
 * @param {string} tipo - Classe da mensagem
 */
function mostrarMensagem(texto, tipo = "") {
  const mensagem = document.getElementById("mensagem");
  mensagem.textContent = ""; //Primeiro zera o que está escrito
  mensagem.textContent = texto; //Escreve a nova mensagem
  mensagem.className = ""; // limpa classes

  if (tipo) {
    mensagem.classList.add(tipo);
  }
}

//Variavel Global que irá conter as letras e quantas vezes elas se repetem
let arrayPalavra = [];

function destrinchaPalavra () {
  arrayPalavra = []; // reseta
  let resultado = {};

  for (let letra of palavraDoJogo) {
    resultado[letra] = (resultado[letra] || 0) + 1;
  }

  for (let letra in resultado) {
    arrayPalavra.push([letra, resultado[letra]]);
  }

  return arrayPalavra;
}

/**
 * Verifica quais letras estão corretas e remove do contador de palavras - Verde do termo
 * @param {string} palavraDigitada  - Palavra digitada pelo usuário
 * @returns Array com as posições das letras que estão corretas - Verdes
 */
function verificaCertos (palavraDigitada) {
  let certinhos = [];
  
  for (let i = 0; i < 5; i++) { 
    if (palavraDigitada[i] === palavraDoJogo[i]) { 
      certinhos.push(i); 
      // Reduz a contagem no arrayPalavra para não contar como amarelo depois
      for (let item of arrayPalavra) { 
        if (item[0] === palavraDigitada[i]) { 
          item[1]--; 
        }
      }
    }
  }
  return certinhos; 
}

/**
 * Verifica quais letras existem, mas estão no local errado
 * @param {string} palavraDigitada - Palavra digitada pelo usuário
 * @param {array} certinhos - Array com as posições das letras que já estão corretas - Verdes (Precisa da função acima)
 * @returns Array com as posições das letras que devem ser amarelas
 */
function verificaAmarelos (palavraDigitada, certinhos) {
  let amarelin = []; 

  for (let i = 0; i < 5; i++) { 
    // Só verifica se a posição já não for um "verde"
    if (!certinhos.includes(i)) { 
      for (let item of arrayPalavra) { 
        // Se a letra existe no banco e ainda tem "estoque" de repetição
        if (item[0] === palavraDigitada[i] && item[1] > 0) { 
          amarelin.push(i); 
          item[1]--; 
          break; // Sai do loop interno para não gastar a mesma letra duas vezes no mesmo slot
        }
      }
    }
  }
  return amarelin; 
}

//Junta as letras verdes (corretas) com as amarelas (existem na palavras, mas em local errado)
function verificaPalavra (palavraDigitada) {
  let cores = ["-", "-", "-", "-", "-"];
  let certinhos = verificaCertos(palavraDigitada);
  console.log(certinhos);
  let amarelin = verificaAmarelos(palavraDigitada, certinhos);
  console.log(amarelin);

  // Preenche o array de cores com base nos resultados das funções anteriores
  certinhos.forEach(pos => cores[pos] = "V"); 
  amarelin.forEach(pos => cores[pos] = "A"); 

  console.log(cores)
  return cores;
}

destrinchaPalavra();
console.log(arrayPalavra);

// Mostra a mensagem inicial de tentativas
mostrarMensagem("Você tem " + tentativas + " tentativas."); 

const botao = document.querySelector("#enviar")
botao.addEventListener("click", () => {
    //Pega a palavra digitada pelo usuário, converte tudo para maiúsculo e romove os espaços
    const palavraDigitada = document.getElementById("palavra").value.toUpperCase().trim(); 

   if(tentativas > 0) {
      //Verifica se a palavra digitada é diferente do tamanho padrão do jogo, que é 5!
      if(palavraDigitada.length !== 5) { 
        return alert("Digite 5 letras!");
      } else {

        let cores = verificaPalavra(palavraDigitada);
        
        //Adiciona as li na tela juntamente com as cores selecionadas!
        for (let i = 0; i < 5; i++) {
          //Crie o elementos li
          const caixaLetra = document.createElement("li"); 

          //Adicione a classe "caixaLetra" para essa li recém criada, use o classList
          caixaLetra.classList.add("caixaLetra"); 

          //Adicione como conteúdo dessa li o valor da letra da palavraDigitada na posição i
          caixaLetra.textContent = palavraDigitada[i]; 

          //Continue o switch abaixo, mas agora colocando a classe para quando for "A" e quando for "-"
          switch(cores[i]) {
            case "V": 
                caixaLetra.classList.add("correto");
                break;
            case "A": 
                caixaLetra.classList.add("existeMasErrado"); 
                break; 
            case "-": 
                caixaLetra.classList.add("naoTem"); 
                break; 
          }

          grid.appendChild(caixaLetra); 
        }
          //Reseta todas as variaveis para a próxima rodada
          document.getElementById("palavra").value = "";
          console.log(arrayPalavra);
          destrinchaPalavra();
          
          //Diminui 1 das tentativas do usuário e informa o novo valor para o usuário
          tentativas--; 
          mostrarMensagem("Tentativas restantes: " + tentativas); 
          console.log(tentativas)

          //Se a palavra do jogo ser igual a digitada pelo usuário, então ele venceu! Informe uma mensagem de texto comemorando!
          if (palavraDigitada === palavraDoJogo) { 
            mostrarMensagem("Você acertou! Parabéns!", "sucesso"); 
            tentativas = 0;
          } else if (tentativas === 0) { 
            mostrarMensagem("Fim de jogo! A palavra era " + palavraDoJogo, "erro"); 
          }
        }
    }
});

//Função para conseguir enviar a palavra no input pelo enter
document.getElementById("palavra").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    botao.click();
  }
});