import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimaxJogoDaVelhaComponent } from './minimax-jogo-da-velha.component';

describe('MinimaxJogoDaVelhaComponent', () => {
  let component: MinimaxJogoDaVelhaComponent;
  let fixture: ComponentFixture<MinimaxJogoDaVelhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimaxJogoDaVelhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimaxJogoDaVelhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
