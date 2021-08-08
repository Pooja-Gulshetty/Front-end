export class CustomerRequest {
  public customerName: string
  public phoneNumber: string
  public monthlyPaymentDate: string
  public totalAmount: string
  public interestRate: string
  public months: string


  constructor(customerName: string, phoneNumber: string, monthlyPaymentDate: string, totalAmount: string, interestRate: string, months: string) {
    this.customerName = customerName;
    this.phoneNumber = phoneNumber;
    this.monthlyPaymentDate = monthlyPaymentDate;
    this.totalAmount = totalAmount;
    this.interestRate = interestRate;
    this.months = months;
  }
}


