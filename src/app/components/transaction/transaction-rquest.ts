export class TransactionRquest {
  public returnedAmount: string
  public returnedTo: string

  constructor(returnedAmount: string, returnedTo: string) {
    this.returnedAmount = returnedAmount;
    this.returnedTo = returnedTo;
  }
}
