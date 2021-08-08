import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CustomerResponse} from "../customer/customer-response";
import {TransactionResponse} from "./transaction-response";
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {TransactionRquest} from "./transaction-rquest";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  baseUri = "http://192.168.2.85:9090/finance/"
  customerUrl = "/customers/"
  componentUrl = "/transactions"

  constructor(private router: Router, private loginService: LoginService, private httpClient: HttpClient) {
  }

  private customerDetail: CustomerResponse | null = null
  transactions: TransactionResponse[] = []


  ngOnInit(): void {
    // customer details
    let currentUrl = this.router.url
    let customerName = currentUrl.substr(currentUrl.lastIndexOf("/") + 1)
    console.log("Customer name is customer details " + customerName)
    this.getCustomer(customerName)
    this.getTransactions(customerName)
  }

  private getHeaders() {
    //get token
    const token = this.loginService.getToken()

    //create headere
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token
      })
    }

    return httpOptions

  }

  private getCustomer(customerName: string) {
    let url = this.baseUri + this.loginService.getFinanceId() + this.customerUrl + customerName
    let headers = this.getHeaders()
    this.httpClient.get<CustomerResponse>(url, headers)
      .subscribe(
        response => {
          this.customerDetail = response
        },
        error => {
          console.log(error)
        }
      )
  }

  private getTransactions(customerName: string) {

    // http://192.168.2.85:9090/finance/Lokesh/customers/Loku/transactions
    let url = this.baseUri + this.loginService.getFinanceId() + this.customerUrl + customerName + this.componentUrl
    let headers = this.getHeaders()
    this.httpClient.get<TransactionResponse[]>(url, headers)
      .subscribe(
        response => {
          this.transactions = response
        },
        error => {
          console.log(error)
        }
      )
  }


  createTransactionPopup() {
    this.resetValues()
  }

  invalidForm = false
  returnedAmount = ""
  returnedTo = ""
  errorWhileCreating = false
  createErrorMessage = ""

  createTransaction(createTransactionForm: NgForm) {
    if (createTransactionForm.invalid) {
      this.invalidForm = true
      return
    }

    const url = this.baseUri + this.loginService.getFinanceId() + this.customerUrl + this.getName() + this.componentUrl
    const headers = this.getHeaders()
    const request = new TransactionRquest(this.returnedAmount, this.returnedTo)
    const data = JSON.stringify(request)

    this.httpClient.post(url, data, headers)
      .subscribe(
        response => {
          this.getTransactions(this.getName())
          this.resetValues()
          this.getCustomer(this.getName())
          this.closeTransactionPopupButton()
        },
        error => {
          this.errorWhileCreating = true
          this.createErrorMessage = this.getErrorMessage(error)
        }
      )
  }

  @ViewChild("closeTransactionPopup")
  closeTransactionPopup?: ElementRef

  private closeTransactionPopupButton() {
    this.closeTransactionPopup?.nativeElement.click()
  }

  resetValues() {
    this.invalidForm = false
    this.returnedAmount = ""
    this.returnedTo = ""
    this.errorWhileCreating = false
    this.createErrorMessage = ""
  }

  getTotal() {
    if (this.customerDetail == null) {
      return "Unknown"
    }
    return this.customerDetail.totalAmount
  }

  getRemaining() {
    if (this.customerDetail == null) {
      return "Unknown"
    }
    return this.customerDetail.remainingAmount
  }


  getName() {
    if (this.customerDetail == null) {
      return "Unknown"
    }
    return this.customerDetail.customerName
  }

  getInterest() {
    if (this.customerDetail == null) {
      return "Unknown"
    }
    return this.customerDetail.interestRate
  }

  getMonthlyInstallment() {
    if (this.customerDetail == null) {
      return "Unknown"
    }
    return this.customerDetail.perMonthPayment
  }

  private getErrorMessage(httpErrorResponse: HttpErrorResponse) {
    let errorBody = httpErrorResponse.error
    let message = errorBody.message
    return message
  }
}
