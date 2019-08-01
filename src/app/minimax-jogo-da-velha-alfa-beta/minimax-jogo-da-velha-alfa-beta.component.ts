import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minimax-jogo-da-velha-alfa-beta',
  templateUrl: './minimax-jogo-da-velha-alfa-beta.component.html',
  styleUrls: ['./minimax-jogo-da-velha-alfa-beta.component.css']
})
export class MinimaxJogoDaVelhaAlfaBetaComponent implements OnInit {

  constructor() { }

  tabuleiro = [[], [], []];
  raiz; atual; pilha = []; nodos = 0; depth = 0;
  isMinimax = true; message: string = "";

  ngOnInit() { this.inicializa() }

  inicializa() {
    this.tabuleiro = [[], [], []];
    this.raiz = null;
    this.atual = null;
    this.message = "inicia";

    this.exibeEstado(this.tabuleiro);

    document.getElementById("reiniciar").style.display = 'none';
    document.getElementById("quadroFilhos").innerHTML = '';
  }

  geraArvore() {
    this.pilha = [];
    this.nodos = 0;
    let raiz = { pai: null, tabuleiro: this.tabuleiro, filhos: [], jogador: "O", minimax: null };
    this.pilha.push(raiz);

    while (this.pilha.length) {
      let nodo = this.pilha.pop();
      this.geraFilhos(nodo);
    }

    this.calculaAlfaBeta(raiz, this.depth, -999999999, +99999999, true);
    this.exibir(raiz);
    this.atual = raiz;
  }


  geraFilhos(pai) {
    this.depth++;
    var tabuleiro = [];
    var x, y, minimax;
    var jogador = (pai.jogador == "X") ? "O" : "X";

    for (y = 0; y < 3; y++)
      for (x = 0; x < 3; x++)
        if (pai.tabuleiro[y][x] == undefined) {
          tabuleiro = this.copiaEstado(pai.tabuleiro);
          tabuleiro[y][x] = jogador;
          var nodo = { pai: pai, tabuleiro: tabuleiro, filhos: [], jogador: jogador, minimax: null };	// cria um novo nodo para o filho

          nodo.minimax = this.ehTerminal(nodo.tabuleiro, 0);
          pai.filhos.push(nodo);
          this.nodos++;

          if (!nodo.minimax)
            this.pilha.push(nodo);
        }
  }

  calculaAlfaBeta(nodo, depth, alfa, beta, play) {
    var i;

    if (depth == 0 || this.ehTerminal(nodo.tabuleiro, 0)) {
      return nodo.minimax;
    }
    if (play) {
      let value = -999999;
      for (i = 0; i < nodo.filhos.length; i++) {
        value = this.max(value, this.calculaAlfaBeta(nodo.filhos[i], depth - 1, alfa, beta, false));
        alfa = this.max(alfa, value);
        if (alfa >= beta) break;
      }
      return value;
    } else {
      let value = 999999;
      for (i = 0; i < nodo.filhos.length; i++) {
        value = this.min(value, this.calculaAlfaBeta(nodo.filhos[i], depth - 1, alfa, beta, true));
        beta = this.min(beta, value);
        if (alfa >= beta) break;
      }
      return value;
    }
  }

  ehTerminal(tabuleiro, encerra) {
    var x, y;
    var brancos = 0;
    var utilidade = null;
    if (tabuleiro == null || tabuleiro == undefined) return;

    for (y = 0; y < 3; y++)
      if (tabuleiro[y][0] != undefined && tabuleiro[y][1] != undefined && tabuleiro[y][2] != undefined && tabuleiro[y][0] == tabuleiro[y][1] && tabuleiro[y][0] == tabuleiro[y][2]) {
        utilidade = (tabuleiro[y][0] == "X") ? 1 : -1;
        break;
      }
    if (!utilidade)
      for (x = 0; x < 3; x++)
        if (tabuleiro[0][x] != undefined && tabuleiro[0][x] == tabuleiro[1][x] && tabuleiro[0][x] == tabuleiro[2][x]) {
          utilidade = (tabuleiro[0][x] == "X") ? 1 : -1;
          break;
        }
    if (!utilidade)
      if (tabuleiro[1][1] != undefined && (
        (tabuleiro[0][0] == tabuleiro[1][1] && tabuleiro[0][0] == tabuleiro[2][2]) ||
        (tabuleiro[0][2] == tabuleiro[1][1] && tabuleiro[0][2] == tabuleiro[2][0])))
        utilidade = (tabuleiro[1][1] == "X") ? 1 : -1;

    for (y = 0; y < 3; y++)
      for (x = 0; x < 3; x++)
        if (tabuleiro[y][x] == undefined)
          brancos++;

    if (utilidade)
      if (encerra)
        if (utilidade > 0)
          this.termina("Eu ganhei!");
        else
          this.termina("Você ganhou!");
      else
        return utilidade * (brancos + 1);
    else
      if (!brancos)
        if (encerra)
          this.termina("Empatamos!");
        else
          return 0;
      else
        return null;
  }

