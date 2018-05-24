import React from 'react';
import Auth from '../Auth/Auth';
import { Link } from 'react-router'
import './Base.css';

//child components passed by react Router

class Base extends React.Component {
  render() {
    return(
      <body>
        <main>
          <nav className="nav-bar indigo lighten-1">
            <div className="nav-wrapper">

              <a href="/" className="brand-logo center">ScapeNews</a>
              <ul id="nav-mobile" className="right">
                {Auth.isUserAuthenticated() ?
                  (<div>
                    <li>{Auth.getEmail()}</li>
                    <li><Link to="/logout">Log out</Link></li>
                  </div>)
                  :
                  (<div>
                    <li><Link to="/login">Log in</Link></li>
                    <li><Link to="/signup">Sign up</Link></li>
                  </div>)
                }
              </ul>
            </div>
          </nav>
          <br/>

          {this.props.children}
        </main>

        <footer className="page-footer">
          <div class="footer-copyright">
            <div class="container">
              © 2018 Copyright -- ChrisGuan
            </div>
          </div>
        </footer>
      </body>
    );
  }
}

export default Base;
