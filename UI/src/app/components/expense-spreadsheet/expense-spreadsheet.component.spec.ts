import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSpreadsheetComponent } from './expense-spreadsheet.component';

describe('ExpenseSpreadsheetComponent', () => {
  let component: ExpenseSpreadsheetComponent;
  let fixture: ComponentFixture<ExpenseSpreadsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseSpreadsheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseSpreadsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
