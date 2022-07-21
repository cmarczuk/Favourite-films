import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputLinkComponent } from './form-input-link.component';

describe('FormInputLinkComponent', () => {
  let component: FormInputLinkComponent;
  let fixture: ComponentFixture<FormInputLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInputLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
