import { TestBed } from '@angular/core/testing';
import { FinanceService } from '../services/Finance.service';
import { ExpenseCategory } from '../models/expense.model';

describe('FinanceService', () => {
  let service: FinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinanceService],
    });
    service = TestBed.inject(FinanceService);
  });

  beforeEach(() => {
    service.expenses = [];
    service.totalExpenses = 0;
    service.balance = 0;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add expense', () => {
    service.addExpense({ category: ExpenseCategory.Groceries, description: 'Food', amount: 30 });
    expect(service.expenses.length).toBe(1);
    expect(service.totalExpenses).toBe(30);
    expect(service.balance).toBe(-30);
  });

  it('should update expense amount', () => {
    service.addExpense({ category: ExpenseCategory.Groceries, description: 'Food', amount: 30 });
    service.updateExpenseAmount(0, 50);
    expect(service.expenses[0].amount).toBe(50);
    expect(service.totalExpenses).toBe(50);
    expect(service.balance).toBe(-50);
  });

  it('should remove expense', () => {
    service.addExpense({ category: ExpenseCategory.Groceries, description: 'Food', amount: 30 });
    service.removeExpense(0);
    expect(service.expenses.length).toBe(0);
    expect(service.totalExpenses).toBe(0);
    expect(service.balance).toBe(0);
  });

  it('should update revenue', () => {
    service.updateRevenue(100);
    expect(service.revenue).toBe(100);
    expect(service.balance).toBe(100);
  });

  it('should update balance', () => {
    service.updateRevenue(100);
    service.addExpense({ category: ExpenseCategory.Groceries, description: 'Food', amount: 30 });
    expect(service.balance).toBe(70);
  });
});
