import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CustomerResponse} from "./customer-response";
import {LoginService} from "../../service/login.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {CustomerRequest} from "./customer-request";
import {Router} from "@angular/router";
import {UrlService} from "../../service/url.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private loginService: LoginService, private httpClient: HttpClient, private router: Router, private urlService: UrlService) {
  }

  componentUrl = "/customers"
  customerList: CustomerResponse[] = []

  invalidForm = false
  errorWhileCreating = false
  createErrorMessage = ""

  ngOnInit(): void {
    this.getCustomerList()
  }

  getCustomerList() {
    let url = this.urlService.getUrl() + this.loginService.getFinanceId() + this.componentUrl
    let headers = this.getHeaders()
    this.httpClient.get<CustomerResponse[]>(url, headers)
      .subscribe(
        responseList => {
          this.customerList = responseList
        },
        error => {
          console.log(error)
        }
      )
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

  name = ""
  phoneNumber = ""
  monthlyPaymentDate = ""
  interestRate = ""
  months = ""
  totalAmount = ""

  createCustomer(createCustomerForm: NgForm) {
    if (createCustomerForm.invalid) {
      this.invalidForm = true
      return
    }
//http://192.168.2.85:9090/finance/Lokesh/customers
    let resourceUrl = this.urlService.getUrl() + this.loginService.getFinanceId() + this.componentUrl
    let headers = this.getHeaders()
    let customerRequest = new CustomerRequest(this.name, this.phoneNumber, this.monthlyPaymentDate, this.totalAmount, this.interestRate, this.months)
    let data = JSON.stringify(customerRequest)
    this.httpClient.post(resourceUrl, data, headers)
      .subscribe(
        success => {
          this.getCustomerList()
          this.closeCreateCustomer()
        },
        httpErrorResponse => {
          this.errorWhileCreating = true
          this.createErrorMessage = this.getErrorMessage(httpErrorResponse)
        }
      )

  }

  private getErrorMessage(httpErrorResponse: HttpErrorResponse) {
    let errorBody = httpErrorResponse.error
    let message = errorBody.message
    return message
  }

  createCustomerPopup() {
    this.resetValues()
  }

  private resetValues() {
    this.name = ""
    this.phoneNumber = ""
    this.monthlyPaymentDate = ""
    this.interestRate = ""
    this.months = ""
    this.totalAmount = ""
    this.invalidForm = false
    this.errorWhileCreating = false
    this.createErrorMessage = ""
  }

  @ViewChild("closeCreatePopup")
  closeCreateCustomerPopup?: ElementRef

  closeCreateCustomer() {
    this.closeCreateCustomerPopup?.nativeElement.click()
  }

  customerDetails(customer: CustomerResponse) {
    console.log(customer.customerName)
    this.router.navigate(["transactions/" + customer.customerName])
  }
}
