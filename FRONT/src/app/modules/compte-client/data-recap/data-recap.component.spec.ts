import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRecapComponent } from './data-recap.component';

describe('DataRecapComponent', () => {
  let component: DataRecapComponent;
  let fixture: ComponentFixture<DataRecapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataRecapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
