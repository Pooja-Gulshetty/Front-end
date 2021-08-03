import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {LoginRequest} from "./login-request";
import {LoginResponse} from "./login.response";
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private httpClient: HttpClient
  private router: Router
  private loginService: LoginService

  constructor(httpClient: HttpClient, router: Router, loginService: LoginService) {
    this.httpClient = httpClient
    this.router = router
    this.loginService = loginService
  }

  name = ""
  password = ""

  ngOnInit(): void {

  }

  invalidForm = false
  invalidcredential = false

  loginUser(loginForm: NgForm) {
    this.invalidForm = false
    this.invalidcredential = false


    if (loginForm.invalid) {
      this.invalidForm = true
      return
    }

    let loginRequest = new LoginRequest(this.name, this.password)
    console.log("logging in for user" + loginRequest.userName)
    let jsonData = JSON.stringify(loginRequest)

    // url
    let url = "http://192.168.2.85:9090/finance/login"

    let header = this.getHeaders();

    this.httpClient.post<LoginResponse>(url, jsonData, header)
      .subscribe(
        loginResponse => {
          console.log("successfully loged in " + loginResponse.token)
          this.loginService.setUserDetails(loginResponse)
          this.reset()
          this.router.navigate(["home"])
        },
        httpError => {
          console.log("Erorr " + httpError)
          this.invalidcredential = true
        }
      )
  }

  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-type': "application/json"
        }
      )
    }

    return httpOptions
  }

  reset() {
    this.name = ""
    this.password = ""
  }
}
