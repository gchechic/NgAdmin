import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesosListComponent } from './procesos-list.component';

describe('ProcesosListComponent', () => {
  let component: ProcesosListComponent;
  let fixture: ComponentFixture<ProcesosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
