import {Component, Input, ViewChild} from '@angular/core';
import {Expense} from "../../class/expense";
import {AsyncPipe} from "@angular/common";
import {ChartComponent, NgApexchartsModule} from "ng-apexcharts";

@Component({
  selector: 'app-expense-statistics',
  standalone: true,
  imports: [
    AsyncPipe, NgApexchartsModule
  ],
  templateUrl: './expense-statistics.component.html',
  styleUrl: './expense-statistics.component.css'
})
export class ExpenseStatisticsComponent {
  @Input() expense!: Expense;
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: any;
  public month:number = new Date().getMonth();
  public year:number = new Date().getFullYear();
  public monthList:String[] =
    ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  constructor() {
    //CREATE ARRAY FOR EACH DATA OF THE SIZE
    //OF PARTICIPANTS LIST
    /*
    const budgetByMonthList = [];
    const participantsList = [];
    const balanceList = [];
    //GET VALUES FROM PARTICIPANTS LIST
    for (let participant of this.expense.participantList) {
      balanceList.push(10);
      budgetByMonthList.push(participant.budgetByMonth);
      participantsList.push(participant);
    }*/

    this.chartOptions = {
      series: [10, 20, 30],
      colors: ["#1C64F2", "#16BDCA", "#FDBA8C"],
      chart: {
        height: "380px",
        width: "100%",
        type: "radialBar",
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          track: {
            background: '#E5E7EB',
          },
          dataLabels: {
            show: false,
          },
          hollow: {
            margin: 0,
            size: "32%",
          }
        },
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -23,
          bottom: -20,
        },
      },
      labels: ["Done", "In progress", "To do"],
      legend: {
        show: true,
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          formatter: function (value: any) {
            return value + '%';
          }
        }
      }
    }
  }

  public setMonthUp(){
    if (this.month >= 11) {
      this.year++;
      this.month = -1;
    }
    this.month++;
  }

  public setMonthDown(){
    if (this.month <= 0){
      this.year--;
      this.month = 12;
    }
    this.month--;
  }

}
