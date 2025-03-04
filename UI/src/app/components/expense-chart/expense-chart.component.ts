import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { IExpense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-chart',
  imports: [],
  templateUrl: './expense-chart.component.html',
  styleUrl: './expense-chart.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseChartComponent implements OnChanges {

  @Input() expenses: IExpense[] = [];
  @Input() revenue: number = 0;

  chart: any;
  expenseMap: Map<string, number[]> = new Map();


  createChart() {
    this.chart = new Chart("Expenses", {
      type: 'bar',
      data: {
        labels: ["Category"],
        datasets: this.getChartDatasets(),
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        scales: {
          y: {
            //stacked: true,
          }
        }
      }
    });
  }

  ngOnChanges(): void {
    this.createChart();
  }

  private getChartDatasets(): any[] {
    let datasets1 = [];
    const datasets2 = [];

    for (const expense of this.expenses) {
      datasets1.push({
        label: expense.category,
        data: [expense.amount],
      });

      datasets2.push(expense.amount);
    }


    datasets1.push({
      label: "Total expenses",
      data: datasets2,
    });

    console.log(datasets1);


    return datasets1;
  }

  private getLabels(): string[] {
    const categories = this.expenses.map((expense) => expense.category);

    return [
      ... new Set(categories),
      "Total expenses",
      "Revenue",
      "Profit",
    ];
  }
}


