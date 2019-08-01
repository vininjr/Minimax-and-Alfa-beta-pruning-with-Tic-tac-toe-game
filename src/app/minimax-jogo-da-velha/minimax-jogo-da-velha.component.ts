import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-minimax-jogo-da-velha',
  templateUrl: './minimax-jogo-da-velha.component.html',
  styleUrls: ['./minimax-jogo-da-velha.component.css']
})
export class MinimaxJogoDaVelhaComponent implements OnInit {
  constructor() { }

  estado = [[], [], []];
  raiz; atual; pilha = []; nodos = 0;
  isMinimax = true; message: string = "MiniMax";

  ngOnInit() { this.inicializa() }

  inicializa() {
    this.estado = [[], [], []];
    this.raiz = null;
    this.atual = null;

    this.exibeEstado(this.estado);

    document.getElementById("reiniciar").style.display = 'none';
    document.getElementById("quadroFilhos").innerHTML = '';
  }

  geraArvore() {
    this.pilha = [];
    this.nodos = 0;
    let raiz = { pai: null, estado: this.estado, filhos: [], jogador: "O", minimax: null };
    this.pilha.push(raiz);

    while (this.pilha.length) {
      let nodo = this.pilha.pop();
      this.geraFilhos(nodo);
    }

    this.calculaMinimax(raiz);
    this.atual = raiz;
  }


  geraFilhos(pai) {
    var estado = [];
    var x, y, minimax;
    var jogador = (pai.jogador == "X") ? "O" : "X";

    for (y = 0; y < 3; y++)
      for (x = 0; x < 3; x++)
        if (pai.estado[y][x] == undefined) {
          estado = this.copiaEstado(pai.estado);
          estado[y][x] = jogador;
          var nodo = { pai: pai, estado: estado, filhos: [], jogador: jogador, minimax: null };	// cria um novo nodo para o filho

          nodo.minimax = this.ehTerminal(nodo.estado, 0);
          pai.filhos.push(nodo);
          this.nodos++;

          if (!nodo.minimax)
            this.pilha.push(nodo);
        }
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

  ehTerminal(estado, encerra) {
    var x, y;
    var brancos = 0;
    var utilidade = null;

    for (y = 0; y < 3; y++)
      if (estado[y][0] != undefined && estado[y][0] == estado[y][1] && estado[y][0] == estado[y][2]) {
        utilidade = (estado[y][0] == "X") ? 1 : -1;
        break;
      }
    if (!utilidade)
      for (x = 0; x < 3; x++)
        if (estado[0][x] != undefined && estado[0][x] == estado[1][x] && estado[0][x] == estado[2][x]) {
          utilidade = (estado[0][x] == "X") ? 1 : -1;
          break;
        }
    if (!utilidade)
      if (estado[1][1] != undefined && (
        (estado[0][0] == estado[1][1] && estado[0][0] == estado[2][2]) ||
        (estado[0][2] == estado[1][1] && estado[0][2] == estado[2][0])))
        utilidade = (estado[1][1] == "X") ? 1 : -1;

    for (y = 0; y < 3; y++)
      for (x = 0; x < 3; x++)
        if (estado[y][x] == undefined)
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

    if (this.estado[i][j] != undefined) {
      alert("Posição inválida");
      return;
    }
    else {
      this.estado[i][j] = "O";
      this.exibeEstado(this.estado);
    }

    if (!this.ehTerminal(this.estado, 1)) {
      if (!this.raiz)
        this.geraArvore();
      else
        for (i = 0; i < this.atual.filhos.length; i++)
          if (this.comparaEstados(this.estado, this.atual.filhos[i].estado)) {
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
    this.estado = this.atual.estado;
    this.exibeEstado(this.estado);
    this.ehTerminal(this.estado, 1);
  }

  exibeEstado(estado) {
    for (var i = 0; i < 3; i++)
      for (var j = 0; j < 3; j++) {
        let elemento = document.getElementById("p" + i + j);
        if (estado[i][j] == undefined)
          elemento.innerHTML = "&nbsp;";
        else
          elemento.innerHTML = estado[i][j];
      }
  }

  mostraFilho(nodo) {
    var html;
    var x, y;

    html = "<div class='bloco ativo' id='b" + 1 + "' (click)='mostraNetos(" + 1 + ")'><pre>";	// gera blocos de filhos
    for (y = 0; y < 3; y++) {
      for (x = 0; x < 3; x++)
        if (nodo.estado[y][x] == undefined)
          html += "|  ";
        else
          html += nodo.estado[y][x] + "|  ";
      html += "\n\n";
    }
    html += "valor = " + nodo.minimax + "</pre></div>";
    document.getElementById("quadroFilhos").innerHTML += html;
  }

  termina(msg) {
    alert(msg);
    document.getElementById("reiniciar").style.display = '';
  }

  copiaEstado(estado) {
    var retorno = [];
    for (var i = 0; i < estado.length; i++)
      retorno[i] = estado[i].slice(0);

    return retorno;
  }

  comparaEstados(estado1, estado2) {
    for (var i = 0; i < 3; i++)
      for (var j = 0; j < 3; j++)
        if (estado1[i][j] != estado2[i][j])
          return false;

    return true;
  }


}
