import {Injectable} from '@angular/core';
import {LoginResponse} from "../components/login/login.response";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {
  }

  setUserDetails(response: LoginResponse) {
    localStorage.setItem("token", response.token)
    localStorage.setItem("user", response.userName)
    localStorage.setItem("finance_id", response.financeId)
    localStorage.setItem("finance_name", response.financeName)
    localStorage.setItem("expires", response.expirationTime.toString())
  }

  isAuthenticated() {
    return localStorage.getItem("token") != null
  }

  getToken() {
    return this.getValue("token")
  }

  getFinanceId() {
    return this.getValue("finance_id")
  }

  getFinanceName() {
    return this.getValue("finance_name")
  }

  getUser() {
    return this.getValue("user")
  }

  private getValue(key: string) {
    let value = localStorage.getItem(key)
    if (value == null) {
      throw new Error("No value found for: " + key)
    }

    return value
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("finance_id")
    localStorage.removeItem("finance_name")
    localStorage.removeItem("expires")
  }
}
