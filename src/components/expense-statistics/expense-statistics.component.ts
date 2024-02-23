import {Component, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Expense} from "../../class/expense";
import {AsyncPipe} from "@angular/common";
import {ChartComponent, NgApexchartsModule} from "ng-apexcharts";
import {Line} from "../../class/line";
import {ExpensesService} from "../../services/expenses.service";
import {map} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-expense-statistics',
  standalone: true,
  imports: [
    AsyncPipe, NgApexchartsModule
  ],
  templateUrl: './expense-statistics.component.html',
  styleUrl: './expense-statistics.component.css'
})
export class ExpenseStatisticsComponent implements OnInit, OnChanges {
  @Input() expense!: Expense;
  @Input() lines!: Line[];
  @ViewChild("chart") chart: ChartComponent | undefined;

  private expensesService = inject(ExpensesService);

  public chartOptions: any;
  public budgetByMonthList: number[] = [];
  public participantsList: string[] = [];



  constructor() {
    console.log('========================================')
    console.log('Constructor')
    console.log('========================================')
  }
  ngOnChanges(changes:SimpleChanges): void {

    //HYDRATE LINE WITH LINE DETAILS LIST THANKS TO SUBSCRIPTION
    //TODO : instead of hydrating here, hydrate @Input lines so the information is already loaded for this component
    console.log('========================================')
    console.log('NgOnChanges')
    console.log('========================================')
    for (let line of this.lines){
        this.expensesService.getLineDetails(line.idLine).subscribe(
          list => {
            line.lineDetailList = list;
            console.log('getLineDetails :')
            console.log(list)
          }
        );
      }
    }

  ngOnInit() {
    console.log('========================================')
    console.log('NgOnInit')
    console.log('========================================')

    let totalMonthBalance = 0;
    let totalMonthBudget = 0;

    //GET VALUES FROM PARTICIPANTS LIST
    for (let participant of this.expense.participantList) {
      let balance = 0;

      console.log('Line for :')
      console.log(participant.user.username)
      for (let line of this.lines){
        console.log(line);
        console.log('Details :')
        if (line.lineDetailList?.length !== undefined){

          for(let detail of line.lineDetailList){
            console.log(detail);
            if (detail.user.idUser == participant.user.idUser )
              totalMonthBalance += detail.value;
            balance += detail.value;
          }
        }
      }

      this.budgetByMonthList.push(balance / participant.budgetByMonth * 100);
      this.participantsList.push(participant.user.username);
      totalMonthBudget += participant.budgetByMonth;
    }

    this.budgetByMonthList.push(totalMonthBalance / totalMonthBudget * 100);
    this.participantsList.push('Total');


    console.log('BudgetByMonth list => ')
    console.log(this.budgetByMonthList);
    console.log('Participants list =>')
    console.log(this.participantsList);

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
