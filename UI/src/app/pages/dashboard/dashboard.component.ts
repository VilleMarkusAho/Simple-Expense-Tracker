import { Component, OnInit } from '@angular/core';
import { ExpenseSpreadsheetComponent } from "../../components/expense-spreadsheet/expense-spreadsheet.component";
import { DownloadPanelComponent } from '../../components/download-panel/download-panel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [ExpenseSpreadsheetComponent, DownloadPanelComponent]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
