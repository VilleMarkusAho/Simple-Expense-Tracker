import { ExpenseCategory } from './../models/expense.model';
import { Injectable } from '@angular/core';
import { IExpense } from '../models/expense.model';
import { debounceTime, Subject } from 'rxjs';

export type Currency = "$" | "€" | "£" | "¥" | "CHF" | "C$" | "A$";

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor() { }

  private expenseUpdated = new Subject<void>();

  currency: Currency = "$";
  revenue: number = 0;
  expenses: IExpense[] = SAMPLE_EXPENSES;
  totalExpenses: number = this.getTotalExpenses();
  balance: number = this.revenue - this.totalExpenses;

  addExpense(expense: IExpense): void {
    this.expenses.push(expense);
    this.totalExpenses += expense.amount || 0;
    this.updateBalance();
  }

  updateExpenseAmount(index: number, sum: number): void {
    sum = sum || 0; // if sum is null or undefined, set it to 0
    const prevAmount = this.expenses[index].amount || 0;
    this.expenses[index].amount = sum;
    this.totalExpenses = this.totalExpenses - prevAmount + sum;
    this.updateBalance();
    this.triggerExpenseChange();
  }

  removeExpense(index: number): void {
    const expense = this.expenses.splice(index, 1)[0];
    this.totalExpenses -= expense.amount || 0;
    this.updateBalance();
    this.triggerExpenseChange();
  }

  updateRevenue(revenue: number): void {
    this.revenue = revenue || 0;
    this.updateBalance();
    this.triggerExpenseChange();
  }

  updateBalance(): void {
    this.balance = this.revenue - this.totalExpenses;
  }

  getExpenseChangeListener() {
    return this.expenseUpdated.asObservable().pipe(
      // wait for 0.5 second before emitting the latest value (e.g. after user stops typing) to avoid possible performance issues
      debounceTime(500)
    );
  }

  triggerExpenseChange() {
    this.expenseUpdated.next();
  }

  private getTotalExpenses(): number {
    return this.expenses.reduce((acc, curr) => acc + curr.amount || 0, 0);
  }
}

const SAMPLE_EXPENSES: IExpense[] = [
  {
    category: ExpenseCategory.Groceries,
    description: "Bought vegetables and dairy products",
    amount: 45.75,
  },
  {
    category: ExpenseCategory.Entertainment,
    description: "Movie ticket for sci-fi film",
    amount: 12.50,
  },
  {
    category: ExpenseCategory.Transportation,
    description: "Monthly subway pass",
    amount: 60.00,
  },
  {
    category: ExpenseCategory.Dining,
    description: "Dinner at an Italian restaurant",
    amount: 85.00,
  },
  {
    category: ExpenseCategory.Utilities,
    description: "Electricity bill payment",
    amount: 120.45,
  },
];
