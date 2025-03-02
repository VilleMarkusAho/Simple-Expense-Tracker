
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LocalizedDatePipe } from '../../pipes/localise-date.pipe';

interface IExpense {
  date: Date;
  category: string;
  description: string;
  amount: number;
  paymentMethod: "Bank transfer" | "Credit card" | "Debit card";
}

@Component({
  selector: 'app-expense-spreadsheet',
  imports: [CommonModule, LocalizedDatePipe],
  templateUrl: './expense-spreadsheet.component.html',
  styleUrl: './expense-spreadsheet.component.scss',
  standalone: true
})
export class ExpenseSpreadsheetComponent {

  expenses: IExpense[] = [
    {
      date: new Date("2025-03-01"),
      category: "Groceries",
      description: "Bought vegetables and dairy products",
      amount: 45.75,
      paymentMethod: "Credit card",
    },
    {
      date: new Date("2025-02-28"),
      category: "Transportation",
      description: "Monthly subway pass",
      amount: 60.00,
      paymentMethod: "Debit card",
    },
    {
      date: new Date("2025-02-27"),
      category: "Entertainment",
      description: "Movie ticket for sci-fi film",
      amount: 12.50,
      paymentMethod: "Bank transfer",
    },
    {
      date: new Date("2025-02-26"),
      category: "Dining",
      description: "Dinner at an Italian restaurant",
      amount: 85.00,
      paymentMethod: "Credit card",
    },
    {
      date: new Date("2025-02-25"),
      category: "Utilities",
      description: "Electricity bill payment",
      amount: 120.45,
      paymentMethod: "Bank transfer",
    }
  ];
}
