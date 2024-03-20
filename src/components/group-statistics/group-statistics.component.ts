import {Component, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Group} from "../../class/group";
import {AsyncPipe} from "@angular/common";
import {ChartComponent, NgApexchartsModule} from "ng-apexcharts";
import {Expense} from "../../class/expense";
import {GroupService} from "../../services/group.service";
import {map} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-expense-statistics',
  standalone: true,
  imports: [
    AsyncPipe, NgApexchartsModule
  ],
  templateUrl: './group-statistics.component.html',
  styleUrl: './group-statistics.component.css'
})
export class GroupStatisticsComponent implements OnInit, OnChanges {
  @Input() group!: Group;
  @Input() expenses!: Expense[];
  @ViewChild("chart") chart: ChartComponent | undefined;

  private expensesService = inject(GroupService);

  public chartOptions: any;
  public budgetByMonthList: number[] = [];
  public participantsList: string[] = [];



  constructor() {
  }
  ngOnChanges(changes:SimpleChanges): void {

    //HYDRATE EXPENSES WITH DETAILS THANKS TO SUBSCRIPTION
    //TODO : instead of hydrating here, hydrate @Input lines so the information is already loaded for this component
    for (let expense of this.expenses){
        this.expensesService.getDetails(expense.id).subscribe(
          list => {
            expense.detailList = list;
          }
        );
      }
    }

  ngOnInit() {

    let totalMonthBalance = 0;
    let totalMonthBudget = 0;

    //GET VALUES FROM PARTICIPANTS LIST
    for (let participant of this.group.participantList) {
      let balance = 0;

      for (let expense of this.expenses){

        if (expense.detailList?.length !== undefined){
          for(let detail of expense.detailList){
            if (detail.user.id == participant.user.id ){
              totalMonthBalance += detail.value;
              balance += detail.value;
            }
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
