import { ExpenseCategory } from './../models/expense.model';
import { Injectable } from '@angular/core';
import { IExpense } from '../models/expense.model';

export type Currency = "$" | "€" | "£" | "¥" | "CHF" | "C$" | "A$";

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor() { }

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
    category: ExpenseCategory.Groceries,
    description: "Bought vegetables and dairy products",
    amount: 45.75,
  },
  {
    category: ExpenseCategory.Transportation,
    description: "Monthly subway pass",
    amount: 60.00,
  },
  {
    category: ExpenseCategory.Entertainment,
    description: "Movie ticket for sci-fi film",
    amount: 12.50,
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


  // Remove the following expenses later
 /*  {
    category: ExpenseCategory.Groceries,
    description: "Bought fruits and snacks",
    amount: 32.30,
  },
  {
    category: ExpenseCategory.Transportation,
    description: "Taxi ride to the airport",
    amount: 40.00,
  },
  {
    category: ExpenseCategory.Entertainment,
    description: "Concert tickets for rock band",
    amount: 75.00,
  },
  {
    category: ExpenseCategory.Dining,
    description: "Lunch at a sushi restaurant",
    amount: 50.00,
  },
  {
    category: ExpenseCategory.Utilities,
    description: "Water bill payment",
    amount: 35.20,
  },
  {
    category: ExpenseCategory.Groceries,
    description: "Bought coffee and bread",
    amount: 10.50,
  },
  {
    category: ExpenseCategory.Transportation,
    description: "Gas for the car",
    amount: 30.00,
  },
  {
    category: ExpenseCategory.Entertainment,
    description: "Video game purchase",
    amount: 59.99,
  },
  {
    category: ExpenseCategory.Dining,
    description: "Brunch with friends",
    amount: 25.00,
  },
  {
    category: ExpenseCategory.Utilities,
    description: "Internet bill payment",
    amount: 65.00,
  },
  {
    category: ExpenseCategory.Groceries,
    description: "Bought meat and vegetables",
    amount: 70.60,
  },
  {
    category: ExpenseCategory.Transportation,
    description: "Parking fees for the week",
    amount: 15.00,
  },
  {
    category: ExpenseCategory.Entertainment,
    description: "Board game purchase",
    amount: 35.00,
  },
  {
    category: ExpenseCategory.Dining,
    description: "Dinner at a French bistro",
    amount: 95.00,
  },
  {
    category: ExpenseCategory.Utilities,
    description: "Gas bill payment",
    amount: 55.00,
  },
  {
    category: ExpenseCategory.Groceries,
    description: "Bought cleaning supplies",
    amount: 20.50,
  },
  {
    category: ExpenseCategory.Transportation,
    description: "Bus fare for the week",
    amount: 12.00,
  },
  {
    category: ExpenseCategory.Entertainment,
    description: "Streaming service subscription",
    amount: 9.99,
  },
  {
    category: ExpenseCategory.Dining,
    description: "Coffee at a café",
    amount: 4.75,
  },
  {
    category: ExpenseCategory.Utilities,
    description: "Trash collection fee",
    amount: 25.00,
  },
  {
    category: ExpenseCategory.Groceries,
    description: "Bought organic produce",
    amount: 55.00,
  },
  {
    category: ExpenseCategory.Transportation,
    description: "Train ticket to the city",
    amount: 18.00,
  } */
];
