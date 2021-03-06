import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import './LoginForm.css';
import logo1 from './logo1.png';


const LoginForm = ({
  onSubmit,
  onSubmitDemo,
  onChange,
  errors,
  user
}) => {
  return(
    <div>
      <div>
        <img className='logo1' src={logo1} alt='logo'></img>
      </div>
      <div className="container">
        <div className="card-panel login-panel">
          <form className="col s12" action="/" onSubmit={onSubmit}>
            <h4 className="center-align">Login</h4>
            {errors.summary && <div className="row"><p className="error-message">{errors.summary}</p></div>}
            <div className="row">
              <div className="input-field col s12">
                <input className="validate" id="email" type="email" name="email" onChange={onChange}/>
                <label htmlFor='email'>Email</label>
              </div>
            </div>
            {errors.email && <div className="row"><p className="error-message">{errors.email}</p></div>}
            <div className="row">
              <div className="input-field col s12">
                <input className="validate" id="password" type="password" name="password" onChange={onChange}/>
                <label htmlFor='password'>Password</label>
              </div>
            </div>
            {errors.password && <div className="row"><p className="error-message">{errors.password}</p></div>}
            <div className="row right-align">
              <input type="submit" className="waves-effect waves-light btn indigo lighten-1" value='Log in'/>
            </div>

            <form className="col s12" action="/" onSubmit={onSubmitDemo}>
              <div className="row right-align">
                <input type="submit" className="waves-effect waves-light btn indigo lighten-1" value='Demo '/>
              </div>
            </form>

            <div className="row">
              <p className="right-align"> New to Tap News?  <Link to="/signup">Sign Up</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
      )
    }


//	We can do type checking with propTypes, if	LoginForm	is	called	,	caller	must	proivde	onSumbit,	onChange,	errors,	and	user
LoginForm.PropTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}


export default LoginForm;
