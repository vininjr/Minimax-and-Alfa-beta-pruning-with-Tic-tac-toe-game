import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinimaxJogoDaVelhaComponent } from './minimax-jogo-da-velha/minimax-jogo-da-velha.component';
import { MinimaxJogoDaVelhaAlfaBetaComponent } from './minimax-jogo-da-velha-alfa-beta/minimax-jogo-da-velha-alfa-beta.component';

const routes: Routes = [
  { path: 'alfaBeta', component: MinimaxJogoDaVelhaAlfaBetaComponent },
  { path: 'minimax', component: MinimaxJogoDaVelhaComponent },
  { path: '**', redirectTo: '/minimax', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
