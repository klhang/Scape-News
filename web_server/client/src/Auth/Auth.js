class Auth {
  //called after login, store token sent from Server into localStorage
  static authenticateUser(token, email) {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  }


  static isUserAuthenticated() {
    // on the client side, it cannot check if the token is sent by server
    // when client send loadMoreNews request, server will check the token
    return localStorage.getItem('token') !== null;
  }


  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }


  static getToken() {
    return localStorage.getItem('token');
  }


   static getEmail() {
     return localStorage.getItem('email');
   }
}

export default Auth
