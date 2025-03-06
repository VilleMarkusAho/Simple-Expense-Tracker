import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { IExpense } from '../../models/expense.model';
import { shuffleArray } from '../../utils/helper-functions';
import { Currency } from '../../services/Finance.service';

const COLORS: string[] = [
  "rgb(112, 212, 252)",
  "rgb(0, 136, 227)",
  "rgb(75, 194, 168)",
  "rgb(255, 179, 153)",
  "rgb(255, 219, 160)",
  "rgb(143, 122, 219)",
  "rgb(152, 238, 206)",
  "rgb(255, 249, 179)",
  "rgb(196, 175, 148)",
  "rgb(234, 54, 127)",
  "rgb(204, 255, 252)",
  "rgb(255, 132, 83)",
  "rgb(198, 235, 203)",
  "rgb(255, 246, 133)",
  "rgb(255, 147, 54)",
  "rgb(230, 109, 126)",
  "rgb(129, 126, 227)",
  "rgb(94, 69, 75)",
  "rgb(255, 222, 248)",
  "rgb(27, 160, 148)",
];

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
  @Input() unit: Currency = "$";

  chart: any;
  expenseMap: Map<string, number[]> = new Map();

  createChart() {
    const unit = this.unit;

    this.chart = new Chart("Expenses", {
      type: 'bar',
      data: {
        labels: ["Expenses by category"],
        datasets: this.getChartDatasets(),
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                return value + " " + unit;
              },
            }
          }
        }
      },
    });
  }

  ngOnChanges(): void {
    if (!this.chart) {
      this.createChart();
    }
    else {
      this.chart.data.datasets = this.getChartDatasets();
      this.chart.update();
    }
  }

  private getChartDatasets(): any[] {
    let datasets1 = [];
    let datasets2 = [];
    let totalExpenses = 0;
    let colors = shuffleArray(COLORS);
    let colorIndex = 0;
    let maxColorIndex = colors.length;

    for (const expense of this.expenses) {
      datasets1.push({
        label: "",
        data: [expense.amount],
        stack: expense.category,
        backgroundColor: colors[colorIndex],
      });

      datasets2.push({
        label: expense.category.toString(),
        data: [expense.amount],
        stack: 'stack1',
        backgroundColor: colors[colorIndex++],
      })

      totalExpenses += expense.amount;

      if (colorIndex >= maxColorIndex) {
        colorIndex = 0;
      }
    }

    datasets1 = [...datasets1, ...datasets2];

    if (this.revenue !== 0) {
      datasets1.push({
        label: "Revenue",
        data: [this.revenue],
        stack: "stack2",
        backgroundColor: this.revenue > 0 ? "rgb(22, 196, 127)" : "rgb(249, 84, 84)",
      })
    }

    const profit = this.revenue - totalExpenses;

    if (profit !== 0) {
      datasets1.push({
        label: "Profit",
        data: [profit],
        stack: "stack3",
        backgroundColor: profit > 0 ? "rgb(22, 196, 127)" : "rgb(249, 84, 84)",
      })
    }

    return datasets1;
  }
}


