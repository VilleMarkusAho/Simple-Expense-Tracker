import { Injectable } from '@angular/core';
import { IExpense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor() { }

  currency: "$" | "€" | "£" | "¥" | "CHF" | "C$" | "A$" = "$";
  revenue: number = 0;
  expenses: IExpense[] = SAMPLE_EXPENSES;
  totalExpenses: number = this.getTotalExpenses();
  balance: number = this.revenue - this.totalExpenses;

  addExpense(expense: IExpense): void {
    this.expenses.push(expense);
    this.totalExpenses += expense.amount || 0;
    this.updateBalance();
  }

  removeExpense(index: number): void {
    const expense = this.expenses.splice(index, 1)[0];
    this.totalExpenses -= expense.amount || 0;
    this.updateBalance();
  }

  getTotalExpenses(): number {
    return this.expenses.reduce((acc, curr) => acc + curr.amount || 0, 0);
  }

  updateRevenue(revenue: number): void {
    this.revenue = revenue || 0;
    this.updateBalance();
  }

  updateBalance(): void {
    this.balance = this.revenue - this.totalExpenses;
  }
}

const SAMPLE_EXPENSES: IExpense[] = [
  {
    category: "Groceries",
    description: "Bought vegetables and dairy products",
    amount: 45.75,
  },
  {
    category: "Transportation",
    description: "Monthly subway pass",
    amount: 60.00,
  },
  {
    category: "Entertainment",
    description: "Movie ticket for sci-fi film",
    amount: 12.50,
  },
  {
    category: "Dining",
    description: "Dinner at an Italian restaurant",
    amount: 85.00,
  },
  {
    category: "Utilities",
    description: "Electricity bill payment",
    amount: 120.45,
  }
];
