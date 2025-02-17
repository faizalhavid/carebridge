import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDialogButtonComponent } from './dialog-button.component';

describe('DialogComponent', () => {
  let component: AppDialogButtonComponent;
  let fixture: ComponentFixture<AppDialogButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDialogButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppDialogButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