  jogaHumano(i, j) {

    if (this.tabuleiro[i][j] != undefined) {
      alert("Posição inválida");
      return;
    }
    else {
      this.tabuleiro[i][j] = "O";
      this.exibeEstado(this.tabuleiro);
    }

    if (!this.ehTerminal(this.tabuleiro, 1)) {
      if (!this.raiz)
        this.geraArvore();
      else
        for (i = 0; i < this.atual.filhos.length; i++)
          if (this.comparaEstados(this.tabuleiro, this.atual.filhos[i].tabuleiro)) {
            this.atual = this.atual.filhos[i];
            break;
          }
      this.jogaCPU();
    }
  }

  jogaCPU() {
    var max;
    var opcoes = [];
    var i, r;

    if (!this.raiz)
      this.geraArvore();

    document.getElementById("quadroFilhos").innerHTML = '';

    for (i = 0; i < this.atual.filhos.length; i++) {
      if (this.atual.filhos[i].minimax != null && (max == undefined || this.atual.filhos[i].minimax > max))
        max = this.atual.filhos[i].minimax;
    }

    for (i = 0; i < this.atual.filhos.length; i++) {
      this.mostraFilho(this.atual.filhos[i]);
      if (this.atual.filhos[i].minimax == max)
        opcoes.push(i);
    }

    r = Math.floor(Math.random() * opcoes.length);
    this.atual = this.atual.filhos[opcoes[r]];
    this.tabuleiro = this.atual.tabuleiro;
    this.exibeEstado(this.tabuleiro);
    this.ehTerminal(this.tabuleiro, 1);
  }

  exibeEstado(tabuleiro) {
    for (var i = 0; i < 3; i++)
      for (var j = 0; j < 3; j++) {
        let elemento = document.getElementById("p" + i + j);
        if (tabuleiro[i][j] == undefined)
          elemento.innerHTML = "&nbsp;";
        else
          elemento.innerHTML = tabuleiro[i][j];
      }
  }

  mostraFilho(nodo) {
    var html;
    var x, y;

    html = "<div class='bloco ativo' id='b" + 1 + "' (click)='mostraNetos(" + 1 + ")'><pre>";	// gera blocos de filhos
    for (y = 0; y < 3; y++) {
      for (x = 0; x < 3; x++)
        if (nodo.tabuleiro[y][x] == undefined)
          html += "|  ";
        else
          html += nodo.tabuleiro[y][x] + "|  ";
      html += "\n\n";
    }
    html += "valor = " + nodo.minimax + "</pre></div>";
    document.getElementById("quadroFilhos").innerHTML += html;
  }

  termina(msg) {
    alert(msg);
    document.getElementById("reiniciar").style.display = '';
  }

  copiaEstado(tabuleiro) {
    var retorno = [];
    for (var i = 0; i < tabuleiro.length; i++)
      retorno[i] = tabuleiro[i].slice(0);

    return retorno;
  }

  calculaMinimax(nodo) {
    var i, min, max;
    for (i = 0; i < nodo.filhos.length; i++) {
      if (nodo.filhos[i].minimax === null)
        this.calculaMinimax(nodo.filhos[i]);

      if (max == undefined || nodo.filhos[i].minimax > max)
        max = nodo.filhos[i].minimax;
      if (min == undefined || nodo.filhos[i].minimax < min)
        min = nodo.filhos[i].minimax;
    }
    if (nodo.jogador == "O")
      nodo.minimax = max;
    else
      nodo.minimax = min;
  }

  exibir(raiz) {
    this.calculaMinimax(raiz);
  }

  comparaEstados(tabuleiro1, tabuleiro2) {
    for (var i = 0; i < 3; i++)
      for (var j = 0; j < 3; j++)
        if (tabuleiro1[i][j] != tabuleiro2[i][j])
          return false;

    return true;
  }

  min(a, b) {
    if (a < b) return a;
    return b;
  }

  max(a, b) {
    if (a > b) return a;
    return b;
  }

}
