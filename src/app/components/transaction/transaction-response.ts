export class TransactionResponse {
  public id: string
  public  returnedAmount:  string
  public returnedTo: string
  public  returnedDate: string

  constructor(id: string, returnedAmount: string, returnedTo: string, returnedDate: string) {
    this.id = id;
    this.returnedAmount = returnedAmount;
    this.returnedTo = returnedTo;
    this.returnedDate = returnedDate;
  }
}
