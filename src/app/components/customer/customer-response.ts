export class CustomerResponse {
  public  id:number
  public  customerName:string
  public phoneNumber:string
  public lendingDate:string
  public endDate:string
  public monthlyPaymentDate:string
  public totalAmount:string
  public perMonthPayment:string
  public remainingAmount:string
  public interestRate:string
  public months:string
  public firstWitnesName:string
  public firstWitnesPhoneNumber:string
  public secondWitnesName:string
  public secondWitnesPhoneNumber:string


  constructor(id: number, customerName: string, phoneNumber: string, lendingDate: string, endDate: string, monthlyPaymentDate: string, totalAmount: string, perMonthPayment: string, remainingAmount: string, interestRate: string, months: string, firstWitnesName: string, firstWitnesPhoneNumber: string, secondWitnesName: string, secondWitnesPhoneNumber: string) {
    this.id = id;
    this.customerName = customerName;
    this.phoneNumber = phoneNumber;
    this.lendingDate = lendingDate;
    this.endDate = endDate;
    this.monthlyPaymentDate = monthlyPaymentDate;
    this.totalAmount = totalAmount;
    this.perMonthPayment = perMonthPayment;
    this.remainingAmount = remainingAmount;
    this.interestRate = interestRate;
    this.months = months;
    this.firstWitnesName = firstWitnesName;
    this.firstWitnesPhoneNumber = firstWitnesPhoneNumber;
    this.secondWitnesName = secondWitnesName;
    this.secondWitnesPhoneNumber = secondWitnesPhoneNumber;
  }
}
