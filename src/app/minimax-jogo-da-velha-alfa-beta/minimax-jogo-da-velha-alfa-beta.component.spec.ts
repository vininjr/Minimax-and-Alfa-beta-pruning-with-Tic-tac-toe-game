import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimaxJogoDaVelhaAlfaBetaComponent } from './minimax-jogo-da-velha-alfa-beta.component';

describe('MinimaxJogoDaVelhaAlfaBetaComponent', () => {
  let component: MinimaxJogoDaVelhaAlfaBetaComponent;
  let fixture: ComponentFixture<MinimaxJogoDaVelhaAlfaBetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimaxJogoDaVelhaAlfaBetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimaxJogoDaVelhaAlfaBetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
