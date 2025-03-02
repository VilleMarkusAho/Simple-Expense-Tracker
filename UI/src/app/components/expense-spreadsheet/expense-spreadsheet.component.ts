
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LocalizedDatePipe } from '../../pipes/localise-date.pipe';
import { FormsModule } from '@angular/forms';

interface IExpense {
  category: string;
  description: string;
  amount: number;
}

@Component({
  selector: 'app-expense-spreadsheet',
  imports: [CommonModule, FormsModule, LocalizedDatePipe],
  templateUrl: './expense-spreadsheet.component.html',
  styleUrl: './expense-spreadsheet.component.scss',
  standalone: true
})
export class ExpenseSpreadsheetComponent {

  currency: "$" | "€" = "$";
  periodType: 'weekly' | 'monthly' = 'weekly';
  startDate = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

  expenses: IExpense[] = [
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
}
