import Auth from '../Auth/Auth';
import LoginForm from './LoginForm';
import PropTypes from 'prop-types';
import React from 'react';

class LoginPage extends React.Component {
  //Login Page should work with React router, so that React router can decide to show Login Page, SignUp Page or App.
  // We use context.
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.processDemoForm = this.processDemoForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processDemoForm(event) {
    console.log('submit working')
    event.preventDefault();

    const email = 'Chris@Demo.com';
    const password = '00000000';

    console.log('email:', email);
    console.log('password:', password);

    // Post login data
    const url = 'http://' + window.location.hostname + ':3000/auth/login';
    const request = new Request(
      url,
      {
        method:'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

    fetch(request).then(response => {
      if (response.status === 200) {
        this.setState({
          errors: {}
        });

        response.json().then(json => {
          console.log(json);
          //"token" shou match with server
          Auth.authenticateUser(json.token, email);
          // since clinet login successfully, redirect to root, app component wil be shown.
          this.context.router.replace('/');
        });
      } else {
        console.log('Login failed');
        response.json().then(json => {
          // if login fail, reset error in the state
          const errors = json.errors ? json.errors : {};
          errors.summary = json.message;
          this.setState({errors});
        });
      }
    });
  }

  processForm(event) {
    console.log('submit working')
    event.preventDefault();

    const email = this.state.user.email;
    const password = this.state.user.password;

    console.log('email:', email);
    console.log('password:', password);

    // Post login data
    const url = 'http://' + window.location.hostname + ':3000/auth/login';
    const request = new Request(
      url,
      {
        method:'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

    fetch(request).then(response => {
      if (response.status === 200) {
        this.setState({
          errors: {}
        });

        response.json().then(json => {
          console.log(json);
          //"token" shou match with server
          Auth.authenticateUser(json.token, email);
          // since clinet login successfully, redirect to root, app component wil be shown.
          this.context.router.replace('/');
        });
      } else {
        console.log('Login failed');
        response.json().then(json => {
          // if login fail, reset error in the state
          const errors = json.errors ? json.errors : {};
          errors.summary = json.message;
          this.setState({errors});
        });
      }
    });
  }

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.processForm}
        onSubmitDemo={this.processDemoForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user} />
    );
  }
}

// To make react-router work
LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginPage;
