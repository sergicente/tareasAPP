import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirTareaComponent } from './anadir-tarea.component';

describe('AnadirTareaComponent', () => {
  let component: AnadirTareaComponent;
  let fixture: ComponentFixture<AnadirTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnadirTareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
