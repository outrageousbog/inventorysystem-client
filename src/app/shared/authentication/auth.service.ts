export class AuthService {
  loggedIn = false;


  public getToken() {
    return localStorage.getItem(`token`);
  }

  isAuthenticated() {
    return new Promise(
      (resolve) => {
        resolve(this.getToken().length > 1);
      }
    );
  }

  logout() {
    this.loggedIn = false;
  }

  login() {
    this.loggedIn = true;
  }
}
