import { Component, OnInit } from '@angular/core';
import { ExpenseSpreadsheetComponent } from "../../components/expense-spreadsheet/expense-spreadsheet.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [ExpenseSpreadsheetComponent]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
