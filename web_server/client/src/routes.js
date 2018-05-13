import Base from './Base/Base';
import App from './App/App';
import LoginPage from './Login/LoginPage';
import SignUpPage from './SignUp/SignUpPage';
import Auth from './Auth/Auth';

const routes = {
  // base component wraped for whole app, no matter routes
  component: Base,
  // different page base on url
  childRoutes: [
    {
      //differnt page based on login status
      path:'/',
      getComponent:(location, callback) => {
        if (Auth.isUserAuthenticated()) {
          // if login, show App component
          callback(null, App);
        } else {
          // otherwise, show LoginPage
          callback(null, LoginPage);
        }
      }
    },

    {
      path:'/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path:'/logout',
      onEnter:(nextState, replace) => {
        // logout remove token
        Auth.deauthenticateUser();
        //change current url to /
        replace('/');
      }
    }
  ]
};

export default routes;
