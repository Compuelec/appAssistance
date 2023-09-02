import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoryPasswordPage } from './recory-password.page';

describe('RecoryPasswordPage', () => {
  let component: RecoryPasswordPage;
  let fixture: ComponentFixture<RecoryPasswordPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecoryPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
