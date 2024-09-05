import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDataConverterComponent } from './ngx-data-converter.component';

describe('NgxDataConverterComponent', () => {
  let component: NgxDataConverterComponent;
  let fixture: ComponentFixture<NgxDataConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxDataConverterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxDataConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
