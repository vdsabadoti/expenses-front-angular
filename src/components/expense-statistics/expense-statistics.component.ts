import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
export class ExpenseStatisticsComponent implements OnInit {
  @Input() expense!: Expense;
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: any;
  public budgetByMonthList: number[] = [];
  public participantsList: string[] = [];


  constructor() {
  }

  ngOnInit() {
    let totalMonthBalance = 0;
    let totalMonthBudget = 0;
    //GET VALUES FROM PARTICIPANTS LIST
    for (let participant of this.expense.participantList) {
      let balance = 30; //TODO replace by participant API : calculate a balance for the month
      this.budgetByMonthList.push(balance / participant.budgetByMonth * 100);
      this.participantsList.push(participant.user.username);
      totalMonthBalance += balance;
      totalMonthBudget += participant.budgetByMonth;
    }
    this.budgetByMonthList.push(totalMonthBalance / totalMonthBudget * 100);
    this.participantsList.push('Total');

    this.chartOptions = {
      series: this.budgetByMonthList,
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
      labels: this.participantsList,
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
}
