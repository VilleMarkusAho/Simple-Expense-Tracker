import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface IExpense {
  category: string;
  description: string;
  amount: number;
}

@Component({
  selector: 'app-expense-spreadsheet',
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './expense-spreadsheet.component.html',
  styleUrl: './expense-spreadsheet.component.scss',
  standalone: true
})
export class ExpenseSpreadsheetComponent {

  currency: "$" | "€" | "£" | "¥" | "CHF" | "C$" | "A$" = "$";
  editingRowIndex: number = -1;
  editingColumnIndex: number = -1;

  @HostListener('document:click', ['$event'])
  setEditToFalse(event: Event): void {
    if ((event.target as HTMLElement).tagName !== 'TD') {
      this.editingRowIndex = -1;
      this.editingColumnIndex = -1;
    }
  }

  addRow(): void {
    this.expenses.push({
      category: "No category",
      description: "No description",
      amount: 0
    })
  }

  removeRow(index: number): void {
    this.expenses.splice(index, 1);
  }

  toggleEdit(rowIndex: number, columnIndex: number): void {
    this.editingRowIndex = rowIndex;
    this.editingColumnIndex = columnIndex;
  }

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
