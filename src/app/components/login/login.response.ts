export class LoginResponse {
  constructor(public token: string,
              public userName: string,
              public expirationTime: number,
              public financeName: string,
              public financeId: string) {
  }
}
