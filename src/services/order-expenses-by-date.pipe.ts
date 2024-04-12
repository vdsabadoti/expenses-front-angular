import { Pipe, PipeTransform } from '@angular/core';
import {Expense} from "../class/expense";

@Pipe({
  name: 'orderExpensesByDate',
  standalone: true
})
export class OrderExpensesByDatePipe implements PipeTransform {

  transform(value: Expense[], order: "asc" | "desc" = "asc"): Expense[] {
    return value.sort((a,b) => {
        if (order === 'asc') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (order === 'desc') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
      }
    );
  }

}
