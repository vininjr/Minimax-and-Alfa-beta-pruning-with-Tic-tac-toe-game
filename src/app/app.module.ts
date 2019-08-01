import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MinimaxJogoDaVelhaComponent } from './minimax-jogo-da-velha/minimax-jogo-da-velha.component';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule, MatButtonModule ,MatExpansionModule, MatIconModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MinimaxJogoDaVelhaAlfaBetaComponent } from './minimax-jogo-da-velha-alfa-beta/minimax-jogo-da-velha-alfa-beta.component';

@NgModule({
  declarations: [
    AppComponent,
    MinimaxJogoDaVelhaComponent,
    MinimaxJogoDaVelhaAlfaBetaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,  
    MatSelectModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
