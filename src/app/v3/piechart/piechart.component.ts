import { Component, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss'],
})
export class PiechartComponent {
  @Input() gwpForPieChart: number[] = [];

  title = 'ng2-charts-demo';

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = ['New Car', 'Old Car', 'Total GWP'];
  public pieChartDatasets = [
    {
      data: this.gwpForPieChart,
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {}

  ngOnInit() {
    this.pieChartDatasets = [
      {
        data: this.gwpForPieChart,
      },
    ];
  }
}
