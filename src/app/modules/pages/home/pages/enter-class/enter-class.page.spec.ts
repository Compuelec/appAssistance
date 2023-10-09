import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnterClassPage } from './enter-class.page';

describe('EnterClassPage', () => {
  let component: EnterClassPage;
  let fixture: ComponentFixture<EnterClassPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnterClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
