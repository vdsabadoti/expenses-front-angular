export class ExpenseForm {

  public label:string | undefined;
  public description:string | undefined ;
  constructor(label:string | undefined , description:string | undefined) {
    this.label = label;
    this.description = description;
  }
}
