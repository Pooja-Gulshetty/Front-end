import {Component, OnInit} from '@angular/core';
import {CustomerResponse} from "./customer-response";
import {LoginService} from "../../service/login.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  baseUri = "http://192.168.2.85:9090/finance/"

  constructor(private loginService: LoginService,private httpClient:HttpClient) {
  }

  componentUrl = "/customers"
  customerList: CustomerResponse[] = []

  ngOnInit(): void {
    this.getCustomerList()
  }

  getCustomerList() {
    let url = this.baseUri + this.loginService.getFinanceId() + this.componentUrl
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

}
