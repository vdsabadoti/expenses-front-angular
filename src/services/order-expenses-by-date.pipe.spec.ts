import { OrderExpensesByDatePipe } from './order-expenses-by-date.pipe';

describe('OrderExpensesByDatePipe', () => {
  it('create an instance', () => {
    const pipe = new OrderExpensesByDatePipe();
    expect(pipe).toBeTruthy();
  });
});
