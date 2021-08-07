import {Component} from '@angular/core';
import {LoginService} from "./service/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {

  }

  setLanguage(language: string) {
    console.log("Language is " + language)
  }

  isAuthenticated() {
    return this.loginService.isAuthenticated()
  }

  getToken() {
    return this.loginService.getToken()
  }

  getFinanceId() {
    return this.loginService.getFinanceId()
  }

  getFinanceName() {
    return this.loginService.getFinanceName()
  }

  getUser() {
    return this.loginService.getUser()
  }
}
