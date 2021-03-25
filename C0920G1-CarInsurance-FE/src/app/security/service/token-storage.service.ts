import {Injectable} from '@angular/core';

const AUTHORITIES_KEY = 'AuthAuthorities';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
//Tran Minh Chien
//Xet luu Token vào Local Hay Session Storage.
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  checkRemember = false;
  private roles: Array<string> = [];

  constructor() {
  }

  signOut(): void {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  // Luu Token vao local storage
  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  // public saveTokenSession(token: string) {
  //   console.log(this.checkRemember);
  //   window.sessionStorage.removeItem(TOKEN_KEY);
  //   window.sessionStorage.setItem(TOKEN_KEY, token);
  // }

  // Lay token tu local
  public getToken(): string {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  // Luu thong tin user vao local
  public saveUser(user): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // Lay thong tin user tu local
  public getUser(): any {
    return JSON.parse(window.localStorage.getItem(USER_KEY));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (window.localStorage.getItem(TOKEN_KEY)) {
      console.log(JSON.parse(window.localStorage.getItem(USER_KEY)).roles[0]);
      JSON.parse(window.localStorage.getItem(USER_KEY)).roles.forEach(authority => {
        this.roles.push(authority);
      });
    }
    return this.roles;
  }
}
