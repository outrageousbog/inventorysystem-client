import {JwtHelperService} from '@auth0/angular-jwt';

export class AuthService {
  loggedIn = false;
  jwtHelper = new JwtHelperService;


  public getToken() {
    return localStorage.getItem(`token`);
  }

  isAuthenticated() {
    return new Promise(
      (resolve) => {
        if(this.getToken() != null) {
            resolve(this.isStillValid());
        } else {
          resolve(false);
        }
      }
    );
  }

  logout() {
    this.loggedIn = false;
  }

  login() {
    this.loggedIn = true;
  }

  private isStillValid() {
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

}
