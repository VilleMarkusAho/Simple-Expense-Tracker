
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

interface IExpense {
  date: Date;
  category: string;
  description: string;
  amount: number;
  paymentMethod: "Bank transfer" | "Credit card" | "Debit card";
  notes: string;
}

@Component({
  selector: 'app-expense-spreadsheet',
  imports: [CommonModule, AgGridAngular],
  templateUrl: './expense-spreadsheet.component.html',
  styleUrl: './expense-spreadsheet.component.scss',
  standalone: true
})
export class ExpenseSpreadsheetComponent {

  rowData: IExpense[] = [
    {
      date: new Date("2025-03-01"),
      category: "Groceries",
      description: "Bought vegetables and dairy products",
      amount: 45.75,
      paymentMethod: "Credit card",
      notes: "Used discount coupon"
    },
    {
      date: new Date("2025-02-28"),
      category: "Transportation",
      description: "Monthly subway pass",
      amount: 60.00,
      paymentMethod: "Debit card",
      notes: "Valid for 30 days"
    },
    {
      date: new Date("2025-02-27"),
      category: "Entertainment",
      description: "Movie ticket for sci-fi film",
      amount: 12.50,
      paymentMethod: "Bank transfer",
      notes: "Evening show at 7:30 PM"
    },
    {
      date: new Date("2025-02-26"),
      category: "Dining",
      description: "Dinner at an Italian restaurant",
      amount: 85.00,
      paymentMethod: "Credit card",
      notes: "Celebrated friend's birthday"
    },
    {
      date: new Date("2025-02-25"),
      category: "Utilities",
      description: "Electricity bill payment",
      amount: 120.45,
      paymentMethod: "Bank transfer",
      notes: "Monthly bill for February"
    }
  ];

  colDefs: ColDef[] = [
    { field: "date", headerName: "Date" },
    { field: "category", headerName: "Category" },
    { field: "description", headerName: "Description" },
    { field: "amount", headerName: "Amount" },
    { field: "paymentMethod", headerName: "Payment method" },
    { field: "notes", headerName: "Notes" }
  ]

  defaultColDef: ColDef = {
    flex: 1,
  };
}
