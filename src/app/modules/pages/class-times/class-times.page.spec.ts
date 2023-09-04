import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassTimesPage } from './class-times.page';

describe('ClassTimesPage', () => {
  let component: ClassTimesPage;
  let fixture: ComponentFixture<ClassTimesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ClassTimesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
