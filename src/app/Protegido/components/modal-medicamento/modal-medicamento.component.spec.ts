import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMedicamentoComponent } from './modal-medicamento.component';

describe('ModalMedicamentoComponent', () => {
  let component: ModalMedicamentoComponent;
  let fixture: ComponentFixture<ModalMedicamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMedicamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
